$port = 8090
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://192.168.1.4:$port/")

$listener.Start()
Write-Host "NOOH Web Server running at http://localhost:$port/ and http://192.168.1.4:$port/"

$rootDir = "c:\Nooh website"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $rawPath = $request.Url.LocalPath
        if ($rawPath -eq "/") { $rawPath = "/index.html" }
        
        $cleanPath = $rawPath.TrimStart('/') -replace '/', '\'
        $localPath = Join-Path $rootDir $cleanPath
        
        if (Test-Path $localPath -PathType Leaf) {
            [byte[]]$bytes = [System.IO.File]::ReadAllBytes($localPath)
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            
            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
                ".png"  { $response.ContentType = "image/png" }
                ".jpg"  { $response.ContentType = "image/jpeg" }
                ".svg"  { $response.ContentType = "image/svg+xml" }
                default { $response.ContentType = "application/octet-stream" }
            }
            
            $response.ContentLength64 = $bytes.Length
            $output = $response.OutputStream
            $output.Write($bytes, 0, $bytes.Length)
            $output.Close()
        } else {
            $response.StatusCode = 404
            [byte[]]$buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $buffer.Length
            $output = $response.OutputStream
            $output.Write($buffer, 0, $buffer.Length)
            $output.Close()
        }
    }
} finally {
    if ($listener.IsListening) { $listener.Stop() }
}

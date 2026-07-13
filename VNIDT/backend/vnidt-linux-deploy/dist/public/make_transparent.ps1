Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\Long Nguyen\OneDrive\Google Antigravity\VNIDT\04_Assets\Logo.png")
$bmp = New-Object System.Drawing.Bitmap($img)
$img.Dispose()
$bg = $bmp.GetPixel(0,0)
$bmp.MakeTransparent($bg)
$bmp.Save("C:\Users\Long Nguyen\OneDrive\Google Antigravity\VNIDT\04_Assets\Logo_transparent.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

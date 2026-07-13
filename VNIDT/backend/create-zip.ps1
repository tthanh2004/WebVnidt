$zip = Join-Path $PSScriptRoot "vnidt-deploy.zip"
$src = Join-Path $PSScriptRoot "vnidt-deploy\*"
Remove-Item $zip -Force -ErrorAction SilentlyContinue
Compress-Archive -Path $src -DestinationPath $zip -Force
$s = (Get-Item $zip).Length / 1MB
Write-Host "ZIP created: $zip"
Write-Host "Size: $([math]::Round($s, 2)) MB"

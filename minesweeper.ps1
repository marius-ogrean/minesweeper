Set-Location -Path "D:\Development\Minesweeper"

# Start npm in a separate window
Start-Process cmd -ArgumentList "/k npm start"

Write-Host "Waiting for server on port 4200..."

# Loop every 500ms until port 4200 responds
while (-not (Test-NetConnection -ComputerName localhost -Port 4200 -InformationLevel Quiet)) {
    Start-Sleep -Milliseconds 500
}

# Launch the default browser
Start-Process "http://localhost:4200"
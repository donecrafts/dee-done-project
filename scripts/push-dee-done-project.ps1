# Push this portfolio to: https://github.com/donecrafts/dee-done-project
#
# STEP 1 (browser, once): https://github.com/new
#   Owner: donecrafts | Name: dee-done-project | Public | empty (no README)
#
# STEP 2 (PowerShell):
#   cd "c:\Users\HP\Desktop\my-ptifolio-website\neon-canvas-portfolio"
#   powershell -ExecutionPolicy Bypass -File ".\scripts\push-dee-done-project.ps1"

$ErrorActionPreference = "Stop"
$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $RepoRoot
Write-Host "Project root: $RepoRoot" -ForegroundColor Cyan

git config --local user.name "donecrafts"
git config --local user.email "doneporpor@gmail.com"

$remoteUrl = "https://github.com/donecrafts/dee-done-project.git"
$remotes = @(git remote 2>$null)
if ($remotes -contains "origin") {
  git remote set-url origin $remoteUrl
} else {
  git remote add origin $remoteUrl
}
Write-Host "Remote origin -> $remoteUrl" -ForegroundColor Cyan

git branch -M main
git add -A
$dirty = git status --porcelain
if ($dirty) {
  git commit -m "dee-done-project: portfolio ready for deploy"
  Write-Host "Committed local changes." -ForegroundColor Green
} else {
  Write-Host "Nothing new to commit." -ForegroundColor Yellow
}

Write-Host "`nPushing to origin main...`n" -ForegroundColor Cyan
git push -u origin main
if ($LASTEXITCODE -eq 0) {
  Write-Host "`nDone: https://github.com/donecrafts/dee-done-project" -ForegroundColor Green
} else {
  Write-Host @"

Push failed. Create an EMPTY repo first (no README):
  https://github.com/new  ->  donecrafts / dee-done-project

Then run:
  git push -u origin main
"@ -ForegroundColor Red
}

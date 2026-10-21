# Publish/update this ORIGINAL app in your own GitHub repository.
# Requires: git, gh. No Python or Android Studio required.
$ErrorActionPreference = 'Stop'
Set-Location -Path $PSScriptRoot
$repo = 'ShinyShinChan/DragonReadingQuest-FireTV'

function Need($cmd, $wingetId) {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
    Write-Host "Missing $cmd. Install using: winget install --id $wingetId -e" -ForegroundColor Yellow
    throw "Please install $cmd and reopen PowerShell."
  }
}
Need git 'Git.Git'
Need gh 'GitHub.cli'

& gh auth status 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Host 'Please sign in to GitHub in the browser...' -ForegroundColor Cyan
  & gh auth login
  if ($LASTEXITCODE -ne 0) {throw 'GitHub login failed.'}
}
& gh auth setup-git
$login = (& gh api user --jq '.login').Trim()
if ($login -ne 'ShinyShinChan') {
  throw "GitHub is logged in as '$login' but this script targets ShinyShinChan. Run gh auth switch to choose the correct account."
}
if (-not (Test-Path '.git')) {
  & git init
  if ($LASTEXITCODE -ne 0) {throw 'git init failed'}
  & git branch -M main
}
# Local-only identity defaults, without touching global Git settings.
& git config --get user.name | Out-Null
if ($LASTEXITCODE -ne 0) { & git config user.name $login }
& git config --get user.email | Out-Null
if ($LASTEXITCODE -ne 0) { & git config user.email "$login@users.noreply.github.com" }
& git add -A
& git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  & git commit -m 'Build Dragon Reading Quest Fire TV app'
  if ($LASTEXITCODE -ne 0) {throw 'Git commit failed'}
}
& gh repo view $repo --json name 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Creating GitHub repository $repo..." -ForegroundColor Cyan
  & gh repo create $repo --public --source . --remote origin --push
  if ($LASTEXITCODE -ne 0) {throw 'Repository creation failed'}
} else {
  & git remote get-url origin 2>$null | Out-Null
  if ($LASTEXITCODE -ne 0) { & git remote add origin "https://github.com/$repo.git" }
  & git branch -M main
  & git push -u origin main
  if ($LASTEXITCODE -ne 0) {throw 'Git push failed. Check for remote changes and try again.'}
}
Write-Host ''
Write-Host 'Source published! GitHub Actions will build the APK.' -ForegroundColor Green
Write-Host "Repository: https://github.com/$repo"
Write-Host "Actions: https://github.com/$repo/actions"
Write-Host "APK Release: https://github.com/$repo/releases/tag/firetv-latest"
Write-Host 'The Release download will appear once the build succeeds.'

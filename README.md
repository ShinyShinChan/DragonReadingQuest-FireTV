# Dragon Reading Quest — Fire TV

A colorful **offline phonics adventure** for preschool / kindergarten beginning readers. This is an **original** educational app, inspired by the approach of classic systematic phonics programs, but it is not affiliated with Hooked on Phonics and contains no Hooked on Phonics content.

## At a glance

- 21 ordered lessons across 7 illustrated worlds
- 30 taught single-letter and two-letter sound spellings (`s, a, t ... sh, ch, th, ck, wh`)
- Sound-listening quizzes, word-picture matching, and letter-tile spelling
- 3 original short, read-along stories with listening and comprehension challenges
- 161 bundled, prerecorded *synthetic* voice and sound clips — **no internet or third-party voice service needed**
- Stars, six award badges, resume / replay any unlocked lesson
- Parent screen for progress tracking and renaming reader (defaults to Amara)
- Saves progress **on the Fire Stick** using Android SharedPreferences
- No sign-in, external links, tracking, ads, payments, or in-app purchases
- Runs full-screen; D-pad, Select, Back, and Play/Pause remote control
- Includes original dragon mascot, app icon and Fire TV banner

> **Voice quality note:** The included clips are generated with offline synthesizer eSpeak and sound robotic. Letter sound quality and pronunciation can vary, especially stop consonants and some vowel examples. A parent should listen to and model each phoneme carefully. The app is a starter reading tool, not a professionally validated/comprehensive phonics curriculum.

## Quick installation / APK build via GitHub (Windows)

This ZIP contains a complete **Android Gradle source project**, not a prebuilt APK. An Android SDK was not available where the project was created, so this version has been **browser-tested but not compiled/tested on a physical Fire Stick**.

### Option A — one-click publisher for Windows

1. Unzip `DragonReadingQuest-FireTV-Source.zip`.
2. Install **Git for Windows** and **GitHub CLI (`gh`)** if you don't already have them.
3. Sign in: open PowerShell and run `gh auth login` (choose GitHub.com > HTTPS > Login with browser).
4. Right-click the unzipped folder and **Open in Terminal**.
5. Run:

   ```powershell
   powershell -ExecutionPolicy Bypass -File .\PUBLISH-GITHUB-WINDOWS.ps1
   ```

   This publishes a new public repository at `ShinyShinChan/DragonReadingQuest-FireTV`, or updates that repo if it already exists. It does **not** modify your existing FireLounge project.
6. After the GitHub action completes, download `DragonReadingQuest-FireTV.apk` from the repository's **Releases** page (or download the Actions artifact ZIP and extract the APK).
7. Move the APK to the Fire Stick using your preferred sideloading method (for example, your Fire TV browser / Downloader using a short link to the public Release asset). Allow installation from that app when Fire TV prompts you.

### Option B — Android Studio

Open this extracted folder in Android Studio (JDK 17 / Android SDK 35). Build > Build Bundle(s) / APK(s) > Build APK(s). Install the resulting `app/build/outputs/apk/debug/app-debug.apk` on your Fire TV.

### Option C — GitHub browser upload

Create a repository called `DragonReadingQuest-FireTV` and upload the *contents of the extracted directory* to its root, **including the hidden `.github/workflows/build-apk.yml` folder**. The included workflow builds on every push to `main` or `master` and publishes an APK artifact plus a Release asset (`firetv-latest`). Uploading only the original ZIP as a single GitHub file does not build the project.

## Remote controls

| Fire TV remote | Action |
|---|---|
| Left / Right / Up / Down | Move between big tiles/buttons |
| Select (middle button) | Choose highlighted tile |
| Back | Go to lessons or Home |
| Play/Pause | Repeat most recently played sound/instruction |
| Menu (where available) | Grown-Up Corner |

There is a visible **Repeat Sound** button if your remote does not have Play/Pause. All activities are untimed.

## Reading approach

1. In **Sound Garden**, model *letter sounds*, not only letter names. Stretch continuous sounds (`ssss`, `mmmm`) and avoid adding extra “uh” to consonant sounds.
2. Help the child point to letters left-to-right and blend CVC words: `s ... a ... t` → `sat`.
3. In the word quiz, let her sound out the written word before identifying the picture. In spelling puzzles, let her listen, segment, then select the letter tiles.
4. Encourage replays and praise efforts. Wrong answers never deduct stars or block retries.
5. Read physical picture books together, too! Phonics is an important piece of early literacy, not the whole reading experience.

A manageable starting routine is **5–10 minutes**, adjusted to attention and interest. Don't rush to complete all the lessons. This is an original starter sequence rather than a replacement for an educator's structured curriculum.

## Updating & protecting progress

The default GitHub Actions workflow produces a **debug-signed** APK. The signing key can change between runner builds. If Fire TV reports an installation signature conflict, uninstalling the old app and installing the new one may work **but can erase locally saved progress**. For ongoing family use, establish and protect a persistent Android signing keystore before making subsequent releases, and use it for every update; never commit that signing keystore to a public repository. An ordinary reinstall with the **same** signing key preserves app data.

## Browser preview

Open `app/src/main/assets/index.html` in Chrome after extracting the ZIP. Use **arrow keys + Enter** as the Fire TV remote. Some browsers restrict playback from locally opened files until your first interaction. The preview stores progress in browser localStorage rather than Fire TV's Android SharedPreferences.

## Tech & files

- Native `MainActivity.java` launches an offline HTML/CSS/JS WebView and provides a limited bridge for saving progress and playing packaged MP3s. No Internet permission is requested.
- `app/src/main/assets/` — complete game and offline audio
- `app/src/main/res/drawable-nodpi/` — original app icon and launch banner
- `.github/workflows/build-apk.yml` — Gradle build and public Releases upload
- `scripts/make_audio.py` — optional eSpeak/ffmpeg audio regeneration
- `scripts/make_art.py` — optional graphic regeneration
- `PUBLISH-GITHUB-WINDOWS.ps1` — convenient initial publish/update

Copyright © 2026. Original family project. Android / Amazon Fire TV are trademarks of their respective owners.

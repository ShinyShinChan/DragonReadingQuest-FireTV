package com.dragonquest.phonics;

import android.app.Activity;
import android.annotation.SuppressLint;
import android.os.Bundle;
import android.os.Build;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.AssetFileDescriptor;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.IOException;
import java.util.Locale;

public class MainActivity extends Activity {
    private WebView browser;
    private MediaPlayer player;
    private SharedPreferences prefs;
    private static final String STORE = "dragon_reading_quest_v1";

    @SuppressLint("SetJavaScriptEnabled")
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION);
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        prefs = getSharedPreferences(STORE, Context.MODE_PRIVATE);
        browser = new WebView(this);
        browser.setBackgroundColor(Color.rgb(9, 16, 46));
        browser.getSettings().setJavaScriptEnabled(true);
        browser.getSettings().setDomStorageEnabled(true);
        browser.getSettings().setAllowFileAccess(true);
        browser.getSettings().setMediaPlaybackRequiresUserGesture(false);
        browser.addJavascriptInterface(new AppBridge(), "DragonBridge");
        browser.setWebChromeClient(new WebChromeClient());
        browser.setWebViewClient(new WebViewClient());
        browser.setFocusable(true);
        browser.setFocusableInTouchMode(true);
        setContentView(browser);
        browser.loadUrl("file:///android_asset/index.html");
        browser.requestFocus();
    }

    private class AppBridge {
        @JavascriptInterface public String loadProgress() {
            return prefs.getString("progress", "");
        }
        @JavascriptInterface public void saveProgress(String json) {
            if (json != null && json.length() < 120000) {
                prefs.edit().putString("progress", json).apply();
            }
        }
        @JavascriptInterface public void playSound(String clip) {
            if (clip != null && clip.matches("[a-z0-9_]{1,64}")) {
                runOnUiThread(() -> playClip(clip));
            }
        }
    }

    private void playClip(String clip) {
        if (player != null) { try { player.stop(); } catch (Exception ignored) {} player.release(); player = null; }
        try (AssetFileDescriptor afd = getAssets().openFd("audio/" + clip + ".mp3")) {
            MediaPlayer mp = new MediaPlayer();
            mp.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength());
            mp.setOnCompletionListener(m -> { m.release(); if (player == m) player = null; });
            mp.setOnErrorListener((m, w, e) -> { m.release(); if (player == m) player = null; return true; });
            mp.prepare();
            player = mp;
            mp.start();
        } catch (IOException | IllegalStateException ignored) { }
    }

    private void sendKey(String name) {
        if (browser != null) browser.evaluateJavascript("window.tvKey && window.tvKey('" + name + "');", null);
    }

    @Override public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (event.getRepeatCount() > 0 && keyCode == KeyEvent.KEYCODE_DPAD_CENTER) return true;
        switch (keyCode) {
            case KeyEvent.KEYCODE_DPAD_LEFT: sendKey("LEFT"); return true;
            case KeyEvent.KEYCODE_DPAD_RIGHT: sendKey("RIGHT"); return true;
            case KeyEvent.KEYCODE_DPAD_UP: sendKey("UP"); return true;
            case KeyEvent.KEYCODE_DPAD_DOWN: sendKey("DOWN"); return true;
            case KeyEvent.KEYCODE_DPAD_CENTER:
            case KeyEvent.KEYCODE_ENTER: sendKey("SELECT"); return true;
            case KeyEvent.KEYCODE_MEDIA_PLAY_PAUSE: sendKey("REPLAY"); return true;
            case KeyEvent.KEYCODE_MEDIA_REWIND: sendKey("BACK"); return true;
            case KeyEvent.KEYCODE_MENU: sendKey("MENU"); return true;
            case KeyEvent.KEYCODE_BACK: sendKey("BACK"); return true;
            default: return super.onKeyDown(keyCode, event);
        }
    }

    @Override public void onBackPressed() { sendKey("BACK"); }

    @Override protected void onDestroy() {
        if (player != null) { player.release(); player = null; }
        if (browser != null) { browser.destroy(); browser = null; }
        super.onDestroy();
    }
}

/**
 * FOUC-prevention theme initialization.
 *
 * This file is loaded synchronously from <head> with NO defer/async so it
 * runs before first paint. It cannot move to script.js (which loads at the
 * end of <body>) without causing a flash of light theme for dark-mode users.
 *
 * Extracted from inline <script> so the Content-Security-Policy can use a
 * strict script-src 'self' without needing a fragile sha256 hash.
 */
(function () {
  'use strict';
  var stored = localStorage.getItem('jkindrix-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

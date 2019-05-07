/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "caf9dd6c8a422d57ad874e2d3f23d998"
  },
  {
    "url": "about.html",
    "revision": "f9ef6cb756c7d71e4d3e24f8a8525e58"
  },
  {
    "url": "css/base.css",
    "revision": "589f053bbac8f9f48c6eb03d77e1fb1f"
  },
  {
    "url": "css/index.css",
    "revision": "091caf3d4aebe4f8ce39da42954d6743"
  },
  {
    "url": "css/layout.css",
    "revision": "589f053bbac8f9f48c6eb03d77e1fb1f"
  },
  {
    "url": "css/normalize.css",
    "revision": "ac230a49d6d655cc2498c292b6acb158"
  },
  {
    "url": "index.html",
    "revision": "373024070b3d3cb4b084e4a1fdacd048"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js");

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
    "revision": "ae83b2c60653544a830876e674772faa"
  },
  {
    "url": "about.html",
    "revision": "c1c06b2c3f73faef2ba0c5bee6b00c76"
  },
  {
    "url": "css/index.css",
    "revision": "589f053bbac8f9f48c6eb03d77e1fb1f"
  },
  {
    "url": "index.html",
    "revision": "6f732234f34b319c75c5691259d16275"
  },
  {
    "url": "table.html",
    "revision": "f1f64dc0b324acf82eced0c27a07f076"
  },
  {
    "url": "table2.html",
    "revision": "64867a204fcbd2942965ada0ab8bece8"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

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

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js')

workbox.core.skipWaiting()

workbox.core.clientsClaim()

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    'url': '404.html',
    'revision': '1658ab6bc2d4673dabbcc449fba5427d'
  },
  {
    'url': 'about.html',
    'revision': 'f9ef6cb756c7d71e4d3e24f8a8525e58'
  },
  {
    'url': 'css/index.css',
    'revision': '589f053bbac8f9f48c6eb03d77e1fb1f'
  },
  {
    'url': 'index.html',
    'revision': 'd1197e05156108d8f336cdbc6fb1a842'
  },
  {
    'url': 'table.html',
    'revision': 'b14cd7b845a40ffedd3fe367e959219c'
  },
  {
    'url': 'table2.html',
    'revision': '07a16563b13b877350299bc3e561ce74'
  }
].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

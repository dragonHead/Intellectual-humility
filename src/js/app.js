import "@babel/polyfill";
import {hello} from './sub';
hello();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./serviceWorker.js').then(registration => {
        console.debug('SW registered: ', registration);
      }).catch(registrationError => {
        console.debug('SW registration failed: ', registrationError);
      });
    });
}
import "@babel/polyfill";
import {hello} from './sub';
hello();

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker.register('./js/serviceWorker.js').then(registration => {
//         console.log('SW registered: ', registration);
//       }).catch(registrationError => {
//         console.log('SW registration failed: ', registrationError);
//       });
//     });
// }
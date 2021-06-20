self.addEventListener('message', (msg) => {
  console.debug('Child Worker: Message received from parent worker', msg.data.message);
});

self.postMessage({message: 'Hello worker'});
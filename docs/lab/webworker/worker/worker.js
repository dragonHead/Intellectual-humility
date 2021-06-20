self.addEventListener('message', (msg) => {
  console.debug("self!!!!!!");
  console.debug('Worker: Message received from main script', msg.data.message);

  self.postMessage({ message: 'Posting message back to main script'});
})

// Dedicated workerからDedicated Workerを作ることはできる。
// 現在はShared Worker,Service WorkerからDedicated Worker作ったり、また逆も作ることはできない。
const child_worker = new Worker('child_worker.js');
child_worker.addEventListener('message', (msg) => {
  console.debug("child!!!!!!");
  const childMessage = msg.data;
  self.postMessage(childMessage);
})

child_worker.addEventListener('error', (err) => {
  console.debug('There is an error with child worker!',
   {message: err.message, filename: err.filename, lineno: err.lineno}
  );
})


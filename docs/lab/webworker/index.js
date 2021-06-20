if (window.Worker) {
  const worker = new Worker('worker/worker.js', { type: 'module' });
  worker.postMessage({ message: 'Message posted to worker' });

  worker.addEventListener('message', (msg) => {
    console.debug('Message received from worker', msg.data.message);
  });

  worker.addEventListener('error', (err) => {
    console.debug('There is an error with worker!',
     {message: err.message, filename: err.filename, lineno: err.lineno}
    );
  })

  // ワーカーの終了
  // 親workerをterminateすると、子workerも一緒にterminateされる。
  // worker.terminate();

} else {
  console.debug('browser doesn\'t support web workers.' );
}
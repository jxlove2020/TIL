const { Worker, isMainThread, parentPort } = require('worker_threads');

if ( isMainThread ) {  // 메인스레드
    const worker = new Worker(__filename);
    worker.on('message', (value) => console.log('워커로부터', value));
    worker.on('exit', () => console.log('워커 끝'));
    worker.postMessage('ping');
} else { // 워커스레드
    parentPort.on('message', (value) => {
        console.log('부모로부터', value);
        parentPort.postMessage('pong');
        parentPort.close();
    });
}
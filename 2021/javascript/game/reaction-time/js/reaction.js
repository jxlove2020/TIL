var screen = document.querySelector('#screen');

var state = {
    waiting: 1,

};

var startTime;
var endTime;
var record = [];
var timeOut;

screen.addEventListener('click', function() {
    if(screen.classList.contains('waiting')) {
        screen.classList.remove('waiting');
        screen.classList.add('ready');
        screen.textContent = '초록색이 되면 클릭하세요';
        timeOut = setTimeout(function() {
            startTime = new Date();
            screen.click();
        }, Math.floor(Math.random() * 1000)+ 2000); // 2000에서 3000 사이의 수
    } else if(screen.classList.contains('ready')) {
        // ready 일 경우  
        if (!startTime) {
            clearTimeout(timeOut);
            screen.classList.remove('ready');
            screen.classList.add('waiting');
            record.push('X');
            screen.textContent = '너무 성급하시네요! 다시 클릭';
        } else {
            screen.classList.remove('ready');
            screen.classList.add('now');
            screen.textContent = '클릭하세요';
        }        
    } else if(screen.classList.contains('now')) {
        endTime = new Date();
        console.log('반응속도', endTime-startTime, 'ms');
        record.push(endTime-startTime);

        document.getElementById('result').innerHtml = record.toString();
        
        // 시작시간 , 끝시간 초기화
        startTime = null;
        endTime = null;

        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent = '클릭해서 시작하세요';
    }
});

// 시간 체크 방법
// console.time('시간');
// console.timeEnd('시간');
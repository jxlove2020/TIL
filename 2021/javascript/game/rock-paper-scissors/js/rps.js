var comSelect = '-5px';
// dictionary
var rps = { rock : '-5px', paper : '-211px', scissors : '-416px'};

// 점수표
var point = { rock : 0, paper : -1, scissors : 1 };

// Object.entries()로 객체를 배열로 바꿀수 있음.
// 찾기 1차원 배열일 때indexof, 2차원 배열일 때 find 또는 findIndex 를 사용 
// find 는 반복문이라고 생각하면 됨.
// Console.log(Object.entries(rps));
function comSelectFind(comSelect){
    return Object.entries(rps).find(function(v){
        return v[1] === comSelect;
    })[0];
}

// 인터벌 시간 주는 함수
var interval;
function intervalTime(time) {
    interval = setInterval(function(){
        if (comSelect === rps.rock){
            comSelect = rps.paper;
        } else if(comSelect === rps.paper) {
            comSelect = rps.scissors;
        } else {
            comSelect = rps.rock;
        }
    
        document.querySelector('#computer').style.background = 'url("/images/rps_sprite.png") ' + comSelect + ' -5px';
    }, time);
}

intervalTime(300);

document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('click', function() {
        var mySelectValue = this.value; // this.textContent;
        var comSelectValue = comSelectFind(comSelect);
        
        console.log('내 선택 : ', mySelectValue, ', 컴퓨터 선택 : ', comSelectValue);

        clearInterval(interval);
        setTimeout(function() {
            intervalTime(300);
            document.getElementById('result').innerHTML='';
        }, 1000);

        var myPoint = point[mySelectValue];
        var comPoint = point[comSelectValue];

        console.log(myPoint, comPoint);
        if(myPoint - comPoint === 0) {
            console.log('비겼습니다 ~~');
            document.getElementById('result').innerHTML='비겼습니다 ~~';
        } else if ([-1,2].includes(myPoint-comPoint)) {
            // 배열.includes 로 || 관계를 줄일 수 있음
            // myPoint-comPoint == -1 || myPoint-comPoint == 2 
            console.log('이겼습니다 ^^');
            document.getElementById('result').innerHTML='이겼습니다 ^^';
        } else {
            console.log('졌습니다 ㅠㅠ');
            document.getElementById('result').innerHTML='졌습니다 ㅠㅠ';
        }

    });
});

// 가위 1, 바위 0, 보 -1

//  (나,  컴퓨터)  가위     바위    보  
// 가위          (1, 1)  (1, 0)  (1, -1)
// 바위          (0, 1)  (0, 0)  (0, -1)
// 보           (-1, 1) (-1, 0) (-1, -1)
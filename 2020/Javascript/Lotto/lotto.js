var lotNum = Array(45).fill().map(function (el, index) {
    return index + 1;
});
console.log(lotNum);

var shuffle = [];
while ( lotNum.length > 0 ) {
    // 0부터 44번까지의 로또 번호를 랜덤하게 선택된 위치의 값을 하나씩 잘라서 배열의 값을 가져 옴
    var shift = lotNum.splice(Math.floor(Math.random() * lotNum.length), 1)[0];
    // 셔플이라는 배열에 값을 하나씩 추가
    shuffle.push(shift);
}
console.log(shuffle);

// 당첨 숫자는 shuffle 배열의 앞 자리 숫자 6개
var winNum = shuffle.slice(0,6);
// 보너스 숫자는 shuffle 배열의 마지막 자리 숫자
var bonusNum = shuffle[shuffle.length - 1];

console.log('당첨 숫자', winNum.sort(), '보너스 숫자', bonusNum);

var result = document.getElementById('result');

for (var i=0; i<winNum.length; i++){
    var ball = document.createElement('div');
    ball.classList = 'ball';
    ball.textContent = winNum[i];

    var ballColor = fnNumColor( winNum[i] );
    ball.classList.add(ballColor);

    result.appendChild(ball);
}

function fnNumColor(num) {
    if (num <= 10){
        color = 'red';
    }
    else if (num <= 20){
        color = 'orange';
    }
    else if (num <= 30){
        color = 'yellow';
    }
    else if (num <= 40){
        color = 'blue';
    }
    else {
        color = 'green';
    }
    return color;
}

var bonusBox = document.getElementsByClassName('bonus')[0];
var bonusBall = document.createElement('div');
bonusBall.classList = 'ball';

var ballColor = fnNumColor( bonusNum );
bonusBall.classList.add(ballColor);

bonusBall.textContent = bonusNum;
bonusBox.appendChild(bonusBall);
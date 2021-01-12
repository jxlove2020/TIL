var col = 4; 
var row = 3;
var colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink' ];
 // 참조를 끊어주는 함수 obj.slice() 또는 JSON.parse(JSON.stringify(obj))
var colorArr = colors.slice();
var color = [];
var clickCard = [];
var matchingCard = [];
var clickFlag = true; 
var startTime;

function shuffle(){
    // 색상 섞기
    for (var i=0; colorArr.length > 0; i++){
        // 피셔예이츠 : 랜덤으로 섞을 때 하는 방식 : 배열을 잘라서 다시 만들기 때문에 대입해 줘야함
        color = color.concat(colorArr.splice(Math.floor(Math.random() * colorArr.length), 1));
    }
    // console.log(color);
}

// 카드 세팅
function cardSet (col, row) {
    clickFlag = false;
    for(var i= 0; i < col * row; i++){
        var card = document.createElement('div');
        card.className = 'card';
        
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        
        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';

        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = color[i];

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        // 즉시실행함수 사용하여 클로저 문제 해결
        (function (c){
            card.addEventListener('click', function(){
                if(clickFlag && !matchingCard.includes(c)){
                    c.classList.toggle('flipped');
                    clickCard.push(c);
                    console.log(clickCard);
                    // 카드 두개 선택
                    if (clickCard.length === 2) {
                        // 카드 색상이 같으면
                        if ( clickCard[0].querySelector('.card-back').style.backgroundColor ===
                            clickCard[1].querySelector('.card-back').style.backgroundColor ) { 
                                // 짝 맞춘 카드 푸시
                                matchingCard.push(clickCard[0]);
                                matchingCard.push(clickCard[1]);

                                // 클릭카드 배열 초기화
                                clickCard = [];

                                // 짝을 모두 맞췄을 때
                                if (matchingCard.length === col * row){
                                    var endTime = new Date();
                                    alert('축하합니다. 성공 !! ' + (endTime - startTime) / 1000 + '초 걸렸습니다. ');
                                    // 초기화
                                    document.querySelector('#wrapper').innerHTML = '';
                                    colorArr = colors.slice();
                                    color = [];
                                    matchingCard = [];
                                    startTime = null;
                                    shuffle();
                                    cardSet(col, row);
                                }
                        } else {
                            // 카드 색상이 다르면
                            clickFlag = false;
                            setTimeout(function() {
                                clickCard[0].classList.remove('flipped');
                                clickCard[1].classList.remove('flipped');
                                clickFlag = true;
                                clickCard = [];
                            }, 1000);

                        }
                    }
                }
            });
        })(card);
        document.querySelector('#wrapper').appendChild(card);
    }

    // 카드 보여주기 : 시간차 주면서 보여주기
    document.querySelectorAll('.card').forEach(function (card, index) {
        setTimeout(function() {
            card.classList.add('flipped');
        }, 1000 + 100 * index);
    });

    // 5초 뒤에 카드 뒤집어 시작할 수 있게 하기
    setTimeout(function() {
        document.querySelectorAll('.card').forEach(function(card, index) {
            card.classList.remove('flipped');
        });
        clickFlag = true;
        startTime = new Date();
    }, 5000);
}

shuffle();
cardSet (col, row);
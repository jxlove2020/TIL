var rival = {
    deck: document.getElementById('rival-deck'),
    hero: document.getElementById('rival-hero'),
    field: document.getElementById('rival-cards'),
    cost: document.getElementById('rival-cost'),
    deckData: [],
    heroData: [],
    fieldData: [],
    selectedCard: null,
    selectedCardData: null,
};
var my = {
    deck: document.getElementById('my-deck'),
    hero: document.getElementById('my-hero'),
    field: document.getElementById('my-cards'),
    cost: document.getElementById('my-cost'),
    deckData: [],
    heroData: [],
    fieldData: [],
    selectedCard: null,
    selectedCardData: null,
};

var turnBtn = document.getElementById('turn-btn');
var turn = true; // turn 이 true 이면 myTurn, false 이면 rivalTurn

function deckToField(data, myTurn) {
    var obj = myTurn ? my : rival;
    var curCost = Number(obj.cost.textContent);

    // 내 코스트가 현재 코스트보다 작으면 리턴
    if ( curCost < data.cost){
        return 'end';
    }

    var idx = obj.deckData.indexOf(data);
    obj.deckData.splice(idx, 1);
    obj.fieldData.push(data);
    // 화면 초기화
    obj.deck.innerHTML = '';
    obj.field.innerHTML = '';
    obj.fieldData.forEach(function(fieldData){
        cardDomFn(fieldData, obj.field);
    });
    obj.deckData.forEach(function(deckData){
        cardDomFn(deckData, obj.deck);
    })
    data.field = true;
    obj.cost.textContent = curCost - data.cost;
}

// 내화면 myDraw true
function reDrawing(myDraw) {
    var obj = myDraw ? my : rival;
    obj.hero.innerHTML = '';
    obj.field.innerHTML = '';
    obj.fieldData.forEach(function(data){
        cardDomFn(data, obj.field);
    });
    obj.deck.innerHTML = '';
    obj.deckData.forEach(function(data){
        cardDomFn(data, obj.deck);
    });
    cardDomFn(obj.heroData, obj.hero, true);
}

// 내턴 이면 myTurn : true // 컴퓨터 턴이면 myTurn : false
function turnActionFn(card, data, myTurn) {
    var friendly = myTurn ? my : rival;
    var enemy = myTurn ? rival : my;

    // 선택된 내 카드가 끝난 카드가 아니면
    if(card.classList.contains('card-turnover')){
        return;
    }
    // 상대 카드면서 내 카드가 선택되어있으면
    var enemyCard = myTurn ? !data.mine : data.mine;
    if (enemyCard && friendly.selectedCard) {
        data.hp = data.hp - friendly.selectedCardData.attack;

        if (data.hp <= 0) {
            var idx = enemy.fieldData.indexOf(data);
            if (idx > -1 ){
                enemy.fieldData.splice(idx,1);
            } else {
                alert('승리하셨습니다.');
                init();
            }
        }

        // 내화면 다시그리기 : true 상대화면 다시 그리기 :  false
        reDrawing(!myTurn); 
        friendly.selectedCard.classList.remove('card-selected');
        friendly.selectedCard.classList.add('card-turnover');
        friendly.selectedCard = null;
        friendly.selectedCardData = null;
        return;
    } else if (enemyCard) { 
        // 상대 카드일 경우 클릭시 리턴
        return;
    }
    if (data.field) { // 카드가 필드에 있으면
        card.parentNode.querySelectorAll('.card').forEach(function(card){
            card.classList.remove('card-selected')
        });
        card.classList.add('card-selected');
        friendly.selectedCard = card;
        friendly.selectedCardData = data;
    } else {
        // 두번째 매개변수 myTurn: true이면 내 턴 false 이면 컴퓨터 턴
        if (deckToField(data, myTurn) != 'end'){
            myTurn ? myDeckFn(1) : rivalDeckFn(1);
        }
    }    
}

function cardDomFn(data, dom, hero) {
    var card = document.querySelector('.card-hidden .card').cloneNode(true);
        card.querySelector('.card-cost').textContent = data.cost;
        card.querySelector('.card-attack').textContent = data.attack;
        card.querySelector('.card-hp').textContent = data.hp;

        if (hero) {
            card.querySelector('.card-cost').style.display = 'none';
            var name = document.createElement('div');
            name.textContent = 'Hero';
            card.appendChild(name);
        }

        card.addEventListener('click', function() {
            turnActionFn(card, data, turn);
        });

        dom.appendChild(card);
}

function rivalDeckFn(count) {
    for(var i = 0; i < count; i++){
        rival.deckData.push(cardFactory());
    }
    rival.deck.innerHTML = '';
    rival.deckData.forEach(function(data) {
        cardDomFn(data, rival.deck);
    });
}

function myDeckFn(count) {
    for(var i = 0; i < count; i++){
        // 영웅은 아니지만, 내 카드
        my.deckData.push(cardFactory(false, true));
    }
    my.deck.innerHTML = '';
    my.deckData.forEach(function(data) {
        cardDomFn(data, my.deck);
    });
}

function rivalHeroFn() {
    // 영웅 이지만 내카드는 아니다.. 두번째 매개변수 사용하지 않으면 false
    rival.heroData = cardFactory(true);
    cardDomFn(rival.heroData, rival.hero, true);
}

function myHeroFn() {
    // 영웅이고, 내 카드
    my.heroData = cardFactory(true, true);
    cardDomFn(my.heroData, my.hero, true);
}

// 생성자 : 함수명 대문자 시작 : new 키워드 사용 new Card();
function Card(hero, myCard) {
    if (hero){
        this.attack = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
    } else {   
        this.attack = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.attack + this.hp) / 2);    
    }

    if (myCard){
        this.mine = true;
    }
}

function cardFactory(hero, myCard) {
    return new Card(hero, myCard);    
}

function init() {
    rivalDeckFn(5);
    myDeckFn(5);
    rivalHeroFn();
    myHeroFn();
    reDrawing(true);
    reDrawing(false);
}

turnBtn.addEventListener('click', function(){
    // 턴이 바뀌면 다시 그려줌
    var obj = turn ? my : rival;
    obj.field.innerHTML = '';
    obj.hero.innerHTML = '';
    
    obj.fieldData.forEach(function(data){
        cardDomFn(data, obj.field);
    });
    cardDomFn(obj.heroData, obj.hero, true);

    // 턴이 바뀜
    turn = !turn;

    if (turn) {
        my.cost.textContent = 10;
    } else {
        rival.cost.textContent = 10;
    }

    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
})

init();
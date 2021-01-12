var table =  document.createElement('table');
var lines = [];
var boxes = [];
var turn = 'X';
var resultDiv = document.createElement('div');

function init(tie) {
    // 초기화 시 결과 메시지 보여줌.
    if (tie){
        resultDiv.textContent = '무승부입니다.';
    } else {
        resultDiv.textContent = turn + '님 승리!';
    }
    // 1초 뒤 결과 메시지 사라지면서 초기화
    setTimeout(function(){
        resultDiv.textContent = '';
        boxes.forEach(function (lineEle) {
            lineEle.forEach(function (boxEle) {
                boxEle.textContent = '';
            });
        });
        turn = 'X';
    }, 1000);
}

function resultCheck(clickLine, clickBox) {
// 3칸이 채워졌는지 확인 ======================================
    var isTrue = false;

    // 가로줄 검사
    if (
        boxes[clickLine][0].textContent === turn &&
        boxes[clickLine][1].textContent === turn &&
        boxes[clickLine][2].textContent === turn
    ) {
        isTrue = true;
    }
    // 세로줄 검사
    if (
        boxes[0][clickBox].textContent === turn &&
        boxes[1][clickBox].textContent === turn &&
        boxes[2][clickBox].textContent === turn
    ) {
        isTrue = true;
    }
    // 대각선 검사
    if (
        boxes[0][0].textContent === turn &&
        boxes[1][1].textContent === turn &&
        boxes[2][2].textContent === turn
    ) {
        isTrue = true;
    }

    if (
        boxes[0][2].textContent === turn &&
        boxes[1][1].textContent === turn &&
        boxes[2][0].textContent === turn
    ) {
        isTrue = true;
    }

    return isTrue;
} 

// 비동기 콜백함수 // 칸을 클릭했을 때
var asyncCall = function(e) {
    // 컴퓨터의 턴일 때 내가 클릭하지 않도록
    if (turn === 'O') {
        return;
    }
    
    // console.log(e.target);
    var clickLine = lines.indexOf(e.target.parentNode);
    var clickBox = boxes[clickLine].indexOf(e.target);
    // console.log( '몇번째 라인', clickLine + 1, '몇번째 칸', clickBox + 1 );

    // 칸이 이미 채워져있는지 확인
    if (boxes[clickLine][clickBox].textContent !== ''){
        // console.log('빈칸이 아닙니다.');
    } else {
        // console.log('빈칸입니다.')
        boxes[clickLine][clickBox].textContent = turn;

        // 3칸이 채워졌는지 확인
        var isTrue = resultCheck(clickLine, clickBox);

        // 컴퓨터의 턴 // 빈칸 중 하나를 컴퓨터가 고른다.
        var emptyBoxes = [];
        boxes.forEach(function(lineEle){
            lineEle.forEach(function(boxEle){
                emptyBoxes.push(boxEle);
            });
        });

        // if 문안에서 false 인 값 : false, '', 0, NaN, undefined, null  
        // filter 메서드는 return 값에서 false 값이 아닌 것을 리턴 해 준다.
        emptyBoxes = emptyBoxes.filter(function(boxEle){
            // boxEle.textContent = '' 값이기 때문에 false
            // false 값을 찾아야 하기 때문에 ! 를 붙여서 return 해준다.
            return !boxEle.textContent
        });
    
        if (isTrue) {
            // 초기화
            init(); // init(undefined); // init(false);
        }
        // 빈칸이 없으면 // 칸을 더이상 선택할 수 없으면.
        else if (emptyBoxes.length === 0) {
            init(true); 
        }
        else {
            if ( turn === 'X'){
                turn = 'O';
            } 

            // 1초 뒤 컴퓨터의 턴
            setTimeout(function(){
                console.log('컴퓨터의 턴입니다.');

                // 빈칸들 중에 하나를 랜덤으로 택해서
                var selectBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
                // 값을 넣어 준다. 
                selectBox.textContent = turn;

                // 컴퓨터가 승리했는지 여부 체크
                            
                var comClickLine = lines.indexOf(selectBox.parentNode);
                var comClickBox = boxes[comClickLine].indexOf(selectBox);
                            
                var isTrue = resultCheck(comClickLine, comClickBox);

                if (isTrue) {
                    // 초기화
                    init();
                }

                // 턴을 나한테 넘긴다.
                turn = 'X';
            }, 1000);
        }
    }
}

// 3줄을 만듭니다. 
for ( var i = 0; i < 3; i ++ ) {
    var line = document.createElement('tr');
    lines.push(line);
    boxes.push([]);
    // 3칸을 만듭니다.
    for ( var j = 0; j < 3; j++ ) {
        var box = document.createElement('td');
        box.addEventListener('click', asyncCall); // 비동기 콜백함수 호출
        boxes[i].push(box);
        line.appendChild(box);
    }
    table.appendChild(line);
}
document.body.appendChild(table);
document.body.appendChild(resultDiv);
// console.log(line, box);

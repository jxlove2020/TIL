var table =  document.createElement('table');
var lines = [];
var boxes = [];
var turn = 'X';
var resultDiv = document.createElement('div');
var count = 0;

function init() {
    count = 0;
    turn = 'X';
    boxes.forEach(function (lineEle) {
        lineEle.forEach(function (boxEle) {
            boxEle.textContent = '';
        });
    });
}

// 비동기 콜백함수
var asyncCall = function(e) {
    // console.log(e.target);

    var clickLine = lines.indexOf(e.target.parentNode);
    var clickBox = boxes[clickLine].indexOf(e.target);
    console.log( '몇번째 라인', clickLine + 1, '몇번째 칸', clickBox + 1 );

    if (boxes[clickLine][clickBox].textContent !== ''){
        console.log('빈칸이 아닙니다.');

    } else {
        console.log('빈칸입니다.')
        boxes[clickLine][clickBox].textContent = turn;
        count += 1;
        
        if (count === 1){
            resultDiv.textContent = '';
        }

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
        if( clickLine - clickBox === 0 ) {
            if (
                boxes[0][0].textContent === turn &&
                boxes[1][1].textContent === turn &&
                boxes[2][2].textContent === turn
            ) {
                isTrue = true;
            }
        }

        if( Math.abs( clickLine - clickBox)  === 2 ) {
            if (
                boxes[0][2].textContent === turn &&
                boxes[1][1].textContent === turn &&
                boxes[2][0].textContent === turn
            ) {
                isTrue = true;
            }
        }

        if (isTrue) {
            console.log( turn + '님 승리!' );
            resultDiv.textContent = turn + '님 승리!';
            // 초기화
            init();
        }
        else {
            if (count === 9) {
                console.log('무승부입니다.');
                resultDiv.textContent = '무승부입니다.';
                // 초기화
                init();
            }

            if ( turn === 'X'){
                turn = 'O';
            } else {
                turn = 'X';
            }
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

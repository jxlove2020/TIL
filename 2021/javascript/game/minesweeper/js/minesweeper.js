var tbody = document.querySelector('#table tbody');
var dataset = [];
var gameOver = false; // 중단플래그
var openTd = 0;
var dicFlag = {
    dfOpen: -1, 
    dfQuestion: -2, 
    dfFlag: -3, 
    dfFlagMine: -4,
    dfQuestionMine: -5, 
    dfMine: 1,
    dfTd: 0,
}; 

document.querySelector('#exec').addEventListener('click', function(){
    // 화면 초기화 // dataset 초기화
    tbody.innerHTML = '';
    openTd = 0;
    dataset = [];
    document.querySelector('#result').textContent = '';
    gameOver = false;

    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    // console.log(hor, ver, mine);

    // 지뢰 위치 뽑기 0 ~ 99
    var tdArr = Array(hor * ver).fill().map(function(el, idx){
        return idx;
    });
    var shuffle = [];
    
    while (tdArr.length > hor * ver - mine){
        // 셔플 값 생성 : 생성된 tdArr의 개수 * 랜덤 번째 자리부터 1자리 잘라서
        // 값을 가져온다. shuffle 배열에 값을 하나씩 추가하여 담는다.
        var moveValue = tdArr.splice(Math.floor(Math.random() * tdArr.length), 1)[0];
        shuffle.push(moveValue);
    }

    // console.log(shuffle);

    // 지뢰 테이블 만들기
    for (var i = 0; i < ver; i++) {
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for (var j = 0; j < hor; j++) {
            arr.push(dicFlag.dfTd);
            var td = document.createElement('td');
                        
            // 비동기 : 순서가 달라지기 때문에 함수 바깥에서 사용하면
            // dataset 이 초기화 되는 현상이 생김
            // 마우스 오른쪽 클릭 이벤트는 contextmenu 
            td.addEventListener('contextmenu', function(e){
                e.preventDefault();
                // console.log('오른쪽 마우스 버튼 클릭');
                if (gameOver){
                    return;
                }  

                var parent_tbody = e.currentTarget.parentNode.parentNode;
                var parent_tr = e.currentTarget.parentNode;
                var current_line = Array.prototype.indexOf.call(parent_tbody.children, parent_tr);
                var current_td = Array.prototype.indexOf.call(parent_tr.children, e.currentTarget);
                // console.log(parent_tbody, parent_tr, e.currentTarget, current_line, current_td);

                // 깃발 대신 느낌표
                if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X'){
                    e.currentTarget.textContent = '!'; 
                    e.currentTarget.classList.remove('question');
                    e.currentTarget.classList.add('flag');

                    if(dataset[current_line][current_td] === dicFlag.dfMine){
                        dataset[current_line][current_td] = dicFlag.dfFlagMine;
                    } else {
                        dataset[current_line][current_td] = dicFlag.dfFlag;
                    }
                } else if (e.currentTarget.textContent === '!') {
                    e.currentTarget.textContent = '?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                    if(dataset[current_line][current_td] === dicFlag.dfFlagMine){
                        dataset[current_line][current_td] = dicFlag.dfQuestionMine;
                    } else {
                        dataset[current_line][current_td] = dicFlag.dfQuestion;
                    }
                } else if (e.currentTarget.textContent === '?') {
                    // console.log(dataset[current_line][current_td]);
                    e.currentTarget.classList.remove('question');

                    if(dataset[current_line][current_td] === dicFlag.dfQuestionMine){
                        e.currentTarget.textContent = 'X';
                        dataset[current_line][current_td] = dicFlag.dfMine;
                    } else {
                        e.currentTarget.textContent = '';
                        dataset[current_line][current_td] = dicFlag.dfTd;
                    }
                }                
            });

            // 마우스 왼쪽 클릭 
            td.addEventListener('click', function(e){   
                if (gameOver){
                    return;
                }             
                var parent_tbody = e.currentTarget.parentNode.parentNode;
                var parent_tr = e.currentTarget.parentNode;
                var current_line = Array.prototype.indexOf.call(parent_tbody.children, parent_tr);
                var current_td = Array.prototype.indexOf.call(parent_tr.children, e.currentTarget);
                // console.log(parent_tbody, parent_tr, e.currentTarget, current_line, current_td);

                if([dicFlag.dfOpen, dicFlag.dfFlag, dicFlag.dfFlagMine, dicFlag.dfQuestionMine, dicFlag.dfQuestion].includes(dataset[current_line][current_td])){
                    return;
                }

                // 클릭했을 때 주변 지뢰 개수
                e.currentTarget.classList.add('opened');
                openTd += 1;
                
                if(dataset[current_line][current_td] === dicFlag.dfMine) {
                    e.currentTarget.textContent = '펑';
                    document.querySelector('#result').textContent = 'GameOver !!!';
                    gameOver = true;
                } else {
                    // 반복적으로 다시 실행되는 것을 방지 , 속도 개선을 위해서
                    // 기존 0인 값을 1로 변경
                    dataset[current_line][current_td] = dicFlag.dfOpen;

                    // 현재 위치 제외 양 옆 2칸
                    var curLine = [ 
                        dataset[current_line][current_td - 1], 
                        dataset[current_line][current_td + 1] 
                    ];

                    // 총 여덟 칸 갯수 파악 // 현재 타켓 위치 제외
                    var around = curLine; // 현재 줄은 항상 존재 하므로 넣어줌

                    // 윗줄이 있다면 concat으로 넣어줌
                    // concat 은 다른 배열을 생성하므로 기존것에 대입
                    if (dataset[current_line - 1]){
                        // 윗 줄에서 현재 위치로부터 3칸
                        var aboveLine = [ 
                            dataset[current_line - 1][current_td - 1],
                            dataset[current_line - 1][current_td],
                            dataset[current_line - 1][current_td + 1]
                        ];
                        around = around.concat(aboveLine);
                    }
                    // 아랫줄이 있다면 concat으로 넣어줌
                    // concat 은 다른 배열을 생성하므로 기존것에 대입
                    if (dataset[current_line + 1]){                        
                        // 아랫줄에서 현재 위치로부터 3칸
                        var belowLine = [ 
                            dataset[current_line + 1][current_td - 1],
                            dataset[current_line + 1][current_td], 
                            dataset[current_line + 1][current_td + 1] 
                        ];
                        around = around.concat(belowLine);
                    }
                    // console.log(around);
                    
                    // 주변 지뢰 개수
                    // filter() 사용하여 지뢰개수 카운트 하기
                    var aroundMineCount = around.filter(function(v) {
                        return [dicFlag.dfMine, dicFlag.dfFlagMine, dicFlag.dfQuestionMine].includes(v);
                    }).length;

                    // 주변 지뢰 개수
                    // 거짓인값: false, '', 0, null, undefined, NaN 
                    // 거짓인 값이 앞에 있으면 || '' 뒤에 있는 값으로 변경
                    e.currentTarget.textContent = aroundMineCount || '';
                    
                    // 0 이 아닐때도 열었다고 표시 : 열면 dataset 에 표시
                    // textContext 에는 다른 값(지뢰개수)이 들어있지만 
                    // dataset 에는 0, 1, X로 표시 
                    dataset[current_line][current_td] = dicFlag.dfOpen;

                    // 주변 지뢰 개수 가 0 이면 9칸 모두 오픈
                    if (aroundMineCount === 0){
                        // 현재 칸 기준으로 양 옆 배열로 모음.     
                        var cur_td = [
                            tbody.children[current_line].children[current_td - 1],
                            tbody.children[current_line].children[current_td + 1],
                        ];

                        // 주변칸을 배열로 모음 : 현재 줄 기준
                        var around_td = cur_td;
                        
                        // 윗줄 기준 주변칸 배열로 모음.
                        if (tbody.children[current_line - 1]) {
                            var above_td = [ 
                                tbody.children[current_line - 1].children[current_td - 1],
                                tbody.children[current_line - 1].children[current_td],
                                tbody.children[current_line - 1].children[current_td + 1],
                            ];
                            around_td = around_td.concat(above_td);
                        }

                        // 아랫줄 기준 주변칸 배열로 모음.
                        if (tbody.children[current_line + 1]) {
                            var below_td = [ 
                                tbody.children[current_line + 1].children[current_td - 1],
                                tbody.children[current_line + 1].children[current_td],
                                tbody.children[current_line + 1].children[current_td + 1],
                            ];
                            around_td = around_td.concat(below_td);
                        }

                        // console.log(around_td);

                        // 재귀함수 : 반복문을 함수로 표현
                        around_td.filter(function (v) {
                            // console.log(v);
                            // console.log(!!v);
                            return !!v;  // !! undefined 제거 
                        }).forEach( function(side) {
                            var parent_tbody = side.parentNode.parentNode;
                            var parent_tr = side.parentNode;
                            var side_line = Array.prototype.indexOf.call(parent_tbody.children, parent_tr);
                            var side_td = Array.prototype.indexOf.call(parent_tr.children, side);
                            
                            if(dataset[side_line][side_td] !== dicFlag.dfOpen){
                                side.click();
                            }
                        });
                    }
                }

                // console.log(openTd, hor*ver-mine);
                if ( openTd === hor * ver - mine) {
                    gameOver = true;
                    document.querySelector('#result').textContent = '승리 ^^';
                }
            });

            tr.appendChild(td);
        }    
        tbody.appendChild(tr);
    }

    // 지뢰 심기 // 배열 0부터 시작 0~9
    for (var k = 0; k < shuffle.length; k++) {  // 예 : 숫자 70 이면 배열69
        var seroLineNum = Math.floor(shuffle[k] / ver); // 7줄 7 -> 6
        var garoLineNum = shuffle[k] % ver;             //     0 -> 9
        // console.log(seroLineNum, garoLineNum);

        // 지뢰 대신 X 표시
        tbody.children[seroLineNum].children[garoLineNum].textContent = 'X';
        dataset[seroLineNum][garoLineNum] = dicFlag.dfMine;
    }

    // console.log(dataset);
});


// // 재귀함수
// function recursiveFn(num) {
//     console.log(num);
//     if (num < 10) {  // 무한루프에서 벗어나려면 조건을 걸어줘야 함
//         recursiveFn(num + 1);
//     }
// }
// recursiveFn(1);
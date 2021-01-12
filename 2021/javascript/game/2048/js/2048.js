var table = document.getElementById('table');
var data = [];

function init() {
    var fragment = document.createDocumentFragment();
    [1,2,3,4].forEach(function(){
        var colData = [];
        data.push(colData);
        var tr = document.createElement('tr');
        [1,2,3,4].forEach(function(){
            colData.push(0);
            var td = document.createElement('td');
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    table.appendChild(fragment);
}

function rand() {
    // 빈칸배열
    var emptyArr = [];

    data.forEach(function(colData, i) {
        colData.forEach(function(rowData, j) {
            // 0 이면
            if(!rowData){
                emptyArr.push([i, j]);
            }
        });
    });
    console.log(emptyArr);
    var rndBox = emptyArr[Math.floor(Math.random() * emptyArr.length)];
    data[rndBox[0]][rndBox[1]] = 2;
    draw();
}

function draw() {
    data.forEach(function(colData, i) {
        colData.forEach(function(rowData, j) {
            if( rowData > 0 ){
                table.children[i].children[j].textContent = rowData;
            } else {
                table.children[i].children[j].textContent = '';
            }
        });
    });
}
init();
rand();
draw();

var dragStart = false;
var dragIng = false;
var startXY;
var endXY;
// 스와이프 ( web: drag , mobile: swipe )
window.addEventListener('mousedown', function(e){
    // console.log('mousedown', e);
    dragStart = true;
    startXY = [e.clientX, e.clientY ];
});
window.addEventListener('mousemove', function(e){
    if (dragStart){
        // console.log('mousemove', e);
        dragIng = true;
    }
});
window.addEventListener('mouseup', function(e){
    // console.log('mouseup', e);
    endXY = [e.clientX, e.clientY];
    
    if(dragIng) {
        var direct;
        var dirX = startXY[0] - endXY[0];
        var dirY = startXY[1] - endXY[1];
        
        if (dirX < 0 && Math.abs(dirX) / Math.abs(dirY) > 1) {
            direct = '오른쪽';
        } else if (dirX > 0 && Math.abs(dirX) / Math.abs(dirY) > 1) {
            direct = '왼쪽';
        } else if (dirY > 0 && Math.abs(dirX) / Math.abs(dirY) < 1) {
            direct = '위';
        } else if (dirY < 0 && Math.abs(dirX) / Math.abs(dirY) < 1) {
            direct = '아래';
        }
        // console.log(direct);
    }

    dragStart = false;
    dragIng = false;

    switch (direct) {
        case '왼쪽':
            
            break;
        case '오른쪽':
            
            break;
        case '위':
            
            break;
        case '아래':
            
            break;
    
        default:
            break;
    }
});

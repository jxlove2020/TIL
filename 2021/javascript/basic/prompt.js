function func_prompt() {
    // prompt('확인하시겠습니까?') === true
    var name = prompt('가나다를 쓰세요?')
    if(name === "가나다"){
        alert('안녕하세요 ' + name + ' 님');
    } else { 
        alert('가나다 님이 아닙니다. 안녕하세요 ' + name + ' 님');
    }
}
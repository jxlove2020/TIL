function func_confirm() {
    // 확인 버튼을 누르면 : confirm('확인하시겠습니까?') === true
    // 취소 버튼을 누르면 : confirm('확인하시겠습니까?') === false
    if(confirm('확인하시겠습니까?')){
        alert('ok');
    } else { 
        alert('cancel');
    }
}
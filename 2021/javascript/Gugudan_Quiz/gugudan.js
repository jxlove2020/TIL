var num1 = Math.ceil(Math.random() * 9);
var num2 = Math.ceil(Math.random() * 9);

var result = num1 * num2;

var word = document.createElement('div');
word.id = 'word';

word.textContent = String(num1) + ' X '  + String(num2) + ' = ?';
document.body.append(word);

var form = document.createElement('form');
document.body.append(form);

var input = document.createElement('input');
input.type = 'number';
form.append(input);

var button = document.createElement('button');
button.classList = 'myButton'
button.textContent = '입력!';
form.append(button);

var resultDiv = document.createElement('div');
resultDiv.id = 'resultDiv'
document.body.append(resultDiv);

form.addEventListener('submit', function fnResultDiv (e) {
    e.preventDefault();
    console.log(result, Number(input.value));
    if (result === Number(input.value)) {
        resultDiv.textContent = '딩동댕!!!';
        num1 = Math.ceil(Math.random() * 9);
        num2 = Math.ceil(Math.random() * 9);
        result = num1 * num2;
        word.textContent = String(num1) + ' X ' + String(num2) + ' = ?';
        input.value = ''
        input.focus();
    } else {
        resultDiv.textContent = '땡!!!';
        input.value = '';
        input.focus();
    }
});

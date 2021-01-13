import React, { Component } from 'react';
import Try from './Try';

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i+=1){
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    // const arr = []; arr.push(1); arr === arr;    // 참조가 되서 비교값 true
    // const arr1 = []; const arr2 = [...arr, 1]; arr1 === arr2; // 리액트가 알아차릴수 있게 참조가 바뀌어서 비교값 false

    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.value === this.state.answer.join ('')){
            this.setState({
                result: '홈런',
                // 이전 값 을 복사 후 push 하는 역할 // 참조가 바뀌어야 렌더함수가 새로 실행됨
                tries: [...this.state.tries, {try: this.state.value, result: '홈런' }],
            });
            alert('게임을 다시 시작합니다. ');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
        } else { // 답이 틀리면
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) { // 10번 이상 틀렸을 때
                this.setState({
                    result: `10번 넘게 틀려서 실패 답은 ${this.state.answer.join(',')} 였습니다.`,
                });
                alert('게임을 다시 시작합니다. ');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else {
                for (let i=0; i<4; i+= 1){
                    if ( answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState({
                    tries: [...this.state.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                    value: '',
                });
            }
        }
    };

    onChangeInput = (e) => {
        this.setState({ value: e.target.value })
    };
    
    onRefInput = (c) => {
        this.input = c;
    }

    render(){
        return (
            <>
                <div>{this.state.result}</div>
                <form onSubmit = {this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                    <button type="submit">입력</button>
                </form>
                <div>{this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, i) => {
                        return (
                            // 인덱스를 키로 쓰는것은 바람직하지 않지만 여기선 사용
                            <Try key={`${i + 1} 차 시도: `} tryInfo={v} />
                        );
                    })}
                </ul>
            </>
        )
    };
}

export default NumberBaseball;
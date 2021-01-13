const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };
    const onSubmitForm = (e) => {
        e.preventDefault();
        if(parseInt(value) === first * second) {
            setResult('정답 : ' + value);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            inputRef.current.focus();
        } else {
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    };

    return (
        <>
            <div>구구단 퀴즈</div>
            <div className="question">{first} * {second} = ?</div>
            <form onSubmit={onSubmitForm}>
                <input type="number" ref={inputRef} onChange={onChangeInput} value={value} />
                <button>입력</button>
            </form>
            <div>{result}</div>
        </>
    )
}

module.exports = GuGuDan;
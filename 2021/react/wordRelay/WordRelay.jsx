const React = require('react');
const { Component } = React; // react.Component 를 Component로 줄여줌

class WordRelay extends Component {
    state = {
        text: 'Hello, webpack',
    };
    render(){
        return <h1>{this.state.text}</h1>
    };
}

module.exports = WordRelay;
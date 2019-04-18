import React, { Component } from 'react'

import config from '../../config';
import TokenService from '../../services/token-service';

import './LearningRoute.css';

class LearningRoute extends Component {

  state = {
    guess: null,
    previousWord: null,
    nextWord: null,
    totalScore: null,
    wordCorrectCount: null,
    wordIncorrectCount: null,
  }

  componentDidMount() {

    // TODO Move me to a service

    fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
    .then((json) => {

      // TODO Maybe save in context ???

      this.setState({
        nextWord: json.nextWord,
        totalScore: json.totalScore,
        wordCorrectCount: json.wordCorrectCount,
        wordIncorrectCount: json.wordIncorrectCount,
      });
    })
  }

  handleFormSubmit = (ev) => {

    ev.preventDefault();

    const  { guessInput } = ev.target;

    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization':`bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({guess: guessInput.value})
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
    .then(json => {

      this.setState({
        previousWord: this.state.nextWord,
        guess: guessInput.value,
        correct: json.isCorrect,
        totalScore: json.totalScore,
        translation: json.translation,
        answer: json.answer,
        nextWord: json.nextWord,
      })

      guessInput.value = '';
    });
  }

  render() {

    let outcome;
    let button = <button className="Button" type="submit">Submit your answer</button>;
    let header = <h2>Translate the word:</h2>;

    if (this.state.correct === true) {
      header = (
        <h2>You were correct! :D</h2>
      )
      outcome = (
        <div className="DisplayFeedback">
          <p>The correct translation for {this.state.previousWord} was <strong>{this.state.answer}</strong> and you chose <strong>{this.state.guess}</strong>!</p>
        </div>
      )
      button = (
        <button className="Button" type="submit">Try another word!</button>
      )
    }

    if (this.state.correct === false) {
      header = (
        <h2>Good try, but not quite right :(</h2>
      )
      outcome = (
        <div className="DisplayFeedback">
          <p>The correct translation for {this.state.previousWord} was <strong>{this.state.answer}</strong> and you chose <strong>{this.state.guess}</strong>!</p>
        </div>
      );

      button = (
        <button className="Button" type="submit">Try another word!</button>
      )
    }

    return (
      <section id="LearningRoute">

        { header }

        { outcome }

        <span className="word">{this.state.nextWord}</span>

        <div className="CenterFormContainer">
          <form onSubmit={this.handleFormSubmit}>
            <label className="Label" htmlFor="learn-guess-input">What's the translation for this word?</label><br />
            <input className="Input" id="learn-guess-input" name="guessInput" type="text" defaultValue="" required/><br />
            {button}
          </form>
        </div>

        <div className="DisplayScore"><p>Your total score is: {this.state.totalScore}</p></div>
        <p>You have answered this word correctly {this.state.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>

      </section>
    );
  }
}

export default LearningRoute

import React, { Component } from 'react'

import config from '../../config';
import TokenService from '../../services/token-service';

import './LearningRoute.css';

class LearningRoute extends Component {

  state = {
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

  render() {
    return (
      <section id="LearningRoute">

        <h2>Translate the word:</h2>

        <span className="word">{this.state.nextWord}</span>

        <div className="CenterFormContainer">
          <form>
            <label className="Label" htmlFor="learn-guess-input">What's the translation for this word?</label><br />
            <input className="Input" id="learn-guess-input" name="learn-guess-input" type="text" required/><br />
            <button className="Button" type="submit">Submit your answer</button>
          </form>
        </div>

        <p>You have answered this word correctly {this.state.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>
        <p>Your total score is: {this.state.totalScore}</p>

      </section>
    );
  }
}

export default LearningRoute

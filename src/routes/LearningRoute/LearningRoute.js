import React, { Component } from 'react'

import config from '../../config';
import TokenService from '../../services/token-service';

class LearningRoute extends Component {

  state = {
    nextWord: null,
    totalScore: null,
    wordCorrectCount: null,
    wordIncorrectCount: null,
  }

  componentDidMount() {
    // Move me to a component

    // Move me to a service
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

      // Maybe save in context ???

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
        implement and style me

        <h2>Translate the word:</h2>

        <span>{this.state.nextWord}</span>

        <p>Your total score is: {this.state.totalScore}</p>

        <form>
          <label for="learn-guess-input">What's the translation for this word?</label>
          <input id="learn-guess-input" name="learn-guess-input" type="text" required/>
          <button type="submit">Submit your answer</button>
        </form>

        <p>You have answered this word correctly {this.state.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>
      </section>
    );
  }
}

export default LearningRoute

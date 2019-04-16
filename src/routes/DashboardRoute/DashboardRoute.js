import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import config from '../../config'
import TokenService from '../../services/token-service'


function WordScoreList (props) {

  const rows = props.data.map((w) => {
    return (
      <li key={w.id}>
      <h4>
        {w.original}
      </h4>
        correct answer count: {w.correct_count}
        incorrect answer count: {w.incorrect_count}
      </li>
    );
  });

  return (
    <ul>
      { rows }
    </ul>
  );
}


class DashboardRoute extends Component {

  constructor(props) {
    super(props);

    this.state = {
      language : {},
      words    : [],
      error    : null,
    };
  }

  componentDidMount() {

    fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
    .then((res) => {

      if (!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }

      return res.json();
    })
    .then((json) => {
      this.setState({
        language: json.language,
        words: json.words,
      });
    })
    .catch(res => {
      // TODO better error handling
      this.setState({ error: res.error })
    });
  }



  render() {
    return (
      <section id="DashboardRoute">

        <h2>{this.state.language.name}</h2>

        <p>Total correct answers: {this.state.language.total_score}</p>

        <h3>Words to practice</h3>
        <WordScoreList data={this.state.words} />

        <Link to="/learn">Start practicing</Link>
      </section>
    );
  }
}

export default DashboardRoute

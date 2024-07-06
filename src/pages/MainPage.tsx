import React, { Component } from 'react';
import axios from 'axios';

interface State {
  results: { name: string; description: string }[];
  hasError: boolean;
}

class MainPage extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      results: [],
      hasError: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const apiUrl = 'https://swapi.dev/api/planets/';
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({ results: response.data.results });
        console.log(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ hasError: true });
      });
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div>
        <p>Hello</p>
      </div>
    );
  }
}

export default MainPage;

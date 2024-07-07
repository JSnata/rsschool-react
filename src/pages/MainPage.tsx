import React, { Component } from 'react';
import axios from 'axios';
import ResultsList from '../components/ResultsList';
import { People } from '../types/types';
import Search from '../components/Search';

interface State {
  results: People[];
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
    this.fetchData('');
  }

  fetchData = (query: string) => {
    const url = query ? `https://swapi.dev/api/people/?search=${query}` : 'https://swapi.dev/api/people/';
    axios
      .get(url)
      .then((response) => {
        const results = response.data.results as People[];
        this.setState({ results });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ hasError: true });
      });
  };

  searchHandler = (query: string) => {
    this.fetchData(query);
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div>
        <Search searchHandler={this.searchHandler} />
        <ResultsList results={this.state.results} />
      </div>
    );
  }
}

export default MainPage;

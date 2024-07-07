import React, { Component } from 'react';
import axios from 'axios';
import ResultsList from '../components/ResultsList';
import { People } from '../types/types';
import Search from '../components/Search';
import styles from './MainPage.module.css';

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
    const searchQuery = localStorage.getItem('searchQuery') || '';
    this.fetchData(searchQuery);
  }

  fetchData = (query: string) => {
    const url = query
      ? `https://swapi.dev/api/people/?page=1&search=${query}`
      : 'https://swapi.dev/api/people/?page=1';
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
      return <h1 className={styles.error}>Something went wrong.</h1>;
    }
    return (
      <div className={styles.container}>
        <Search searchHandler={this.searchHandler} />
        <ResultsList results={this.state.results} />
      </div>
    );
  }
}

export default MainPage;

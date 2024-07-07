import React, { Component } from 'react';
import axios from 'axios';
import ResultsList from '../components/ResultsList';
import { People } from '../types/types';
import Search from '../components/Search';
import styles from './MainPage.module.css';
import ErrorButton from '../components/ErrorButton';

interface State {
  results: People[];
  loading: boolean;
  hasError: boolean;
}

class MainPage extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      results: [],
      loading: false, 
      hasError: false,
    };
  }

  componentDidMount() {
    const searchQuery = localStorage.getItem('searchQuery') || '';
    this.fetchData(searchQuery);
  }

  fetchData = (query: string) => {
    this.setState({ loading: true });

    const url = query
      ? `https://swapi.dev/api/people/?page=1&search=${query}`
      : 'https://swapi.dev/api/people/?page=1';
    axios
      .get(url)
      .then((response) => {
        const results = response.data.results as People[];
        this.setState({ results, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ hasError: true, loading: false });
      });
  };

  searchHandler = (query: string) => {
    this.fetchData(query);
  };

  render() {
    const { results, loading, hasError } = this.state;

    if (hasError) {
      return <h1 className={styles.error}>Something went wrong.</h1>;
    }
    return (
      <div className={styles.container}>
        <Search searchHandler={this.searchHandler} />
        {loading && <h2>Loading....</h2>}
        {!loading && !results.length && <p>No results found.</p>}
        {!loading && results.length && <ResultsList results={results} />}
        <ErrorButton />
      </div>
    );
  }
}

export default MainPage;

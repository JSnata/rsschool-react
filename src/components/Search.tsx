import React, { Component } from 'react';
import styles from './Search.module.css';

interface Props {
  searchHandler: (query: string) => void;
}

interface State {
  searchQuery: string;
}

class SearchComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const savedSearchQuery = localStorage.getItem('searchQuery') || '';
    this.state = { searchQuery: savedSearchQuery };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearch = () => {
    const trimmedQuery = this.state.searchQuery.trim();
    localStorage.setItem('searchQuery', trimmedQuery);
    this.props.searchHandler(trimmedQuery);
  };

  render() {
    return (
      <div className={styles.container}>
        <input
          type="text"
          value={this.state.searchQuery}
          onChange={this.handleInputChange}
          className={styles.searchInput}
        />
        <button onClick={this.handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchComponent;

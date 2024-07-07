import React, { Component } from 'react';
import styles from './ErrorButton.module.css';

interface State {
  hasError: boolean;
}

class ErrorButton extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      throw new Error('Error boundary wrapper works! Test error occured');
    }
  }

  throwError = () => {
    this.setState({ hasError: true });
  };

  render() {
    return (
      <button className={styles.errorButton} onClick={this.throwError}>
        New Error!
      </button>
    );
  }
}

export default ErrorButton;

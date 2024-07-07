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

  throwError = () => {
    try {
      throw new Error('Error boundary wrapper works! Test error occured');
    } catch (error) {
      console.error('Error thrown:', error);
      this.setState({ hasError: true });
    }
  };

  render() {
    if (this.state.hasError) {
      return <h1 className={styles.error}>Test error. Fallback content is here.</h1>;
    }

    return (
      <button className={styles.errorButton} onClick={this.throwError}>
        New Error!
      </button>
    );
  }
}

export default ErrorButton;

import React, { Component } from 'react';
import { People } from '../types/types';

interface Props {
  results: People[];
}

class ResultsList extends Component<Props> {
  render() {
    return (
      <div>
        {this.props.results.map((person, index) => (
          <div key={index}>
            <h3>{person.name}</h3>
            <p>Birth Year: {person.birth_year}</p>
            <p>Eye Color: {person.eye_color}</p>
            <p>Gender: {person.gender}</p>
            <p>Hair Color: {person.hair_color}</p>
            <p>Height: {person.height} cm</p>
            <p>Mass: {person.mass} kg</p>
            <p>Skin Color: {person.skin_color}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default ResultsList;

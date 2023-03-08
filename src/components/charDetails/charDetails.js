import React, { Component } from "react";
import gotService from "../services/gotService";

import "./charDetails.css";

const Field = ({ char, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{char[field]}</span>
    </li>
  );
};

export { Field };
export default class CharDetails extends Component {
  gotService = new gotService();

  state = {
    char: 41,
  };

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar() {
    const { charId } = this.props;
    if (!charId) {
      return;
    }
    this.gotService.getCharacter(charId).then((char) => {
      this.setState({ char });
    });
  }

  render() {
    if (!this.state.char) {
      return <span className="select-error">Please select a character!</span>;
    }
    const { char } = this.state;
    const { name } = char;

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.Children, (child) => {
            return React.cloneElement(child, { char });
          })}
        </ul>
      </div>
    );
  }
}

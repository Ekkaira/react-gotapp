import React, { Component } from "react";
import gotService from "../services/gotService";

import "./itemDetails.css";

const Field = ({ char, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{char[field]}</span>
    </li>
  );
};

export { Field };
export default class ItemDetails extends Component {
  gotService = new gotService();

  state = {
    item: 41,
  };

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
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
    if (!this.state.item) {
      return <span className="select-error">Please select a character!</span>;
    }
    const { item } = this.state;
    const { name } = item;

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.Children, (child) => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </div>
    );
  }
}

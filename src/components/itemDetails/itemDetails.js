import React, { Component } from "react";
import gotService from "../services/gotService";

import "./itemDetails.css";

const Field = ({ item, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Field };
export default class ItemDetails extends Component {
  gotService = new gotService();

  state = {
    item: null,
  };

  componentDidMount() {
    this.updateChar();
    this.updateHouse();
    this.updateBook();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateChar();
      this.updateHouse();
      this.updateBook();
    }
  }

  updateChar() {
    const { itemId } = this.props;
    if (!itemId) {
      return;
    }
    this.gotService.getCharacter(itemId).then((item) => {
      this.setState({ item });
    });
  }

  updateHouse() {
    const { itemId } = this.props;
    if (!itemId) {
      return;
    }
    this.gotService.getHouse(itemId).then((item) => {
      this.setState({ item });
    });
  }

  updateBook() {
    const { itemId } = this.props;
    if (!itemId) {
      return;
    }
    this.gotService.getBook(itemId).then((item) => {
      this.setState({ item });
    });
  }

  render() {
    if (!this.state.item) {
      return <span className="select-error">Please select item!</span>;
    }
    const { item } = this.state;
    const { name } = item;

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </div>
    );
  }
}

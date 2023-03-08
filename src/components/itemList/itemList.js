import React, { Component } from "react";
import Spinner from "../spinner";
import { v4 as uuidv4 } from "uuid";

import "./itemList.css";

const randomKey = uuidv4();

export default class ItemList extends Component {
  state = {
    itemList: null,
  };

  componentDidMount() {
    const { getData } = this.props;

    getData().then((itemList) => {
      this.setState({
        itemList,
      });
    });
  }

  renderItems(arr) {
    return arr.map((item, randomKey) => {
      const label = this.props.renderItem(item);

      return (
        <li
          key={randomKey}
          className="list-group-item"
          onClick={() => {
            this.props.onItemSelected(randomKey);
          }}
        >
          {label}
        </li>
      );
    });
  }

  render() {
    const { itemList } = this.state;

    if (!itemList) {
      return <Spinner />;
    }

    const items = this.renderItems(itemList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}

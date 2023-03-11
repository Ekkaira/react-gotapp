import React, { Component } from "react";
import gotService from "../services/gotService";
import ItemDetails, { Field } from "../itemDetails";

export default class BooksItem extends Component {
  gotService = new gotService();

  state = {
    selectedBook: 3,
  };

  render() {
    return (
      <ItemDetails itemId={this.state.selectedBook} getData={this.gotService.getBook}>
        <Field field="numberOfPages" label="Number of pages" />
        <Field field="publier" label="Publier" />
        <Field field="released" label="Released" />
      </ItemDetails>
    );
  }
}

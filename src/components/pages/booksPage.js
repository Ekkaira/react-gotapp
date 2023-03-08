import React, { Component } from "react";
import ItemList from "../itemList";
import CharDetails, { Field } from "../charDetails";
import ErrorMessage from "../errorMessage";
import gotService from "../services/gotService";
import RowBlock from "../rowBlock";

export default class BooksPage extends Component {
  gotService = new gotService();

  state = {
    selectedChar: 130,
    error: false,
  };

  onItemSelected = (id) => {
    this.setState({
      selectedChar: id,
    });
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllBooks}
        renderItem={({ name, numberOfPages }) => `${name} (${numberOfPages}) `}
      />
    );

    const bookDetails = (
      <CharDetails charId={this.state.selectedChar}>
        <Field field="numberOfPages" label="Number of pages" />
        <Field field="publier" label="Publier" />
        <Field field="released" label="Released" />
      </CharDetails>
    );
    return <RowBlock left={itemList} right={bookDetails} />;
  }
}

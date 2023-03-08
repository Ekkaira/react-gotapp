import React, { Component } from "react";
import ItemList from "../itemList";
import CharDetails, { Field } from "../charDetails";
import ErrorMessage from "../errorMessage";
import gotService from "../services/gotService";
import RowBlock from "../rowBlock";

export default class HousesPage extends Component {
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
        getData={this.gotService.getAllHouses}
        renderItem={({ name, region }) => `${name} (${region}) `}
      />
    );

    const houseDetails = (
      <CharDetails charId={this.state.selectedChar}>
        <Field field="region" label="Region" />
        <Field field="worlds" label="Worlds" />
        <Field field="titles" label="Titles" />
        <Field field="overlord" label="Overlord" />
      </CharDetails>
    );
    return <RowBlock left={itemList} right={houseDetails} />;
  }
}

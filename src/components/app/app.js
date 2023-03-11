import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import { CharacterPage, BooksPage, HousesPage, BooksItem } from "../pages";
import gotService from "../services/gotService";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./app.css";

export default class App extends Component {
  gotService = new gotService();
  state = {
    showRandomChar: true,
    error: false,
  };

  componentDidCatch() {
    console.log("ERROR");
    this.setState({
      error: true,
    });
  }

  toggleRandomChar = () => {
    this.setState((state) => {
      return {
        showRandomChar: !state.showRandomChar,
      };
    });
  };

  render() {
    const char = this.state.showRandomChar ? <RandomChar /> : null;

    if (this.state.error) {
      return <ErrorMessage />;
    }
    return (
      <Router>
        <div className="app">
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 5, offset: 0 }}>
                {char}
                <button type="button" className="btn btn-primary" onClick={this.toggleRandomChar}>
                  Toggle Random Character
                </button>
              </Col>
            </Row>
            <Routes>
              <Route path="/" element="" />
              <Route path="/characters" element={<CharacterPage />} />
              <Route path="/houses" element={<HousesPage />} />
              <Route path="/books" exact element={<BooksPage />} />
              <Route
                path="/books/:id"
                render={({ match, location, history }) => {
                  return <BooksItem />;
                }}
              />
            </Routes>
          </Container>
        </div>
      </Router>
    );
  }
}

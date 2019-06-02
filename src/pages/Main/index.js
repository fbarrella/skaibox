import React, { Component } from 'react';
import apiObj from "../../services/api";

import logo from "../../assets/skaibox.svg";
import './styles.css';

const api = apiObj.axios;

export default class Main extends Component {
  state = {
    boxName: ""
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    
    const response = await api.post("skaibox", {
      title: this.state.boxName
    });

    this.props.history.push(`box/${response.data._id}`);
  }

  handleKeypress = (event) => {
    this.setState({boxName: event.target.value});
  }

  render() {
    return (
        <div id="main-container">
          <form onSubmit={this.handleSubmit}>
            <img src={logo} alt="Skaibox" />

            <input
              onChange={this.handleKeypress}
              value={this.state.boxName}
              placeholder="Crie sua skaibox!"
            />
            <button type="submit">Criar</button>
          </form>
        </div>
    );
  }
}

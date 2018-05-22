import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

class App extends Component {
  state = {
    cards: []
  }

  componentDidMount() {
    axios.get('http://192.168.1.46:3030/api/cards').then(response => {
      const { data } = response

      console.log(data)

      this.setState({
        cards: data.cards
      })
    })
  }

  render() {
    return (
      <div className="App">
        <h1 id={"title"}>My Pokedex</h1>
        <div id="App-list">
          <ul>
            {
              this.state.cards.map(item => <li key={ item.id }>
                <div className={"items"}>
                  <img src={ item.imageUrl } />
                  <div className={"label"}>{ item.name }</div>
                </div>
              </li>)
            }
          </ul>
        </div>
        <div id="add-bar">
          <div id="add-button">

          </div>
        </div>
        <div id="modal">
          <div>
            <div id={"search"}>
              <input type={"text"} placeholder={"Find pokemon"}/>
            </div>
            <div id={"search-list"}>
              <ul>
                {
                  this.state.cards.map(item => <li key={ item.id }>
                    <div className={"items"}>
                      <img src={ item.imageUrl } />
                      <div className={"label"}>{ item.name }</div>
                    </div>
                  </li>)
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

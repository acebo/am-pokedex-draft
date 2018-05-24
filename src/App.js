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
          <ul className={"items"}>
            {
              this.state.cards.map(item => <li key={ item.id }>
                <div className={"item-container"}>
                  <img src={ item.imageUrl } />
                  <div className={"item-detail"}>
                    <div className={"item-name"}>{ item.name }</div>
                    <ul className={"item-skill"}>
                      <li>
                        <div className={"label"}>{ "HP" }</div>
                        <div className={"bar"}>
                          <div className={"bar-value"} style={{width: `50%`}} />
                        </div>
                      </li>
                      <li>
                        <div className={"label"}>{ "STR" }</div>
                        <div className={"bar"}>
                          <div className={"bar-value"} style={{width: `80%`}} />
                        </div>
                      </li>
                      <li>
                        <div className={"label"}>{ "WEAK" }</div>
                        <div className={"bar"}>
                          <div className={"bar-value"} style={{width: `30%`}} />
                        </div>
                      </li>
                    </ul>
                  </div>
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
              <ul className={"items"}>
                {
                  this.state.cards.map(item => <li key={ item.id }>
                    <div className={"item-container"}>
                      <img src={ item.imageUrl } />
                      <div className={"item-detail"}>
                        <div className={"item-name"}>{ item.name }</div>
                      </div>
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

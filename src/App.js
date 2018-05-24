import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Cute from './cute.png'

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
    axios.get('http://localhost:3030/api/cards').then(response => {
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
                  <img className={"item-image"} src={ item.imageUrl } />
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
                      <li>
                        <div className={"item-level-container"}>
                          <img src={Cute} />
                          <img src={Cute} />
                          <img src={Cute} />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={"item-remove"}>X</div>
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
                      <img className={"item-image"} src={ item.imageUrl } />
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
                          <li>
                            <div className={"item-level-container"}>
                              <img src={Cute} />
                              <img src={Cute} />
                              <img src={Cute} />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className={"item-add"}>Add</div>
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

import React, { Component } from 'react';
import _ from 'lodash'
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
    selected: [],
    cards: [],
    isOpen: false,
    filter: ''
  }

  componentDidMount() {
    axios.get('http://localhost:3030/api/cards').then(response => {
      const { data } = response

      this.setState({
        cards: data.cards.map(c => {
          const tmp = {
            hp: _.isNaN(Number(c.hp)) ? 0 : Number(c.hp) > 100 ? 100 : Number(c.hp),
            atk: _.size(_.get(c, 'attacks')) * 50,
            weak: _.size(_.get(c, 'weaknesses')) * 100,
          }
          //hp: max hp = 100, eg 110 = 100, 90 = 90, other = 0
          //atk: attacks length * 50, eg 0 = 0, 1 = 50, 2 = 100, >2 = 100, other = 0 
          //weak: weaknesses length * 100, eg 0 = 0, 1 = 100, other = 0
          //damage: sum of each attacks damage, eg: 50+ = 50, 20* = 20, 10 = 10, other = 0 
          //level: ((hp / 10) + (damage /10 ) + 10 - (weaknesses length)) / 5
          const damage = _.chain(c)
            .get('attacks')
            .map(a => {
              const dmg = _.get(a, 'damage', '00') || '00'
              return dmg.match(/(.*)(\d{2})/)[2]
            })
            .map(_.toNumber)
            .sum()
            .value()

          return {
            ...c,
            toShow: {
              ...tmp,
              level: ((tmp.hp / 10) + (damage / 10) + 10 - _.size(_.get(c, 'weaknesses'))) / 5
            }
          }
        })
      })
    })
  }

  handleModal = (isOpen) => {
    this.setState({ isOpen, filter: '' })
  }

  handleFilter = (e) => {
    this.setState({ filter: e.target.value })
  }

  handleAdd = card => {
    const selected = [...this.state.selected, card]
    this.setState({ selected, cards: this.state.cards.filter(c => c.id !== card.id) })
  }

  handleRemove = card => {
    const selected = this.state.selected.filter(c => c.id !== card.id)
    this.setState({ selected })
  }

  render() {
    return (
      <div className="App">
        <h1 id={"title"}>My Pokedex</h1>
        <div id="App-list">
          <ul className={"items"}>
            {
              this.state.selected.map((item, index) => <li key={index}>
                <div className={"item-container"}>
                  <img className={"item-image"} src={item.imageUrl} />
                  <div className={"item-detail"}>
                    <div className={"item-name"}>{item.name}</div>
                    <ul className={"item-skill"}>
                      <li>
                        <div className={"label"}>{"HP"}</div>
                        <div className={"bar"}>
                          <div className={"bar-value"} style={{ width: `${item.toShow.hp}%` }} />
                        </div>
                      </li>
                      <li>
                        <div className={"label"}>{"STR"}</div>
                        <div className={"bar"}>
                          <div className={"bar-value"} style={{ width: `${item.toShow.atk}%` }} />
                        </div>
                      </li>
                      <li>
                        <div className={"label"}>{"WEAK"}</div>
                        <div className={"bar"}>
                          <div className={"bar-value"} style={{ width: `${item.toShow.weak}%` }} />
                        </div>
                      </li>
                      <li>
                        <div className={"item-level-container"}>
                          {_.range(item.toShow.level).map(item => {
                            return <img src={Cute} />
                          })}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={"item-remove"} onClick={() => this.handleRemove(item)}>X</div>
              </li>)
            }
          </ul>
        </div>
        <div id="add-bar" onClick={() => this.handleModal(true)}>
          <div id="add-button">

          </div>
        </div>
        <div id="modal"
          style={{ visibility: this.state.isOpen ? 'visible' : 'hidden' }}
          onClick={e => e.target.id === 'modal' && this.setState({ isOpen: false })}
        >
          <div>
            <div id={"search"}>
              <input type={"text"} placeholder={"Find pokemon"} onChange={this.handleFilter} />
            </div>
            <div id={"search-list"}>
              <ul className={"items"}>
                {
                  this.state.cards.filter(item => item.name.toLowerCase().includes(this.state.filter.toLowerCase()))
                    .map(item => <li key={item.id}>
                      <div className={"item-container"}>
                        <img className={"item-image"} src={item.imageUrl} />
                        <div className={"item-detail"}>
                          <div className={"item-name"}>{item.name}</div>
                          <ul className={"item-skill"}>
                            <li>
                              <div className={"label"}>{"HP"}</div>
                              <div className={"bar"}>
                                <div className={"bar-value"} style={{ width: `${item.toShow.hp}%` }} />
                              </div>
                            </li>
                            <li>
                              <div className={"label"}>{"STR"}</div>
                              <div className={"bar"}>
                                <div className={"bar-value"} style={{ width: `${item.toShow.atk}%` }} />
                              </div>
                            </li>
                            <li>
                              <div className={"label"}>{"WEAK"}</div>
                              <div className={"bar"}>
                                <div className={"bar-value"} style={{ width: `${item.toShow.weak}%` }} />
                              </div>
                            </li>
                            <li>
                              <div className={"item-level-container"}>
                                {_.range(item.toShow.level).map(item => {
                                  return <img src={Cute} />
                                })}
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className={"item-add"} onClick={() => this.handleAdd(item)}>Add</div>
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

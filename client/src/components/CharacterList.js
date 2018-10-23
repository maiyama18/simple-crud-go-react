import React, { Component } from 'react'
import axios from 'axios'
import { requestCharacters, requestCharactersSuccess, requestCharactersFailed, updateCharacter } from '../modules/characters';

class CharacterList extends Component {
  async componentDidMount() {
    const { store } = this.props

    store.dispatch(requestCharacters())
    try {
      const res = await axios.get('/characters')
      store.dispatch(requestCharactersSuccess(res.data))
    } catch (err) {
      store.dispatch(requestCharactersFailed())
      console.error(err)
    }
  }

  async handleIncrement(id) {
    const { store } = this.props
    const { characters } = this.props.store.getState().character

    const character = characters.find(c => c.id === id)
    const { name, age } = character
    const res = await axios.put(`/characters/${id}`, {
      name,
      age: parseInt(age, 10) + 1,
    })
    store.dispatch(updateCharacter(res.data))
  }

  render() {
    const { store } = this.props
    const { characters } = store.getState().character

    return (
      <div>
        <ul>
          {characters.map(c => (
            <li key={c.id}>
              {c.name} ({c.age})
              <button onClick={() => this.handleIncrement(c.id)}>+</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CharacterList
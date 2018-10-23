import React, { Component } from 'react'
import axios from 'axios'
import { request, setCharacters, requestFinished, updateCharacter, deleteCharacter } from '../modules/characters';

class CharacterList extends Component {
  async componentDidMount() {
    const { store } = this.props

    store.dispatch(request())
    try {
      const res = await axios.get('/characters')
      store.dispatch(setCharacters(res.data))
    } catch (err) {
      console.error(err)
    }
    store.dispatch(requestFinished())
  }

  async handleIncrement(id) {
    const { store } = this.props
    const { characters } = this.props.store.getState().character

    const character = characters.find(c => c.id === id)
    const { name, age } = character

    store.dispatch(request())
    try {
      const res = await axios.put(`/characters/${id}`, {
        name,
        age: parseInt(age, 10) + 1,
      })
      store.dispatch(updateCharacter(res.data))
    } catch (err) {
      console.error(err)
    }
    store.dispatch(requestFinished())
  }

  async handleDelete(id) {
    const { store } = this.props

    store.dispatch(request())
    try {
      await axios.delete(`/characters/${id}`)
      store.dispatch(deleteCharacter(id))
    } catch (err) {
      console.error(err)
    }
    store.dispatch(requestFinished())
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
              <button onClick={() => this.handleDelete(c.id)}>d</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CharacterList
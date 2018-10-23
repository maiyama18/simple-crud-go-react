import React, { Component } from 'react'
import axios from 'axios'
import { requestCharacters, requestCharactersSuccess, requestCharactersFailed } from '../modules/characters';

class CharacterList extends Component {
  async componentDidMount() {
    const { store } = this.props

    console.log('didmount')
    store.dispatch(requestCharacters())
    try {
      const res = await axios.get('/characters')
      console.log('success')
      store.dispatch(requestCharactersSuccess(res.data))
    } catch (err) {
      store.dispatch(requestCharactersFailed())
      console.error(err)
    }
  }

  render() {
    const { store } = this.props
    const { characters } = store.getState().character

    return (
      <div>
        <ul>
          {characters.map(c => (
            <li key={c.id}>{c.name} ({c.age})</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CharacterList
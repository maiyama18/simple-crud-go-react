import React from 'react'
import axios from 'axios'
import { changeName, changeAge, initializeForm } from '../modules/form';
import { addCharacter } from '../modules/characters';

export default ({ store }) => {
  const { name, age } = store.getState().form

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('/characters', {
        name,
        age: parseInt(age, 10),
      })
      store.dispatch(addCharacter(res.data))
    } catch (err) {
      console.error(err)
    }
    store.dispatch(initializeForm())
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={e => store.dispatch(changeName(e.target.value))}
        />
        <br />
        <input
          type="text"
          placeholder="age"
          value={age}
          onChange={e => store.dispatch(changeAge(e.target.value))}
        />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}
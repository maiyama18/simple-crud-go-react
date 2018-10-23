import React from 'react'
import { changeName } from '../modules/form';

export default ({ store }) => {
  const { name, age } = store.getState().form

  return (
    <div>
      <form>
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
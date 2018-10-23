const initialState = {
  name: '',
  age: '',
}

const CHANGE_NAME = 'CHANGE_NAME'
const CHANGE_AGE = 'CHANGE_AGE'
const INITIALIZE_FORM = 'INITIALIZE_FORM'

export const changeName = name => ({
  type: CHANGE_NAME,
  name,
})

export const changeAge = age => ({
  type: CHANGE_AGE,
  age,
})

export const initializeForm = () => ({
  type: INITIALIZE_FORM,
})


export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name: action.name,
      }
    case CHANGE_AGE:
      return {
        ...state,
        age: action.age,
      }
    case INITIALIZE_FORM:
      return initialState
    default:
      return state
  }
}

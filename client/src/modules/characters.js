const initialState = {
  isFetching: false,
  characters: [],
}

const REQUEST = 'REQUEST'
const REQUEST_FINISHED = 'REQUEST_FINISHED'
const SET_CHARACTERS = 'SET_CHARACTERS'
const ADD_CHARACTER = 'ADD_CHARACTER'
const UPDATE_CHARACTER = 'UPDATE_CHARACTER'
const DELETE_CHARACTER = 'DELETE_CHARACTER'

export const request = () => ({
  type: REQUEST,
})

export const requestFinished = () => ({
  type: REQUEST_FINISHED,
})

export const setCharacters = characters => ({
  type: SET_CHARACTERS,
  characters,
})

export const addCharacter = character => ({
  type: ADD_CHARACTER,
  character,
})

export const updateCharacter = character => ({
  type: UPDATE_CHARACTER,
  character,
})

export const deleteCharacter = id => ({
  type: DELETE_CHARACTER,
  id,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case SET_CHARACTERS:
      return {
        ...state,
        isFetching: false,
        characters: action.characters,
      }
    case REQUEST_FINISHED:
      return {
        ...state,
        isFetching: false,
      }
    case ADD_CHARACTER:
      return {
        ...state,
        characters: [
          ...state.characters,
          action.character,
        ]
      }
    case UPDATE_CHARACTER:
      return {
        ...state,
        characters: state.characters.map(c => c.id === action.character.id ? action.character : c)
      }
    case DELETE_CHARACTER:
      return {
        ...state,
        characters: state.characters.filter(c => c.id !== action.id)
      }
    default:
      return state
  }
}
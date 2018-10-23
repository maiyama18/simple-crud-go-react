const initialState = {
  isFetching: false,
  characters: [],
}

const REQUEST_CHARACTERS = 'REQUEST_CHARACTERS'
const REQUEST_CHARACTERS_SUCCESS = 'REQUEST_CHARACTERS_SUCCESS'
const REQUEST_CHARACTERS_FAILED = 'REQUEST_CHARACTERS_FAILED'
const ADD_CHARACTER = 'ADD_CHARACTER'

export const requestCharacters = () => ({
  type: REQUEST_CHARACTERS,
})

export const requestCharactersSuccess = characters => ({
  type: REQUEST_CHARACTERS_SUCCESS,
  characters,
})

export const requestCharactersFailed = () => ({
  type: REQUEST_CHARACTERS_FAILED,
})

export const addCharacter = character => ({
  type: ADD_CHARACTER,
  character,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CHARACTERS:
      return {
        ...state,
        isFetching: true,
      }
    case REQUEST_CHARACTERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        characters: action.characters,
      }
    case REQUEST_CHARACTERS_FAILED:
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
    default:
      return state
  }
}
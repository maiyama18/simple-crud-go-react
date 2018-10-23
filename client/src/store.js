import { combineReducers, createStore } from 'redux'
import characterReducer from './modules/characters'
import formReducer from './modules/form'

const rootReducer = combineReducers({
  character: characterReducer,
  form: formReducer,
})

export default createStore(rootReducer)
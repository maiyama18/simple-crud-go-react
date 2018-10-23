import React, { Component } from 'react';
import AddForm from './components/AddForm'
import CharacterList from './components/CharacterList'

class App extends Component {
  render() {
    const { store } = this.props
    return (
      <div className="App">
        <AddForm store={store} />
        <CharacterList store={store} />
      </div>
    );
  }
}

export default App

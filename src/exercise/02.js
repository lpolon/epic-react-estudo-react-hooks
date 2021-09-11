// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // no primeiro render, vai pegar o valor do localStorage
  const [name, setName] = React.useState(
    // lazy state initialization
    () => {
      return window.localStorage.getItem('name') || initialName
    },
  )

  // vai disparar depois de cada render desse componente.
  // input -> handleChange -> render -> effect
  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  })

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App

// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  const [number, setNumber] = useLocalStorageState('number', 0)

  function handleChange(event) {
    setNumber(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={number} onChange={handleChange} id="name" />
      </form>
      {number ? <strong>Hello {number}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}
// retorna um valor e uma função para atualizar o valor.
function useLocalStorageState(
  key,
  defaultValue,
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [value, setValue] = React.useState(() => {
    const foundValue = window.localStorage.getItem(key)
    if (!foundValue) {
      // checagem a mais para ver se é função.
      return defaultValue
    }
    return deserialize(foundValue)
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, serialize(value))
  }, [key, value, serialize])

  return [value, setValue]
}

export default App

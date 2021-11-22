// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  const [number, setNumber] = useLocalStorageState('name', 'léo')

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

function useLocalStorageState(
  key,
  defaultValue,
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [value, setValue] = React.useState(() => {
    const foundValue = window.localStorage.getItem(key)
    if (foundValue) {
      return deserialize(foundValue)
    }
    /*
    Talvez o default value seja algo caro de se computar. Seria legal aceitar a opção do default value ser uma função.
    */
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  // talvez a chave onde um valor está sendo salvo mude. Não queremos manter as duas chaves!
  // podemos remover a chave antiga. Pra isso, precisamos saber qual é a chave antiga.

  /*
  pense no useRef assim: Um objeto persistido entre renders que você pode mutar sem causar re-renders.
  */
  const prevKeyRef = React.useRef()

  React.useEffect(() => {
    if (prevKeyRef.current !== key) {
      window.localStorage.removeItem(prevKeyRef.current)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(value))
  }, [key, value, serialize])

  return [value, setValue]
}

export default App

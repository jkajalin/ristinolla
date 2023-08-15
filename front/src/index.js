import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

/*
// eslint-disable-next-line no-undef
const foobar = process.env.REACT_APP_OTHER
// eslint-disable-next-line no-undef
const port = process.env.REACT_APP_PORT

console.log('port', port)
console.log('stuff: ', foobar)
*/

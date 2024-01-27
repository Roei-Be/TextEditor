import './style/App.css'

import { useState } from 'react'

import Input from './components/input';
import Output from './components/output';

function App() {
  const [value, setValue] = useState("")

  return (
    <>
      <div className="wrapper">
        <Input value={value} setValue={setValue}/>
        <Output value={value}/>
      </div>
    </>
  )
}

export default App

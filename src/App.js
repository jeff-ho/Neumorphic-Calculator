import './App.css';
import { useState } from 'react'

function App() {
  const [counter, setCounter] = useState(0)
  const [formValue, setFormValue] = useState("")
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValue)
  }

  return (
    <div className="App">
      <div className='counter'>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>Counter</button>
      <button onClick={() => setCounter(0)}>Reset</button>

      <form onSubmit={handleSubmit}>
        <label>Form Value</label>
        <input 
        type="text" 
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    
    </div>
  );
}

export default App;

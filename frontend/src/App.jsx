import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="container">
      <div className="header">
        <h1>Lyric.AI</h1>
      </div>
      <div className="formcontainer">
        <form className="formItself">
        <textarea
            name="query"
            placeholder="How many times does Adele say 'Hello' in Hello?"
            className=""
            rows="4"
          />
          <button
            type="submit"
            className="formsubmit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default App

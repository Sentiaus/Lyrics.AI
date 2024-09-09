import { useEffect, useState } from 'react'
import './App.css'

function App() {
  // Form state data
  const [formData, setFormData] = useState({
    query: ''
  });

  // Handle query
  const handleQuery = (e) => {
    e.preventDefault();
    console.log(formData.query)
  }
  return (
    <div className="container">
      <div className="header">
        <h1>Lyric.AI</h1>
      </div>
      <div className="formcontainer">
        <form className="formItself" onSubmit={handleQuery}>
        <textarea
            name="query"
            placeholder="How many times does Adele say 'Hello' in Hello?"
            className=""
            rows="4"
            value= {formData.query}
            onChange={(e)=>setFormData({...formData, query: e.target.value})}
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

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // Form Data
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-8">Lyrics.AI</h1>
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <form className="flex flex-col">
          <textarea
            name="query"
            placeholder="How many times does Adele say 'Hello' in Hello?"
            className="resize-none rounded-md border border-gray-300 p-4 h-32 focus:outline-none focus:border-blue-500"
            rows="4"
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default App

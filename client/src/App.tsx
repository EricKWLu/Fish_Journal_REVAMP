import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {
  const [count, setCount] = useState(0)
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <div>
      </div>
    </>
  )
}

export default App

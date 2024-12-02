import React, { useEffect, useState } from 'react'

function App() {

  const [array, setArray] = useState([]);

  const fetchApi = async () => {
    try {
      const response = await fetch('http://localhost:3000/api');
      const data = await response.json();
      setArray(data.players);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    fetchApi()
  }, []);

  return (
    <div>
      {array.map((item, index) => (
        <div key={index}>
          <p>{item}</p>
          <br></br>
        </div>
        )
    )}
      Hello World!
    </div>
  )

}

export default App

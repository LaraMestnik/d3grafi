import { useState, useEffect } from "react";
import Header from "./components/Header";

function App() {
  const [data, setData] = useState([]);

  async function handleFetchData() {
    const response = await fetch('https://bsi.si/_data/tecajnice/dtecbs-l.xml');
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');
  }


  return (<>
    <Header />
    <div>
      <button onClick={handleFetchData}>get data</button>
    </div>
  </>
  );
}

export default App;

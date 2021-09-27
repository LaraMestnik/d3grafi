import { useState, useEffect } from "react";
import Header from "./components/Header";
import Chart1 from "./components/Chart1";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleFetchData();
  }, []);

  async function handleFetchData() {

    try {
      const response = await fetch('https://bsi.si/_data/tecajnice/dtecbs-l.xml');
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'text/xml');

      const tecajnice = [...xmlDoc.getElementsByTagName('tecajnica')]
      const year2007 = tecajnice.filter(tecajnica => {
        const datum = tecajnica.getAttribute('datum');
        return datum.includes('2007');
      });

      const data = year2007.map(day => {
        {/*array z arreyi tečajev */ }
        const tecaji = [...day.childNodes];
        {/* array z arreyi tečajev samo za USD*/ }
        const USDfilter = tecaji.filter(tecaj => {
          const oznaka = tecaj.getAttribute('oznaka');
          return oznaka === 'USD';
        });

        let USDvrednost;
        USDfilter.forEach(vrednost => {
          USDvrednost = Number.parseFloat(vrednost.childNodes[0].nodeValue, 10);
        });

        const GBPfilter = tecaji.filter(tecaj => {
          const oznaka = tecaj.getAttribute('oznaka');
          return oznaka === 'GBP';
        });

        let GBPvrednost;
        GBPfilter.forEach(vrednost => {
          GBPvrednost = Number.parseFloat(vrednost.childNodes[0].nodeValue, 10);
        });
        const datum = day.getAttribute('datum');
        return { datum, USDvrednost, GBPvrednost };
      });
      if (data) {
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (<>
    <Header />
    <Chart1 data={data} />
  </>
  );
}

export default App;

import Header from "./components/Header";
import * as d3 from "d3";

function App() {

  async function handleFetchData() {
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
        USDvrednost = vrednost.childNodes[0].nodeValue;
      });

      const GBPfilter = tecaji.filter(tecaj => {
        const oznaka = tecaj.getAttribute('oznaka');
        return oznaka === 'GBP';
      });

      let GBPvrednost;
      GBPfilter.forEach(vrednost => {
        GBPvrednost = vrednost.childNodes[0].nodeValue;
      });
      const datum = day.getAttribute('datum');
      return { datum, USDvrednost, GBPvrednost };
    });

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

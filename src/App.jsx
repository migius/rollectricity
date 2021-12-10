import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import TiraDadiView from './views/TiraDadiView';
import RisorseView from './views/RisorseView';
import ListaBurocraziaView from './views/ListaBurocraziaView';
import MappaView from './views/MappaView'

import { Roll6D6 } from './logic/DadoLogic';
import { GeneraRisorse } from './logic/RisorseLogic';
import { InizializzaListaBurocrazia } from './logic/BurocraziaLogic';
import { InizializzaListaRegioni } from './logic/RegioneLogic';


function App() {
  const [dadi, setDadi] = useState([1,1,1,1,1,1]);
  const [risorse, setRisorse] = useState([]);
  const [listaBurocrazia, setListaBurocrazia] = useState([]);
  const [listaRegioni, setListaRegioni] = useState([]);
  
  //inizializzazioni più complesse, così evito chiamate ad ogni re-render
  useEffect(() => {    
    setRisorse(GeneraRisorse());  
    setListaBurocrazia(InizializzaListaBurocrazia()); 
    setListaRegioni(InizializzaListaRegioni()); 
  }, []);

  return (
    <div className="App">
      <button onClick={() => setDadi(Roll6D6())}>Tira i dadi</button>
      <TiraDadiView dadi={dadi} />
      <button onClick={() => setRisorse(GeneraRisorse(risorse,dadi))}>Assegna i dadi</button>
      <RisorseView risorse={risorse} />
      
      <ListaBurocraziaView listaBurocrazia={listaBurocrazia} />

      <MappaView listaRegioni={listaRegioni} />
    
    </div>
  );
}

const MyFunction= () => {
  alert("MyFunction");
  return 5;
}

export default App;
//https://codesandbox.io/s/react-fiddle-cl4qg?file=/src/Components/Game/Game.js
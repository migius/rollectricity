import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import React, { useState, useEffect } from 'react';
import DadiView from './views/DadiView';
import RisorseView from './views/RisorseView';
import BurocrazieView from './views/BurocrazieView';
import RegioniView from './views/RegioniView'
import AzioniView from './views/AzioniView';

import { Azione } from "./entities/Azione";
import { Partita, FasiPartita } from './entities/Partita';

import { Roll6D6 } from './logic/DadoLogic';
import { GeneraRisorse } from './logic/RisorseLogic';
import { InizializzaBurocrazie } from './logic/BurocraziaLogic';
import { InizializzaRegioni } from './logic/RegioneLogic';


/*eslint "react-hooks/exhaustive-deps": "off"*/ 

function App() {
  //STATE
  const [dadi, setDadi] = useState([]);
  const [risorse, setRisorse] = useState([]);
  const [burocrazie, setBurocrazie] = useState([]);
  const [regioni, setRegioni] = useState([]);
  const [azioni, setAzioni] = useState([]);
  const [partita, setPartita] = useState([]);
  

  //INITS
  //inizializzazioni più complesse, così evito chiamate ad ogni re-render
  useEffect(() => {
    NuovaPartita();
  },[]);

  //test modifica da replit
  
  //ACTIONS
  const NuovaPartita = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    console.log("NuovaPartita");
    setDadi([1,1,1,1,1,1]);
    setRisorse(GeneraRisorse());  
    setBurocrazie(InizializzaBurocrazie()); 
    setRegioni(InizializzaRegioni()); 
    setPartita(new Partita());
    setAzioni(
      [
        new Azione("btn-success", "Nuova partita", (dadi,risorse,burocrazie,regioni,azioni,partita) => NuovaPartita(dadi,risorse,burocrazie,regioni,azioni,partita), [FasiPartita.FINE_PARTITA]),
        new Azione("btn-success", "Inizia partita", (dadi,risorse,burocrazie,regioni,azioni,partita) => IniziaPartita(dadi,risorse,burocrazie,regioni,azioni,partita), [FasiPartita.INIZIO]),
        new Azione("btn-info", "Tira i dadi", (dadi,risorse,burocrazie,regioni,azioni,partita) => TiraDadi(dadi,risorse,burocrazie,regioni,azioni,partita), [FasiPartita.TIRA_DADI]),
        new Azione("btn-info", "Assegna i dadi", (dadi,risorse,burocrazie,regioni,azioni,partita) => AssegnaDadi(dadi,risorse,burocrazie,regioni,azioni,partita),[FasiPartita.ASSEGNA_DADI]),
        new Azione("btn-info", "Costruisci una centrale", (dadi,risorse,burocrazie,regioni,azioni,partita) => Costruisci(dadi,risorse,burocrazie,regioni,azioni,partita),[FasiPartita.SELEZIONA_AZIONE_CENTRALI]),
        new Azione("btn-info", "Migliora una centrale", (dadi,risorse,burocrazie,regioni,azioni,partita) => Migliora(dadi,risorse,burocrazie,regioni,azioni,partita),[FasiPartita.SELEZIONA_AZIONE_CENTRALI]),
        new Azione("btn-info", "Declassa una centrale", (dadi,risorse,burocrazie,regioni,azioni,partita) => Declassa(dadi,risorse,burocrazie,regioni,azioni,partita),[FasiPartita.SELEZIONA_AZIONE_CENTRALI]),
        new Azione("btn-info", "Dismetti una centrale", (dadi,risorse,burocrazie,regioni,azioni,partita) => Dismetti(dadi,risorse,burocrazie,regioni,azioni,partita),[FasiPartita.SELEZIONA_AZIONE_CENTRALI]),
        new Azione("btn-secondary", "Non fare nulla", (dadi,risorse,burocrazie,regioni,azioni,partita) => Passa(dadi,risorse,burocrazie,regioni,azioni,partita),[
          FasiPartita.SELEZIONA_AZIONE_CENTRALI,
          FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE,
          FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_MIGL,
          FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_MIGL,
          FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_DECLASS,
          FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_DECLASS,
          FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE]),
        new Azione("btn-info", "Produci energia", (dadi,risorse,burocrazie,regioni,azioni,partita) => Produci(dadi,risorse,burocrazie,regioni,azioni,partita),[FasiPartita.PRODUZIONE]),
        new Azione("btn-secondary", "Termina la produzione", (dadi,risorse,burocrazie,regioni,azioni,partita) => PassaProduzione(dadi,risorse,burocrazie,regioni,azioni,partita),[FasiPartita.SCELTA_PRODUZIONE]),
        new Azione("btn-info", "Termina il turno", (dadi,risorse,burocrazie,regioni,azioni,partita) => FineTurno(dadi,risorse,burocrazie,regioni,azioni,partita),[FasiPartita.FINE_TURNO]),
      ]);
  }

  const IniziaPartita = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    setPartita(partita.ProssimaFase(FasiPartita.TIRA_DADI));
  }
  const TiraDadi = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    setDadi(Roll6D6()); 
    setPartita(partita.ProssimaFase(FasiPartita.ASSEGNA_DADI));
  }
  const AssegnaDadi = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    setRisorse(GeneraRisorse(dadi,risorse));
    setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_AZIONE_CENTRALI));
  }
  const Costruisci = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE));
  }
  const Migliora = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_MIGL));
  }
  const Declassa = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_DECLASS));
  }
  const Dismetti = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE));
  }
  const Passa = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    setBurocrazie(burocrazie.segnaCosti(0));
    setPartita(partita.ProssimaFase(FasiPartita.PRODUZIONE));
  }
  const Produci = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    setPartita(partita.ProssimaFase(FasiPartita.SCELTA_PRODUZIONE));
  }
  const PassaProduzione = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    setBurocrazie(burocrazie.segnaEntrate(0));
    //le centrali che non hanno prodotto hanno un costo negativo
    regioni.filter((r) => r.IsCostruita && !r.IsSmantellata && !r.IsProduttiva).forEach(element => {
      setBurocrazie(burocrazie.segnaEntrate(-1*element.Entrate));
    });
    setPartita(partita.ProssimaFase(FasiPartita.FINE_TURNO));
  }
  const FineTurno = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    regioni.forEach(r => {
      r.IsProduttiva = false;
    });

    if(burocrazie.indiceAnnoCorrente() === burocrazie.length-1) {
      setPartita(partita.ProssimaFase(FasiPartita.FINE_PARTITA));
    } else {
      setBurocrazie(burocrazie.nuovoTurno());
      setPartita(partita.ProssimaFase(FasiPartita.TIRA_DADI));
    }
    
  }


  //HANDLE
  const handleAction = (azione) => {
    console.log("handleAction " + azione.Testo);
    azione.Effetto(dadi,risorse,burocrazie,regioni,azioni,partita,risorse);
  }

  const handleRegione = (regioneSelezionata, partita, burocrazie, regioni) => {
    console.log(regioneSelezionata);
    
    switch(partita.Fase) {
      case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE:
        if(regioneSelezionata.IsCostruita) {setPartita(partita.SegnalaAlert("Questa centrale è già stata costruita","alert-warning")); break;}
        if(burocrazie.burocraziaAnnoCorrente().ValoreIniziale < regioneSelezionata.Costo) {setPartita(partita.SegnalaAlert("Non hai soldi a sufficienza per comprare questa centrale","alert-warning")); break;}
        setBurocrazie(burocrazie.segnaCosti(regioneSelezionata.Costo));
        regioneSelezionata.IsCostruita = true;
        setPartita(partita.ProssimaFase(FasiPartita.PRODUZIONE));
        break;
      case FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_MIGL:
      case FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_DECLASS:
        if(!regioneSelezionata.IsCostruita) {setPartita(partita.SegnalaAlert("Questa centrale non è stata costruita","alert-warning")); break;}
        regioneSelezionata.IsDaSmantellare = true;
        
        if(partita.Fase === FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_MIGL) {
          setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_MIGL));
        }else if(partita.Fase === FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_DECLASS) {
          setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_DECLASS));
        } 
        break;
      case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_MIGL:
      case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_DECLASS:
        if(regioneSelezionata.IsCostruita) {setPartita(partita.SegnalaAlert("Questa centrale è già stata costruita","alert-warning")); break;}
        const daSmantellareList = regioni.filter((item) => item.IsDaSmantellare);
        if(daSmantellareList.length !== 1) {setPartita(partita.SegnalaAlert("Trovate più di una centrale da dismettere... qualcosa non va","alert-danger")); break;}
        const daSmantellare = daSmantellareList[0];
        if(!regioneSelezionata.IsLimitrofo(daSmantellare)) {setPartita(partita.SegnalaAlert("Questa centrale non è adiacente a quella da dismettere","alert-warning")); break;}
        
        let daPagare = 0;
        if(partita.Fase === FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_MIGL) {
          if(regioneSelezionata.Costo <= daSmantellare.Costo) {setPartita(partita.SegnalaAlert("La nuova centrale deve avere un costo maggiore","alert-warning")); break;}
          daPagare = regioneSelezionata.Costo - daSmantellare.Costo;
        } else if(partita.Fase === FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_DECLASS) {
          if(regioneSelezionata.Costo > daSmantellare.Costo) {setPartita(partita.SegnalaAlert("La nuova centrale deve avere un costo minore o uguale","alert-warning")); break;}
          daPagare = Math.floor(regioneSelezionata.Costo/2);
        }
        
        if(burocrazie.burocraziaAnnoCorrente().ValoreIniziale < daPagare) {setPartita(partita.SegnalaAlert("Non hai soldi a sufficienza per comprare questa centrale","alert-warning")); break;}
        
        setBurocrazie(burocrazie.segnaCosti(daPagare));
        regioneSelezionata.IsCostruita = true;
        daSmantellare.IsDaSmantellare = false;
        daSmantellare.IsSmantellata = true;
        setPartita(partita.ProssimaFase(FasiPartita.PRODUZIONE));
        
        break;
      case FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE:
        if(!regioneSelezionata.IsCostruita) {setPartita(partita.SegnalaAlert("Questa centrale non è stata costruita","alert-warning")); break;}
        if(burocrazie.burocraziaAnnoCorrente().ValoreIniziale < Math.floor(regioneSelezionata.Costo/2)) {setPartita(partita.SegnalaAlert("Non hai soldi a sufficienza per smantellare questa centrale","alert-warning")); break;}
        setBurocrazie(burocrazie.segnaCosti(Math.floor(regioneSelezionata.Costo/2)));
        regioneSelezionata.IsSmantellata = true;
        setPartita(partita.ProssimaFase(FasiPartita.PRODUZIONE));
        break;
      case FasiPartita.SCELTA_PRODUZIONE:
        if(!regioneSelezionata.IsCostruita) {setPartita(partita.SegnalaAlert("Questa centrale non è stata costruita","alert-warning")); break;}
        if(regioneSelezionata.IsSmantellata) {setPartita(partita.SegnalaAlert("Questa centrale è stata smantellata","alert-warning")); break;}
        if(regioneSelezionata.IsProduttiva) {setPartita(partita.SegnalaAlert("Questa centrale è già stata usata","alert-warning")); break;}
        if(!risorse.risorseSufficienti(regioneSelezionata)) {setPartita(partita.SegnalaAlert("Non ci sono abbastanza risorse","alert-warning")); break;}
        
        setBurocrazie(burocrazie.segnaEntrate(regioneSelezionata.Entrate));
        risorse.consumaRisorse(regioneSelezionata);
        regioneSelezionata.IsProduttiva = true;
        setPartita(partita.ProssimaFase(FasiPartita.SCELTA_PRODUZIONE));
        break;
      default:
        console.log("nothing to do in this phase");
    }
  }


  return (
    <div className="App row">
      <div className="col-12 col-xl">
        <AzioniView messaggio={partita.Messaggio} azioni={azioni} partita={partita} handleAction={handleAction} />
        <div className={"alert re-box " + (partita.Alert === undefined ? "d-none" : partita.Alert.Classe) } role="alert">
          {partita.Alert === undefined ? "" : partita.Alert.Testo}
        </div>
        <DadiView dadi={dadi} />
        <RisorseView risorse={risorse} />
      </div>
      <div className="col-12 col-xl col-map">
        <RegioniView regioni={regioni} handleRegione={handleRegione} partita={partita} burocrazie={burocrazie} />
      </div>
      <div className="col-12 col-xl">
        <BurocrazieView burocrazie={burocrazie} /> 
        <div className="re-box h2">
          Punteggio: {burocrazie.punteggioAttuale()}
        </div>
      </div>
    
    </div>
  );
}

export default App;
//https://codesandbox.io/s/react-fiddle-cl4qg?file=/src/Components/Game/Game.js







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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


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
    let p = new Partita();
    let cp = get("cp");
    if(cp !== undefined) {
      handleChangeCodice(cp, partita);
    }
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
        new Azione("btn-secondary", "Non fare nulla", (dadi,risorse,burocrazie,regioni,azioni,partita) => Passa(dadi,risorse,burocrazie,regioni,azioni,partita),[FasiPartita.SELEZIONA_AZIONE_CENTRALI]),
        new Azione("btn-info", "Produci energia", (dadi,risorse,burocrazie,regioni,azioni,partita) => Produci(dadi,risorse,burocrazie,regioni,azioni,partita),[FasiPartita.PRODUZIONE]),
        new Azione("btn-info", "Produci in tutte le centrali", (dadi,risorse,burocrazie,regioni,azioni,partita) => ProduciTutto(dadi,risorse,burocrazie,regioni,azioni,partita),[FasiPartita.SCELTA_PRODUZIONE]),
        new Azione("btn-secondary", "Termina la produzione", (dadi,risorse,burocrazie,regioni,azioni,partita) => PassaProduzione(dadi,risorse,burocrazie,regioni,azioni,partita),[FasiPartita.SCELTA_PRODUZIONE]),
        new Azione("btn-info", "Termina il turno", (dadi,risorse,burocrazie,regioni,azioni,partita) => FineTurno(dadi,risorse,burocrazie,regioni,azioni,partita),[FasiPartita.FINE_TURNO]),
        new Azione("btn btn-dark", "Annulla", (dadi,risorse,burocrazie,regioni,azioni,partita) => Annulla(dadi,risorse,burocrazie,regioni,azioni,partita),
          [FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE, 
            FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_MIGL, 
            FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_DECLASS, 
            FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE,
            FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_DECLASS,
            FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_MIGL/*,
            FasiPartita.PRODUZIONE, FasiPartita.SCELTA_PRODUZIONE, FasiPartita.FINE_TURNO*/]),
      ]);
  }

  const IniziaPartita = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    //console.log(partita);
    setPartita(partita.ProssimaFase(FasiPartita.TIRA_DADI));
  }
  const TiraDadi = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    if(partita.PartitaCasuale) {
      setDadi(Roll6D6()); 
    }
    else {
      setDadi(partita.TiraDadi());
    }
    partita.CodicePartitaCorrente += dadi.ToCodicePartita();
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
  const ProduciTutto = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    if(!risorse.risorseSufficientiTutteCentrali(regioni)){setPartita(partita.SegnalaAlert("Non hai risorese a sufficienza per avviare tutte le centrali, seleziona manualmente quelle da avviare e poi termina la produzione","alert-warning")); return;}
    regioni.filter((r) => r.IsCostruita && !r.IsSmantellata && !r.IsProduttiva).forEach(element => {
      handleRegione(element, dadi, risorse, burocrazie, regioni, azioni, partita);
    });
    PassaProduzione(dadi,risorse,burocrazie,regioni,azioni,partita);
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
  const Annulla = (dadi,risorse,burocrazie,regioni,azioni,partita) => {
    switch(partita.Fase) {
      case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE:
      case FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE:
      case FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_MIGL: 
      case FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_DECLASS: 
        setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_AZIONE_CENTRALI));
        break;
      case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_DECLASS:
      case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_MIGL:
        regioni.forEach(r => {
          r.IsDaSmantellare = false;
        });
        setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_AZIONE_CENTRALI));
        break;
      case FasiPartita.PRODUZIONE:
      case FasiPartita.SCELTA_PRODUZIONE: 
      case FasiPartita.FINE_TURNO:
      default:
        setPartita(partita.SegnalaAlert("Purtroppo non posso annullare questa mossa","alert-warning")); 
        break;
    }
  }


  //HANDLE
  const closeAlert = (partita) => {
    setPartita(partita.ProssimaFase(partita.Fase));
  }

  const handleAction = (azione) => {
    console.log("handleAction " + azione.Testo);
    azione.Effetto(dadi,risorse,burocrazie,regioni,azioni,partita,risorse);
  }

  const handleChangeCodice = (newValue, partita) => {
    let newP = new Partita(partita);
    newP.CodicePartita = newValue;
    if(newValue.IsAValidCodicePartita()){ 
      newP.PartitaCasuale = false;
      newP = newP.SegnalaAlert("Il codice partita inserito è valido, giocherai la partita legata a al codice inserito.","alert-success")
      
    } else {
      newP.PartitaCasuale = true;
      if(newValue !== "") {
        newP = newP.SegnalaAlert("Il codice partita inserito non è valido, cliccando Iniza partita si avvierà una partita casuale","alert-warning")
      }
    }
    setPartita(newP);
  }

  const handleRegione = (regioneSelezionata, dadi, risorse, burocrazie, regioni, azioni, partita) => {
    console.log(regioneSelezionata);
    
    switch(partita.Fase) {
      case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE:
        if(regioneSelezionata.IsCostruita) {setPartita(partita.SegnalaAlert("Questa centrale è già stata costruita","alert-warning")); break;}
        if(burocrazie.burocraziaAnnoCorrente().ValoreIniziale < regioneSelezionata.Costo) {setPartita(partita.SegnalaAlert("Non hai soldi a sufficienza per costruire questa centrale","alert-warning")); break;}
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
        
        if(burocrazie.burocraziaAnnoCorrente().ValoreIniziale < daPagare) {setPartita(partita.SegnalaAlert("Non hai soldi a sufficienza per costruire questa centrale","alert-warning")); break;}
        
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
        setPartita(partita.SegnalaAlert("Adesso non serve la mappa, leggi le istruzioni","alert-warning")); 
        break;
    }
  }


  return (
    <div className="App row">
      <div className={"alert sticky-top re-box d-xl-none " + (partita.Alert === undefined ? "d-none" : partita.Alert.Classe) } role="alert">
        {partita.Alert === undefined ? "" : partita.Alert.Testo}

        <div className="close-button" onClick={() => closeAlert(partita)}  ><FontAwesomeIcon icon={faTimesCircle} /></div>
        
      </div>
      <div className="col-12 col-xl">
        <AzioniView messaggio={partita.Messaggio} azioni={azioni} partita={partita} handleAction={handleAction} handleChangeCodice={handleChangeCodice} />
        <div className={"alert re-box d-none " + (partita.Alert === undefined ? "d-none" : " d-xl-block " + partita.Alert.Classe) } role="alert">
          {partita.Alert === undefined ? "" : partita.Alert.Testo}
        </div>
        <DadiView dadi={dadi} />
        <RisorseView risorse={risorse} />
      </div>
      <div className="col-12 col-xl col-map">
        <RegioniView dadi={dadi} risorse={risorse} regioni={regioni} azioni={azioni} handleRegione={handleRegione} partita={partita} burocrazie={burocrazie} />
      </div>
      <div className="col-12 col-xl">
        <BurocrazieView burocrazie={burocrazie} /> 
        <div className="re-box">
          <div className="h2 pb-1">
            Punteggio: {burocrazie.punteggioAttuale()}
          </div>
          <div className={" " + (partita.Fase === FasiPartita.FINE_PARTITA ? " " : "d-none")}>
            Hai raggiunto il punteggio di {burocrazie.punteggioAttuale()} con la partita <a href={"/?cp=" + partita.CodicePartitaCorrente} rel="noreferrer" > {partita.CodicePartitaCorrente}</a>, passa questo codice (click destro copia link) ai tuoi amici per sfidarli alla stessa partita!
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


function get(name){
    var r = /[?&]([^=#]+)=([^&#]*)/g,p={},match;
    // eslint-disable-next-line 
    while(match = r.exec(window.location)) p[match[1]] = match[2];
    return p[name];
}



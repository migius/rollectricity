import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

import React, { useState, useEffect, Suspense } from 'react';

import DadiView from './views/DadiView';
import RisorseView from './views/RisorseView';
import BurocrazieView from './views/BurocrazieView';
import RegioniView from './views/RegioniView'
import AzioniView from './views/AzioniView';
import FooterView from './views/FooterView';
import ShareView from './views/ShareView';
import ClassificaView from './views/ClassificaView';

import { Azione } from "./entities/Azione";
import { Partita, FasiPartita } from './entities/Partita';

import { Roll6D6 } from './logic/DadoLogic';
import { GeneraRisorse } from './logic/RisorseLogic';
import { InizializzaBurocrazie } from './logic/BurocraziaLogic';
import { InizializzaRegioni } from './logic/RegioneLogic';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';



/*eslint "react-hooks/exhaustive-deps": "off"*/

function Game() {
  //STATE
  const [dadi, setDadi] = useState([]);
  const [risorse, setRisorse] = useState([]);
  const [burocrazie, setBurocrazie] = useState([]);
  const [regioni, setRegioni] = useState([]);
  const [azioni, setAzioni] = useState([]);
  const [partita, setPartita] = useState([]);

  //LOCALIZATION
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  //INITS
  //inizializzazioni più complesse, così evito chiamate ad ogni re-render
  useEffect(() => {
    NuovaPartita(t);
    changeLanguage("it");
  }, []);

  //test modifica da replit

  //ACTIONS
  const NuovaPartita = (t, dadi, risorse, burocrazie, regioni, azioni, partita) => {
    console.log("NuovaPartita");
    setDadi([1, 1, 1, 1, 1, 1]);
    setRisorse(GeneraRisorse());
    setBurocrazie(InizializzaBurocrazie());
    setRegioni(InizializzaRegioni());
    setPartita(new Partita());
    let cp = get("cp");
    if (cp !== undefined) {
      handleChangeCodice(cp, partita);
    }
    setAzioni(
      [
        new Azione("success", "action.nuova-partita", (t, dadi, risorse, burocrazie, regioni, azioni, partita) => NuovaPartita(t, dadi, risorse, burocrazie, regioni, azioni, partita), [FasiPartita.FINE_PARTITA]),
        new Azione("success", "action.inizia-gioco", (t, dadi, risorse, burocrazie, regioni, azioni, partita) => IniziaPartita(t, dadi, risorse, burocrazie, regioni, azioni, partita), [FasiPartita.INIZIO]),
        new Azione("info", "action.tira-dadi", (t, dadi, risorse, burocrazie, regioni, azioni, partita) => TiraDadi(t, dadi, risorse, burocrazie, regioni, azioni, partita), [FasiPartita.TIRA_DADI]),
        new Azione("info", "action.assegna-dadi", (t, dadi, risorse, burocrazie, regioni, azioni, partita) => AssegnaDadi(t, dadi, risorse, burocrazie, regioni, azioni, partita), [FasiPartita.ASSEGNA_DADI]),
        new Azione("info", "action.costruisci", (t, dadi, risorse, burocrazie, regioni, azioni, partita) => Costruisci(t, dadi, risorse, burocrazie, regioni, azioni, partita), [FasiPartita.SELEZIONA_AZIONE_CENTRALI]),
        new Azione("info", "action.migliora", (t, dadi, risorse, burocrazie, regioni, azioni, partita) => Migliora(t, dadi, risorse, burocrazie, regioni, azioni, partita), [FasiPartita.SELEZIONA_AZIONE_CENTRALI]),
        new Azione("info", "action.declassa", (t, dadi, risorse, burocrazie, regioni, azioni, partita) => Declassa(t, dadi, risorse, burocrazie, regioni, azioni, partita), [FasiPartita.SELEZIONA_AZIONE_CENTRALI]),
        new Azione("info", "action.dismetti", (t, dadi, risorse, burocrazie, regioni, azioni, partita) => Dismetti(t, dadi, risorse, burocrazie, regioni, azioni, partita), [FasiPartita.SELEZIONA_AZIONE_CENTRALI]),
        new Azione("secondary", "action.non-fare-nulla", (t, dadi, risorse, burocrazie, regioni, azioni, partita) => Passa(t, dadi, risorse, burocrazie, regioni, azioni, partita), [FasiPartita.SELEZIONA_AZIONE_CENTRALI]),
        new Azione("info", "action.produci", (t, dadi, risorse, burocrazie, regioni, azioni, partita) => Produci(t, dadi, risorse, burocrazie, regioni, azioni, partita), [FasiPartita.PRODUZIONE]),
        new Azione("info", "action.produci-ovunque", (t, dadi, risorse, burocrazie, regioni, azioni, partita) => ProduciTutto(t, dadi, risorse, burocrazie, regioni, azioni, partita), [FasiPartita.SCELTA_PRODUZIONE]),
        new Azione("secondary", "action.termina-prod", (t, dadi, risorse, burocrazie, regioni, azioni, partita) => PassaProduzione(t, dadi, risorse, burocrazie, regioni, azioni, partita), [FasiPartita.SCELTA_PRODUZIONE]),
        new Azione("info", "action.termina-turno", (t, dadi, risorse, burocrazie, regioni, azioni, partita) => FineTurno(t, dadi, risorse, burocrazie, regioni, azioni, partita), [FasiPartita.FINE_TURNO]),
        new Azione("dark", "action.undo", (t, dadi, risorse, burocrazie, regioni, azioni, partita) => Annulla(t, dadi, risorse, burocrazie, regioni, azioni, partita),
          [FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE,
          FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_MIGL,
          FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_DECLASS,
          FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE,
          FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_DECLASS,
          FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_MIGL/*,
            FasiPartita.PRODUZIONE, FasiPartita.SCELTA_PRODUZIONE, FasiPartita.FINE_TURNO*/]),
      ]);
  }
  const IniziaPartita = (t, dadi, risorse, burocrazie, regioni, azioni, partita) => {
    //console.log(partita);

    setPartita(partita.ProssimaFase(FasiPartita.TIRA_DADI));
    if (partita.ModalitaRapida) { TiraDadi(t, dadi, risorse, burocrazie, regioni, azioni, partita); }
  }
  const TiraDadi = (t, dadi, risorse, burocrazie, regioni, azioni, partita) => {
    let dadiTmp;
    if (partita.PartitaCasuale) {
      dadiTmp = Roll6D6();
    }
    else {
      dadiTmp = partita.TiraDadi();
    }
    partita.CodicePartitaCorrente += dadiTmp.ToCodicePartita();
    setDadi(dadiTmp);
    setPartita(partita.ProssimaFase(FasiPartita.ASSEGNA_DADI));

    if (partita.ModalitaRapida) { AssegnaDadi(t, dadiTmp, risorse, burocrazie, regioni, azioni, partita); }
  }
  const AssegnaDadi = (t, dadi, risorse, burocrazie, regioni, azioni, partita) => {
    setRisorse(GeneraRisorse(dadi, risorse));
    setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_AZIONE_CENTRALI));
  }
  const Costruisci = (t, dadi, risorse, burocrazie, regioni, azioni, partita) => {
    setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE));
  }
  const Migliora = (t, dadi, risorse, burocrazie, regioni, azioni, partita) => {
    setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_MIGL));
  }
  const Declassa = (t, dadi, risorse, burocrazie, regioni, azioni, partita) => {
    setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_DECLASS));
  }
  const Dismetti = (t, dadi, risorse, burocrazie, regioni, azioni, partita) => {
    setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE));
  }
  const Passa = (t, dadi, risorse, burocrazie, regioni, azioni, partita) => {
    setBurocrazie(burocrazie.segnaCosti(0));
    setPartita(partita.ProssimaFase(FasiPartita.PRODUZIONE));
  }
  const Produci = (t, dadi, risorse, burocrazie, regioni, azioni, partita) => {
    setPartita(partita.ProssimaFase(FasiPartita.SCELTA_PRODUZIONE));
  }
  const ProduciTutto = (t, dadi, risorse, burocrazie, regioni, azioni, partita) => {
    if (!risorse.risorseSufficientiTutteCentrali(regioni)) { setPartita(partita.SegnalaAlert("alert.risorse-insufficienti-tutto", "alert-warning")); return; }
    regioni.filter((r) => r.IsCostruita && !r.IsSmantellata && !r.IsProduttiva).forEach(element => {
      handleRegione(element, dadi, risorse, burocrazie, regioni, azioni, partita, t);
    });
    PassaProduzione(t, dadi, risorse, burocrazie, regioni, azioni, partita);
  }
  const PassaProduzione = (t, dadi, risorse, burocrazie, regioni, azioni, partita) => {
    setBurocrazie(burocrazie.segnaEntrate(0));
    //le centrali che non hanno prodotto hanno un costo negativo
    regioni.filter((r) => r.IsCostruita && !r.IsSmantellata && !r.IsProduttiva).forEach(element => {
      setBurocrazie(burocrazie.segnaEntrate(-1 * element.Entrate));
    });
    setPartita(partita.ProssimaFase(FasiPartita.FINE_TURNO));
  }
  const FineTurno = (t, dadi, risorse, burocrazie, regioni, azioni, partita) => {
    regioni.forEach(r => {
      r.IsProduttiva = false;
    });

    if (burocrazie.indiceAnnoCorrente() === burocrazie.length - 1) {
      setPartita(partita.ProssimaFase(FasiPartita.FINE_PARTITA));
    } else {
      setBurocrazie(burocrazie.nuovoTurno());
      setPartita(partita.ProssimaFase(FasiPartita.TIRA_DADI));
      if (partita.ModalitaRapida) { TiraDadi(t, dadi, risorse, burocrazie, regioni, azioni, partita); }
    }
  }
  const Annulla = (t, dadi, risorse, burocrazie, regioni, azioni, partita) => {
    switch (partita.Fase) {
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
        setPartita(partita.SegnalaAlert("alert.undo-non-permesso", "alert-danger"));
        break;
    }
  }


  //HANDLE
  const closeAlert = (partita) => {
    setPartita(partita.ProssimaFase(partita.Fase));
  }

  const handleAction = (azione) => {
    console.log("handleAction " + azione.Testo);
    azione.Effetto(t, dadi, risorse, burocrazie, regioni, azioni, partita);
  }

  const handleChangeCodice = (newValue, partita) => {
    let newP = new Partita(partita);
    newP.CodicePartita = newValue;
    if (newValue.IsAValidCodicePartita()) {
      newP.PartitaCasuale = false;
      newP = newP.SegnalaAlert("alert.codice-partita-ok", "alert-success")

    } else {
      newP.PartitaCasuale = true;
      if (newValue !== "") {
        newP = newP.SegnalaAlert("alert.codice-partita-ko", "alert-warning")
      }
    }
    setPartita(newP);
  }

  const handleRegione = (regioneSelezionata, dadi, risorse, burocrazie, regioni, azioni, partita, t) => {
    console.log(regioneSelezionata);

    switch (partita.Fase) {
      case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE:
        if (regioneSelezionata.IsCostruita) { setPartita(partita.SegnalaAlert("alert.gia-costruita", "alert-warning")); break; }
        if (burocrazie.burocraziaAnnoCorrente().ValoreIniziale < regioneSelezionata.Costo) { setPartita(partita.SegnalaAlert("alert.soldi-insufficienti", "alert-warning")); break; }
        setBurocrazie(burocrazie.segnaCosti(regioneSelezionata.Costo));
        regioneSelezionata.IsCostruita = true;
        setPartita(partita.ProssimaFase(FasiPartita.PRODUZIONE));
        break;
      case FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_MIGL:
      case FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_DECLASS:
        if (!regioneSelezionata.IsCostruita) { setPartita(partita.SegnalaAlert("alert.non-costruita", "alert-warning")); break; }
        regioneSelezionata.IsDaSmantellare = true;

        if (partita.Fase === FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_MIGL) {
          setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_MIGL));
        } else if (partita.Fase === FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_DECLASS) {
          setPartita(partita.ProssimaFase(FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_DECLASS));
        }
        break;
      case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_MIGL:
      case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_DECLASS:
        if (regioneSelezionata.IsCostruita) { setPartita(partita.SegnalaAlert("alert.gia-costruita", "alert-warning")); break; }
        const daSmantellareList = regioni.filter((item) => item.IsDaSmantellare);
        if (daSmantellareList.length !== 1) { setPartita(partita.SegnalaAlert("alert.piu-dismissioni", "alert-danger")); break; }
        const daSmantellare = daSmantellareList[0];
        if (!regioneSelezionata.IsLimitrofo(daSmantellare)) { setPartita(partita.SegnalaAlert("alert.non-adiacente", "alert-warning")); break; }

        let daPagare = 0;
        if (partita.Fase === FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_MIGL) {
          if (regioneSelezionata.Costo <= daSmantellare.Costo) { setPartita(partita.SegnalaAlert("alert.costo-maggiore", "alert-warning")); break; }
          daPagare = regioneSelezionata.Costo - daSmantellare.Costo;
        } else if (partita.Fase === FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_DECLASS) {
          if (regioneSelezionata.Costo > daSmantellare.Costo) { setPartita(partita.SegnalaAlert("alert.costo-minore", "alert-warning")); break; }
          daPagare = Math.floor(regioneSelezionata.Costo / 2);
        }

        if (burocrazie.burocraziaAnnoCorrente().ValoreIniziale < daPagare) { setPartita(partita.SegnalaAlert("alert.soldi-insufficienti", "alert-warning")); break; }

        setBurocrazie(burocrazie.segnaCosti(daPagare));
        regioneSelezionata.IsCostruita = true;
        daSmantellare.IsDaSmantellare = false;
        daSmantellare.IsSmantellata = true;
        setPartita(partita.ProssimaFase(FasiPartita.PRODUZIONE));

        break;
      case FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE:
        if (!regioneSelezionata.IsCostruita) { setPartita(partita.SegnalaAlert("alert.non-costruita", "alert-warning")); break; }
        if (burocrazie.burocraziaAnnoCorrente().ValoreIniziale < Math.floor(regioneSelezionata.Costo / 2)) { setPartita(partita.SegnalaAlert("alert.soldi-insufficienti-sm", "alert-warning")); break; }
        setBurocrazie(burocrazie.segnaCosti(Math.floor(regioneSelezionata.Costo / 2)));
        regioneSelezionata.IsSmantellata = true;
        setPartita(partita.ProssimaFase(FasiPartita.PRODUZIONE));
        break;
      case FasiPartita.SCELTA_PRODUZIONE:
        if (!regioneSelezionata.IsCostruita) { setPartita(partita.SegnalaAlert("alert.non-costruita", "alert-warning")); break; }
        if (regioneSelezionata.IsSmantellata) { setPartita(partita.SegnalaAlert("alert.smantellata", "alert-warning")); break; }
        if (regioneSelezionata.IsProduttiva) { setPartita(partita.SegnalaAlert("alert.gia-usata", "alert-warning")); break; }
        if (!risorse.risorseSufficienti(regioneSelezionata)) { setPartita(partita.SegnalaAlert("alert.risorse-insufficienti", "alert-warning")); break; }

        setBurocrazie(burocrazie.segnaEntrate(regioneSelezionata.Entrate));
        risorse.consumaRisorse(regioneSelezionata);
        regioneSelezionata.IsProduttiva = true;
        setPartita(partita.ProssimaFase(FasiPartita.SCELTA_PRODUZIONE));
        break;
      default:
        setPartita(partita.SegnalaAlert("alert.no-mappa", "alert-warning"));
        break;
    }
  }

  const setModalitaRapida = (flag) => {
    let newP = new Partita(partita);
    newP.ModalitaRapida = flag;
    setPartita(newP);
  }

  //GESTIONE MODALS
  const [modalState, setModalState] = useState(false);
  const handleClose = () => setModalState(false);
  const handleModalShow = (modal) => setModalState(modal);

  return (
    <div className="App row">
      <div className="header row">
        <div className="col-12 h1">ROLLECTRICITY</div>
        <div className="col-12">{t("intro")}</div>
      </div>
      <div className={"alert sticky-top re-box d-xl-none " + (partita.Alert === undefined ? "d-none" : partita.Alert.Classe)} role="alert">
        {partita.Alert === undefined ? "" : t(partita.Alert.Testo)}

        <div className="close-button" onClick={() => closeAlert(partita)}  ><FontAwesomeIcon icon={faTimesCircle} /></div>

      </div>
      <div className="col-12 col-xl">
        <AzioniView messaggio={partita.Messaggio} azioni={azioni} partita={partita} handleAction={handleAction} handleChangeCodice={handleChangeCodice} t={t} />
        <div className={"alert re-box d-none " + (partita.Alert === undefined ? "d-none" : " d-xl-block " + partita.Alert.Classe)} role="alert">
          {partita.Alert === undefined ? "" : t(partita.Alert.Testo)}
        </div>
        <DadiView dadi={dadi} />
        <RisorseView risorse={risorse} t={t} />
      </div>
      <div className="col-12 col-xl col-map">
        <RegioniView dadi={dadi} risorse={risorse} regioni={regioni} azioni={azioni} handleRegione={handleRegione} partita={partita} burocrazie={burocrazie} />
      </div>
      <div className="col-12 col-xl">
        <BurocrazieView burocrazie={burocrazie} />
        <div className="re-box punteggio-box fixed-bottom position-xl-static">
          <div className="h2 pb-1">
            {t('text.points')} {burocrazie.punteggioAttuale()}
          </div>
          <div 
          className={" " + (partita.Fase === FasiPartita.FINE_PARTITA ? " " : "d-none")} 
          dangerouslySetInnerHTML={
                          {__html: t('text.end-game-phrase', {punteggio: burocrazie.punteggioAttuale(), linkPartita: "/?cp=" + partita.CodicePartitaCorrente, codicePartita: partita.CodicePartitaCorrente})}
                      } />
          <ShareView className={"  d-none TEMPORANEO " + (partita.Fase === FasiPartita.FINE_PARTITA ? " " : "d-none")} t={t} title="share.title" message="share.message" />
        </div>
        <div className="social-box re-box">
          <ShareView t={t} title="share.title" message="share.message" />
        </div>
      </div>
      <hr />
      <FooterView t={t} modalState={modalState} handleClose={handleClose} handleModalShow={handleModalShow} changeLanguage={changeLanguage} language={i18n.language} setModalitaRapida={setModalitaRapida} partita={partita} />

      <ClassificaView />
    </div>
  );
}

const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Game />
    </Suspense>
  );
}

function get(name) {
  var r = /[?&]([^=#]+)=([^&#]*)/g, p = {}, match;
  // eslint-disable-next-line 
  while (match = r.exec(window.location)) p[match[1]] = match[2];
  return p[name];
}



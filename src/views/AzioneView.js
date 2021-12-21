import React from 'react';
import Button from 'react-bootstrap/Button';


function AzioneView(props) {

    return (<Button variant={props.azione.Classe} className={"col " +(props.azione.FasiInCuiVisibile.includes(props.partita.Fase) ? "" : "d-none")} onClick={() => props.handleAction(props.azione)} >{props.t(props.azione.Testo)}</Button>)

/*
    return (<button 
      className={"col btn " + props.azione.Classe + " " + (props.azione.FasiInCuiVisibile.includes(props.partita.Fase) ? "" : "d-none")} 
      onClick={() => props.handleAction(props.azione)}>{props.azione.Testo}</button>);
*/
  }
  
export default AzioneView;
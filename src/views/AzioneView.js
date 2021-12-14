import React from 'react';


function AzioneView(props) {

    return (<button 
      className={"col btn " + props.azione.Classe + " " + (props.azione.FasiInCuiVisibile.includes(props.partita.Fase) ? "" : "d-none")} 
      onClick={() => props.handleAction(props.azione)}>{props.azione.Testo}</button>);
  }
  
export default AzioneView;
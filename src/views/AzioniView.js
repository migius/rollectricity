import React from 'react';
import AzioneView from './AzioneView';

import './AzioniView.css';

function AzioniView(props) {

    return (<div className="row">
                <div className="col-12">
                    <div className="re-box azioni">
                        <div className=" col-12">{props.messaggio}</div>
                        <input type="text" className="col-12" placeholder="Codice partita" onChange={(e) => props.handleChangeCodice(e.target.value, props.partita)} value={props.partita.CodicePartita} />
                        {props.azioni.map((object, i) => <AzioneView key={i} azione={object} partita={props.partita} handleAction={props.handleAction} />)}
                    </div>
                </div>
            </div>);
  }
  
export default AzioniView;
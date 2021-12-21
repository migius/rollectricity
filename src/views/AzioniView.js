import React from 'react';
import AzioneView from './AzioneView';

import { FasiPartita } from '.././entities/Partita';
import './AzioniView.css';

function AzioniView(props) {

    return (<div className="row">
                <div className="col-12">
                    <div className="re-box azioni">
                        <div className=" col-12">{props.t(props.messaggio)}</div>
                        <input type="text" className={"col-12 " + (props.partita.Fase === FasiPartita.INIZIO ? " " : "d-none") } placeholder={props.t("text.game-code")} onChange={(e) => props.handleChangeCodice(e.target.value, props.partita)} value={props.partita.CodicePartita} />
                        {props.azioni.map((object, i) => <AzioneView key={i} azione={object} partita={props.partita} handleAction={props.handleAction} t={props.t} />)}
                    </div>
                </div>
            </div>);
  }
  
export default AzioniView;
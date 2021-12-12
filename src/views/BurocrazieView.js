import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faWallet, faIndustry, faPiggyBank, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';

import './BurocrazieView.css';

function BurocrazieView(props) {
  
    return (<div className="re-box re-box-burocrazie"> 
                <div className="row row-cols-5 testata-burocrazie">
                  <div className="col"><FontAwesomeIcon icon={faCalendar} /></div>
                  <div className="col"><FontAwesomeIcon icon={faWallet} /></div>
                  <div className="col"><FontAwesomeIcon icon={faIndustry} /></div>
                  <div className="col"><FontAwesomeIcon icon={faPiggyBank} /></div>
                  <div className="col"><FontAwesomeIcon icon={faHandHoldingUsd} /></div>
                </div>
                {props.burocrazie.map((obj, i) => 
                <div key={i} className="row row-cols-5">
                  <div className="col">{obj.Anno}</div>
                  <div className="col">{obj.ValoreIniziale}</div>
                  <div className="col">{obj.Costi}</div>
                  <div className="col">{obj.ValoreIniziale !== undefined && obj.Costi !== undefined ? obj.ValoreIniziale - obj.Costi : ''}</div>
                  <div className="col">{obj.Guadagni}</div>
                </div>)}
            </div>);
  }
  
export default BurocrazieView;


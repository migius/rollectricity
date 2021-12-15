import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faWallet, faIndustry, /*faPiggyBank,*/ faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';

import './BurocrazieView.css';

function BurocrazieView(props) {
  
    return (<div className="re-box re-box-burocrazie px-3"> 
                <div className="row row-cols-4 testata-burocrazie">
                  <div className="col anno"><FontAwesomeIcon icon={faCalendar} /></div>
                  <div className="col iniz"><FontAwesomeIcon icon={faWallet} /></div>
                  <div className="col cost"><FontAwesomeIcon icon={faIndustry} /></div>
                  {/* <div className="col"><FontAwesomeIcon icon={faPiggyBank} /></div> */}
                  <div className="col entr"><FontAwesomeIcon icon={faHandHoldingUsd} /></div>
                </div>
                {props.burocrazie.map((obj, i) => 
                <div key={i} className="row row-cols-4">
                  <div className="col anno">{obj.Anno}</div>
                  <div className="col iniz">{obj.ValoreIniziale}</div>
                  <div className="col cost">{obj.Costi !== undefined ? "- " + obj.Costi : ""}</div>
                  {/* <div className="col">{obj.ValoreIniziale !== undefined && obj.Costi !== undefined ? obj.ValoreIniziale - obj.Costi : ''}</div> */}
                  <div className="col entr">{obj.Guadagni !== undefined ? (obj.Guadagni > 0 ? "+ " + obj.Guadagni : "- "  + obj.Guadagni*-1) : ""}</div>
                </div>)}
            </div>);
  }
  
export default BurocrazieView;


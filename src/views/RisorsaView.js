
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCertificate, faFire, faOilCan, faRadiationAlt, faTrashAlt, faTint } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import TiraDadiView from './TiraDadiView';

function RisorsaView(props) {
  
    return (<div>
            <h2>{props.risorsa.Nome}, disponibili: {props.risorsa.Disponibili}, estratte: {props.risorsa.Estratte}, usate: {props.risorsa.Usate}</h2>
            {props.risorsa.Dadi.map((object, i) => <div key={i}>{object}</div>)}
        </div>);
  }
  
export default RisorsaView;


export function IconaFromId(id){
  switch(id){
    case 0:
      return <FontAwesomeIcon icon={faCertificate} />;
    case 1:
      return <FontAwesomeIcon icon={faOilCan} />;
    case 2:
      return <FontAwesomeIcon icon={faFire} />;
    case 3:
      return <FontAwesomeIcon icon={faTrashAlt} />;
    case 4:
      return <FontAwesomeIcon icon={faRadiationAlt} />;
    case 5:
      return <FontAwesomeIcon icon={faTint} />;
  }
}
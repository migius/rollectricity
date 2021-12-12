import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';

import './RisorsaView.css';

function RisorsaView(props) {

  return (<div className="risorsa">

            <div className="r-name">{props.risorsa.Nome} {props.risorsa.Icona} </div>
            <div className="r-stats">
              {Array(props.risorsa.Usate).fill().map((object, i) => <FontAwesomeIcon key={"u_" + i} icon={faCheckCircle} />)}
              {Array(props.risorsa.Estratte-props.risorsa.Usate).fill().map((object, i) => <FontAwesomeIcon key={"e_" + i} icon={faCircle} />)}
              {Array(props.risorsa.Disponibili-props.risorsa.Estratte).fill().map((object, i) => <FontAwesomeIcon key={"d_" + i} icon={faCircleRegular} />)}
            </div>
            {/* {props.risorsa.Dadi.map((object, i) => <div key={i}><DadoView valore={object} /></div>) */}
            
          </div>);
  }
  
export default RisorsaView;

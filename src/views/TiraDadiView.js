import React from 'react';
import DadoView from './DadoView';

function TiraDadiView(props) {

    return (<div>
                {props.dadi.map((object, i) => <div key={i}><DadoView valore={object} /></div>)}
            </div>);
  }
  
export default TiraDadiView;
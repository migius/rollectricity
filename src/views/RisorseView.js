import React from 'react';
import RisorsaView from './RisorsaView';

function RisorseView(props) {

    return (<div>
                {props.risorse.map((object, i) => <div key={i}><RisorsaView risorsa={object} /></div>)}
            </div>);
  }
  
export default RisorseView;
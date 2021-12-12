import React from 'react';
import RisorsaView from './RisorsaView';

function RisorseView(props) {

    return (<div className="row">
              <div className="col-12">
                <div className="re-box">
                  {props.risorse.map((object, i) => <RisorsaView key={i} risorsa={object} />)}
                </div>
              </div>
            </div>);
  }
  
export default RisorseView;
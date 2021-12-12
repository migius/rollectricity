import React from 'react';
import DadoView from './DadoView';

import './DadiView.css';

function DadiView(props) {

    return (<div className="row">
              <div className=" col-12">
                <div className="dadi re-box">
                  {props.dadi.map((object, i) => <div key={i}><DadoView valore={object} /></div>)}
                </div>
              </div>
            </div>);
  }
  
export default DadiView;
import React from 'react';
import './MappaView.css';
import { IconaFromId } from './RisorsaView';



function MappaView(props) {
  
    return (<div className="map">
            {props.listaRegioni.map((object, i) => 
            <div key={object.X + "_" + object.Y} className="hex" style={object.Style}>
                <div className="costo">{object.Costo} M$</div>
                <div className="consumi">{object.Consumi.map((object, i) => IconaFromId(object) )}</div>
                <div className="entrate">{object.Entrate} M$</div>
            </div>)}
        </div>);
  }
  
export default MappaView;
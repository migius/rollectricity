import React from 'react';
import './RegioniView.css';
import { IconaFromId } from '../entities/Risorsa';


function RegioniView(props) {
  
    return (<div className="re-box re-box-map">
                <div className="map">
                    {props.regioni.map((object, i) => 
                    <div key={object.X + "_" + object.Y} 
                        className={"hex " + (object.IsCostruita ? "costruita " : "") + (object.IsSmantellata ? "smantellata " : "") + (object.IsProduttiva ? "produttiva " : "")} 
                        style={object.Style} onClick={() => props.handleRegione(object, props.partita, props.burocrazie, props.regioni)}>
                        <div className="costo">{object.Costo} M$</div>
                        <div className="consumi">{object.Consumi.map((object, i) => <div key={i}>{IconaFromId(object)}</div> )}</div>
                        <div className="entrate">{object.Entrate} M$</div>
                    </div>)}
                </div>
            </div>);
  }
  
export default RegioniView;
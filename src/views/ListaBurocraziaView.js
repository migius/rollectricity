import React from 'react';

function ListaBurocraziaView(props) {
  
    return (<div> 
                <div> | M$ | Costi | Risparmi | Guadagni</div>
                {props.listaBurocrazia.map((obj, i) => <div key={i}>{obj.Anno} | {obj.ValoreIniziale} - {obj.Costi} = {obj.ValoreIniziale != undefined && obj.Costi !== undefined ? obj.ValoreIniziale - obj.Costi : ''} + {obj.Guadagni}</div>)}
            </div>);
  }
  
export default ListaBurocraziaView;


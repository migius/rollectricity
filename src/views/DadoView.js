import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceFive, faDiceFour, faDiceOne, faDiceSix, faDiceThree, faDiceTwo } from '@fortawesome/free-solid-svg-icons';

import './DadoView.css';

function DadoView(props) {
  
  let dado;
  switch(props.valore){
    case 1:
      dado = <FontAwesomeIcon icon={faDiceOne} />;
      break;
    case 2:
      dado = <FontAwesomeIcon icon={faDiceTwo} />;
      break;
    case 3:
      dado = <FontAwesomeIcon icon={faDiceThree} />;
      break;
    case 4:
      dado = <FontAwesomeIcon icon={faDiceFour} />;
      break;
    case 5:
      dado = <FontAwesomeIcon icon={faDiceFive} />;
      break;
    case 6:
      dado = <FontAwesomeIcon icon={faDiceSix} />;
      break;
    default:
      dado = "??";
      break;
  }


  return <div className="dado">{dado}</div>;
}
  
export default DadoView;
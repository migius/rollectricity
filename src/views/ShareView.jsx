import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";

function ShareView(props) {
  return (
    <div className={"row  " + props.className}>
      <EmailShareButton className="col" url="https://rollectricity.netlify.com/" subject={props.t(props.title)} body={props.t(props.message)} ><FontAwesomeIcon icon={faEnvelope} /></EmailShareButton>
      <FacebookShareButton className="col" url="https://rollectricity.netlify.com/" quote={props.t(props.title)} hashtag="rollectricity"><FontAwesomeIcon icon={['fab', 'facebook']} /></FacebookShareButton>
      <TelegramShareButton className="col" url="https://rollectricity.netlify.com/" title={props.t(props.title)} ><FontAwesomeIcon icon={['fab', 'telegram']} /></TelegramShareButton>
      <TwitterShareButton className="col" url="https://rollectricity.netlify.com/" title={props.t(props.title)} hashtag={["rollectricity"]} related={["brunimichele"]} ><FontAwesomeIcon icon={['fab', 'twitter']} via="brunimichele" /></TwitterShareButton>
      <WhatsappShareButton className="col" url="https://rollectricity.netlify.com/" title={props.t(props.title)} ><FontAwesomeIcon icon={['fab', 'whatsapp']} /></WhatsappShareButton>
    </div>
  );
}

export default ShareView;

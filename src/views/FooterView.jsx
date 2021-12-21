import React from 'react';
import './FooterView.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faCopyright, faFlag, faFastForward } from '@fortawesome/free-solid-svg-icons';

function FooterView(props) {
  
    return (<div className="footer row re-box p-2">
              <p className="col" onClick={() => props.handleModalShow("modal-options")} ><FontAwesomeIcon icon={faCog} />  {props.t("text.options")}</p>
                  <Modal show={props.modalState === "modal-options"} onHide={props.handleClose} fullscreen="xxl-down" size="lg">
                    <Modal.Header closeButton>
                      <Modal.Title><FontAwesomeIcon icon={faCog} /> {props.t("text.options")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                          <Form.Label column sm="2">
                            <FontAwesomeIcon icon={faFlag} /> {props.t("options.language")}
                          </Form.Label>
                          <Col sm="10">
                            <ButtonGroup>
                              {["it","en"].map((lang, idx) => (
                                <ToggleButton
                                  key={`radio-lang-${idx}`}
                                  id={`radio-lang-${idx}`}
                                  type="radio"
                                  variant={'outline-success'}
                                  name="radio-lang"
                                  value={lang}
                                  checked={props.language === lang}
                                  onChange={(e) => props.changeLanguage(e.currentTarget.value)}
                                >
                                  {lang}
                                </ToggleButton>
                              ))}
                            </ButtonGroup>
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                          <Form.Label column sm="2">
                            <FontAwesomeIcon icon={faFastForward} /> {props.t("options.fast-mode")}
                          </Form.Label>
                          <Col sm="10">
                            <ButtonGroup>
                              {["on","off"].map((status, idx) => (
                                <ToggleButton
                                  key={`radio-fast-${idx}`}
                                  id={`radio-fast-${idx}`}
                                  type="radio"
                                  variant={'outline-success'}
                                  name="radio-fast"
                                  value={props.partita.ModalitaRapida}
                                  checked={status === "on"}
                                  onChange={(e) => props.changeLanguage(e.currentTarget.value)}
                                >
                                  {status}
                                </ToggleButton>
                              ))}
                            </ButtonGroup>
                          </Col>
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                      {props.t("text.close")}
                    </Button>
                  </Modal.Footer>
                </Modal>
              <p className="col" onClick={() => props.handleModalShow("modal-credits")} ><FontAwesomeIcon icon={faCopyright} /> {props.t("text.credits")}</p>
                  <Modal show={props.modalState === "modal-credits"} onHide={props.handleClose} fullscreen="xxl-down" size="lg">
                    <Modal.Header closeButton>
                      <Modal.Title><FontAwesomeIcon icon={faCopyright} /> {props.t("text.credits")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p dangerouslySetInnerHTML={
                          {__html: props.t('credits.game-info', {interpolation: {escapeValue: false}})}
                      } />                      
                      <p dangerouslySetInnerHTML={
                          {__html: props.t('credits.game-develop', {interpolation: {escapeValue: false}})}
                      } />             
                      <p dangerouslySetInnerHTML={
                          {__html: props.t('credits.send-feedback', {interpolation: {escapeValue: false}})}
                      } />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                      {props.t("text.close")}
                    </Button>
                  </Modal.Footer>
                </Modal>
                <a className="col float-right" href="https://migio.altervista.org/lt/" target="_blank" rel="noreferrer" variant="outline-dark">migio</a>
              </div>);
  }
  
export default FooterView;
import React from 'react';
import Backdrop from '../Backdrop/backdrop';
import classes from './Modal.scss';

const Modal = (props) => {
  return (
    <Backdrop clicked={props.clicked} active={props.active}>
      <div id="Modal" className={[classes.Modal, props.active ? classes.activeModal: null, props.customModal, props.active ? props.customModalActive: null].join(' ')}>
        {props.children}
      </div>
    </Backdrop>
  );
}

export default Modal;

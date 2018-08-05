import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.scss';
import ConfirmIcon from '../../../assets/images/confirmed-icon.png';
import CancelIcon from '../../../assets/images/cancelled-icon.png';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    let modalContent = '';

    if(this.props.show === 'confirm') {
      modalContent = (
        <Auxiliary>
          <div>
            <img className={styles['modal-icon']} src={ConfirmIcon} alt="confirm" />
          </div>
          <div className={styles.label}>purchase confirmed</div>
          <div className={styles.info}>we will send updates of your purchase to your e-mail</div>
        </Auxiliary>
      )
    }

    if(this.props.show === 'cancel') {
      modalContent = (
        <Auxiliary>
          <div>
            <img className={styles['modal-icon']} src={CancelIcon} alt="cancel" />
          </div>
          <div className={styles.label}>purchase cancelled</div>
          <div className={[styles.info, styles.cancel].join(' ')}>too bad, maybe another product?</div>
        </Auxiliary>
      )
    }

    return (
      <Auxiliary>
        <Backdrop show={this.props.show} clicked={this.props.modalClose} />
        <div
          className={styles.modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {modalContent}
        </div>
      </Auxiliary>
    )
  }
}

export default Modal;

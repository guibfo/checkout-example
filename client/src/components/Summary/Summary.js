import React from 'react';
import NumberFormat from 'react-number-format';

import styles from './Summary.scss';

const Summary = (props) => {

  return (
    <div className={styles['component-wrapper']}>
      <div className={styles.label}>summary</div>
      <div className={styles['text-wrapper']}>
        <div>base price</div>
        <div>
          <NumberFormat
            value={props.price}
            displayType={'text'}
            thousandSeparator={'.'}
            prefix={'R$ '}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator={','} />
        </div>
      </div>
      <div className={styles['text-wrapper']}>
        <div>cupom</div>
        <div className={[styles.value, styles.minus].join(' ')}>
          <NumberFormat
            value={props.discount || 0}
            displayType={'text'}
            thousandSeparator={'.'}
            prefix={'R$ '}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator={','} />
        </div>
      </div>
      <div className={styles['text-wrapper']}>
        <div>shipping</div>
        <div>
          <NumberFormat
            value={props.shipping || 0}
            displayType={'text'}
            thousandSeparator={'.'}
            prefix={'R$ '}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator={','} />
        </div>
      </div>
      <div className={styles['text-wrapper']}>
        <div>total</div>
        <div>
          <NumberFormat
            value={props.totalPrice || 0}
            displayType={'text'}
            thousandSeparator={'.'}
            prefix={'R$ '}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator={','} />
        </div>
      </div>
    </div>
  );
};

export default Summary;

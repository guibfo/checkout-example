import React from 'react';
import NumberFormat from 'react-number-format';

import styles from './Cupom.scss';

const Cupom = (props) => {
  let cupons = (
    props.cupons.map((cupom) => {
      return (
        <div key={cupom.id} className={styles['text-wrapper']}>
          <div>
            <input
              type="radio"
              id={cupom.title}
              name="cupom"
              value={cupom.id}
              onChange={(event) => props.change(event)} />
            <label className={styles['radio-label']} htmlFor={cupom.title}>{cupom.title}</label>
          </div>
          <div className={[styles.value, styles.minus].join(' ')}>
            <NumberFormat
              value={cupom.discount || 0}
              displayType={'text'}
              thousandSeparator={'.'}
              prefix={'-R$ '}
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator={','} />
          </div>
        </div>
      )
    })
  );

  return (
    <div className={styles['component-wrapper']}>
      <div className={styles.label}>cupons</div>
      <div className={styles['text-wrapper']}>
        <div>
          <input
            value=""
            type="radio"
            id="cupom-empty"
            name="cupom"
            onChange={(event) => props.change(event)}
            defaultChecked />
          <label className={styles['radio-label']} htmlFor="cupom-empty">no cupom</label>
        </div>
      </div>
      {cupons}
    </div>
  );
};

export default Cupom;

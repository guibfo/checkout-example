import React from 'react';

import styles from './Product.scss';

const Product = (props) => {
  return (
    <div className={styles['component-wrapper']}>
      <div className={styles['product-wrapper']}>
        <img src={props.image} alt={props.title} title={props.title} />
      </div>
    </div>
  );
};

export default Product;

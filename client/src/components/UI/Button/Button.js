import React from 'react';

import styles from './Button.scss';

const Button = (props) => {
  return (
    <button
      className={[styles.button, styles[props.btnType]].join(' ')}
      onClick={() => props.clicked(props.btnType)}>{props.children}</button>
  );
};

export default Button;

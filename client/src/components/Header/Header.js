import React from 'react';
import styles from './Header.scss';

const Header = (props) => {
  return (
    <header className={styles.header}>
      <img src={props.logo} alt="Checkout" title="Checkout example" />
    </header>
  );
};

export default Header;

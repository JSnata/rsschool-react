import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainHeader.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link to="/uncontrolled" className={styles.navLink}>
              Uncontrolled Form
            </Link>
          </li>
          <li>
            <Link to="/controlled" className={styles.navLink}>
              Controlled Form
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

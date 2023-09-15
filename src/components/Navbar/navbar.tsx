import { NavLink, Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { SignOut } from 'phosphor-react';

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.phone_sidebar}>
      <div onClick={() => setIsActive(!isActive)} className={`${styles.hamburger} ${isActive ? `${styles.active}` : ''}`} id='hamburger'>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
      <div className={`${styles.content} ${isActive ? `${styles.active}` : ''}`}>
        <div className={styles.links}>
          <NavLink to='/add'>Add new forum</NavLink>
        </div>
      </div>
      <NavLink to='/logout' className={styles.log}><SignOut size={25}/></NavLink>
    </div>
  )
}
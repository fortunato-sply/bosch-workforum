import { NavLink, Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { SignOut } from 'phosphor-react';

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const hasLoggedIn = sessionStorage.getItem('token');

  const logout = () => {
    sessionStorage.removeItem('token');
    window.location.reload();
  }

  const renderLogout = () => {
    if (hasLoggedIn)
      return <button className={styles.log} onClick={logout}><SignOut size={25} /></button>
  }

  const renderLinks = () => {
    if (hasLoggedIn)
      return (
        <div className={styles.links}>
          <NavLink to='/add'>Add new post</NavLink>
        </div>
      )
  }

  return (
    <div className={styles.phone_sidebar}>
      <div onClick={() => setIsActive(!isActive)} className={`${styles.hamburger} ${isActive ? `${styles.active}` : ''}`} id='hamburger'>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
      <div className={`${styles.content} ${isActive ? `${styles.active}` : ''}`}>
        {renderLinks()}
      </div>
      {renderLogout()}
    </div>
  )
}
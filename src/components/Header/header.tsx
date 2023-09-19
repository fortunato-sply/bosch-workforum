import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import styles from './styles.module.scss';
import { SignOut } from 'phosphor-react';

export default function Header() {
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
    <section className={styles.container}>
      <div className={styles.headerbox}>
        <div className={styles.upside}>
          <div className={styles.logo}></div>
          <span>Bosch Work Forum</span>
        </div>
        <div className={styles.downside}>
          <Navbar />
          <div className={styles.content}>
            {renderLinks()}
            {renderLogout()}
          </div>
        </div>
      </div>
    </section>
  )
}
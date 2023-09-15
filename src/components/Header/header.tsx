import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import styles from './styles.module.scss';
import { SignOut } from 'phosphor-react';

export default function Header() {
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
            <div className={styles.links}>
              <NavLink to='/add'>Add new forum</NavLink>
            </div>
            <NavLink to='/logout' className={styles.log}><SignOut size={25}/></NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}
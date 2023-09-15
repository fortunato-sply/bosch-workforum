import { NavLink, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { useState } from 'react';
import { SECRET } from '../../SECRET';
import CryptoJS from 'crypto-js';
import axios from 'axios';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const onHandleClickRegister = async () => {
    var data = {
      username,
      name,
      email,
      password
    };

    var dataEncrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET).toString();
    try {
      await axios.post('http://localhost:8080/register', {dataEncrypted: dataEncrypted});
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <h1>Register</h1>
        <div className={styles.inputs}>
          <input 
            type="text" 
            placeholder='Username'
            onChange={(e) => { setUsername(e.target.value); setError(false); }}
          />
          <input 
            type="text" 
            placeholder='Name' 
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="text" 
            placeholder='Email' 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder='Password' 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.submit}>Continue</button>
        <span>already have an account? <NavLink to='/'>Login</NavLink></span>
      </div>
    </section>
  )
}
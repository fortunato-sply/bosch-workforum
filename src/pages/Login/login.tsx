import { NavLink, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SECRET } from '../../SECRET';
import CryptoJS from 'crypto-js';


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if(token)
      navigate('/main');
  }, [])

  const navigate = useNavigate();
  const onHandleLogin = async() => {
    var data = {
      username,
      password
    };

    var dataEncrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET).toString();

    try {
      await axios.post('http://localhost:8080/login', { dataEncrypted })
        .then(res => {
          switch(res.status) {
            case(200):
              console.log("logado");
              sessionStorage.setItem("token", res.data.token);
              navigate('/main');
              window.location.reload();
              break;
            default:
              setError(true);
              break;
          }
        })
    } catch (err) {
      setError(true);
      console.log(`Error: ${err}`);
    }
  }

  const renderError = () => {
    if(error) {
      return <div className={styles.error}>
        Username or password incorrect
      </div>
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <h1>Login</h1>
        {renderError()}
        <div className={styles.inputs}>
          <input 
            type="text" 
            placeholder='Username' 
            onChange={(e) => { setUsername(e.target.value); setError(false); }}
          />
          <input 
            type="password" 
            placeholder='Password' 
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
          />
        </div>
        <button className={styles.submit} onClick={onHandleLogin}>Continue</button>
        <span>doesn't have an account? <NavLink to='/register'>Register</NavLink></span>
      </div>
    </section>
  )
}
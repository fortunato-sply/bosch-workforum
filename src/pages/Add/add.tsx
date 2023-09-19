import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const token = sessionStorage.getItem('token');

  const navigate = useNavigate();

  const onHandleAdd = async () => {
    const data = {
      token,
      title,
      content
    }

    try {
      await axios.post('http://localhost:8080/post/create', { data });
      navigate('/');
    } catch(err) {
      console.log(`erro: ${err}`);
    }
  }

  useEffect(() => {
    if(!token)
      navigate('/')
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <h1>New post</h1>
        <div className={styles.inputs}>
          <input 
            type="text" 
            placeholder='Title' 
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea 
            placeholder='Content' 
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button onClick={onHandleAdd}>Add</button>
      </div>
    </section>
  )
}
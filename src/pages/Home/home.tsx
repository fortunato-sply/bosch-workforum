import axios from "axios";
import styles from './styles.module.scss';
import Post from "../../components/Post/post";

export default function HomePage() {
  const token = sessionStorage.getItem('token');

  const testApi = async () => {
    await axios.post('http://localhost:8080/post/create', { token: token });
  }
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <Post />
      </div>
    </section>
  )
}
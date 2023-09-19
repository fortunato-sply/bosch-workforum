import { ThumbsUp } from 'phosphor-react';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface PostProps {
  id: String,
  title: String,
  text: String,
  author: {
    id: String,
    name: String
  },
  postLikes: Number,
}

interface CheckLikeResponse {
  isLiked: boolean
}

export default function Post({ id, title, text, author, postLikes }: PostProps) {
  const token = sessionStorage.getItem('token');
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState<number>(postLikes as number);

  const navigate = useNavigate();

  const onHandleLike = async () => {
    if(isLiked)
      setLikes(likes - 1);
    else
      setLikes(likes + 1);

    setIsLiked(!isLiked);

    try {
      await axios.post('http://localhost:8080/post/like', { token, postId: id })
    } catch (err) {
      console.error(err);
    }
  }

  const checkIsLiked = async () => {
    try {
      const res = await axios.post<CheckLikeResponse>('http://localhost:8080/post/check', { token, postId: id })
      setIsLiked(res.data.isLiked);
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    checkIsLiked();
    console.log(isLiked);
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.upside}>
        <div className={styles.info}>
          <img src="gtr.jpg" alt="" />
          <div className={styles.afterline}></div>
          <span>{author.name}</span>
        </div>
      </div>
      <div className={styles.content}>
        <h1>{title}</h1>
        <div className={styles.text}>
          {text}
        </div>
        <div className={styles.afterline}></div>
        <div className={`${styles.likes} ${isLiked ? `${styles.liked}` : ''}`}>
          <button className={styles.likebtn} onClick={onHandleLike}><ThumbsUp weight='fill'/></button>
          <span>{likes} likes</span>
        </div>
      </div>
    </div>
  )
}
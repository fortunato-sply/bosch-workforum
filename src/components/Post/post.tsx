import { ThumbsUp } from 'phosphor-react';
import styles from './styles.module.scss';
import { useState } from 'react';

interface PostProps {
  id: String,
  title: String,
  likes: Number,
}

export default function Post() {
  const [isLiked, setIsLiked] = useState(false);

  const onHandleLike = () => {
    setIsLiked(!isLiked);
  }

  return (
    <div className={styles.card}>
      <div className={styles.upside}>
        <div className={styles.info}>
          <img src="gtr.jpg" alt="" />
          <div className={styles.afterline}></div>
          <span>Rogerinho</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
          Billie Jean, step bai uai, girls hard, hiii hiiiii, a big apple could you know, hei hei
        </div>
        <div className={styles.afterline}></div>
        <div className={`${styles.likes} ${isLiked ? `${styles.liked}` : ''}`}>
          <button className={styles.likebtn} onClick={onHandleLike}><ThumbsUp weight='fill'/></button>
          <span>0 likes</span>
        </div>
      </div>
    </div>
  )
}
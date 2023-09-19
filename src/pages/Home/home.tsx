import axios from "axios";
import styles from './styles.module.scss';
import Post from "../../components/Post/post";
import { Key, useEffect, useState } from "react";

interface PostAuthor {
  id: String,
  name: String
}

interface Post {
  _id: String,
  title: String,
  text: String,
  author: PostAuthor,
  likes: Number,
  userLikes: String[]
}

interface PostResponse {
  content: Post[]
}

export default function HomePage() {
  const token = sessionStorage.getItem('token');
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async () => {
    try {
      const res = await axios.get<PostResponse>('http://localhost:8080/post');
      setPosts(res.data.content);
    } catch (err) {
      console.error(`Erro ao buscar posts: ${err}`);
    }
  }

  const renderPosts = () => {
    return posts.map(post => {
      return <Post 
        author={post.author} 
        id={post._id} 
        postLikes={post.likes} 
        text={post.text}
        title={post.title}
        key={post._id as Key}
      />
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        {renderPosts()}
      </div>
    </section>
  )
}
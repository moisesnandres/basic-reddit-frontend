import { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getAllPosts()
  }, [])

  const increaseTime = (id) => {
    axios.patch(`http://localhost:3000/posts/${id}/increment_count`)
         .then(getAllPosts)
  }

  const getAllPosts = async () => {
    return axios.get('http://localhost:3000/posts')
      .then((response) => {
        setPosts(response.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Basic Reddit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {posts.map(post => 
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>{post.expires_at}</p>
            <button onClick={() => increaseTime(post.id)}>Vote</button>
          </article>
        )}
      </main>
    </div>
  )
}

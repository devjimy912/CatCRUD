// src/Posts.js
import React, { useEffect, useState } from 'react';

function Posts() {
  // 상태 정의: posts 배열
  const [posts, setPosts] = useState([]);

  // JSON 서버에서 데이터 가져오기
  useEffect(() => {
    fetch('http://localhost:5000/posts') // JSON 서버 주소
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // 데이터 추가 함수
  const addPost = () => {
    let newTitle = 'New Post';
    let newContent = 'Content of new post';
    //추가할 데이터 내용
    const newPost = { title: newTitle, content: newContent };

    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then(response => response.json())
      .then(data => {
        setPosts([...posts, data]);
      })
      .catch(error => console.error('Error adding post:', error));
  };

  // 데이터 삭제 함수
  const deletePost = (id) => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => console.error('Error deleting post:', error));
  };

  // 렌더링 부분
  return (
    <div>
      <h1>Posts</h1>
      <button onClick={addPost}>Add Post</button>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;

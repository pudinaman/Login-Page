import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import './InfiniteScroll.css'; // Import CSS file

// Dummy data for demonstration
const dummyPosts = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  title: `Post ${index + 1}`,
}));

function InfiniteScroll() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setIsLoading(true);
    // Simulate an API call to fetch more posts
    setTimeout(() => {
      const newPosts = dummyPosts.slice((page - 1) * 10, page * 10);
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setIsLoading(false);
    }, 1000);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="infinite-scroll-container">
      <h2>Infinite Scroll</h2>
      <div className="posts">
        {posts.map(post => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>Post content...</p>
          </div>
        ))}
        {isLoading && <p>Loading...</p>}
      </div>
      <p>
        <Link to="/login">Logout</Link>
      </p>
    </div>
  );
}

export default InfiniteScroll;

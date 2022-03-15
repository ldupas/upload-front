import { useState, useEffect } from 'react';
import axios from 'axios';

import Post from './Post';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API_URL}/posts`)
        .then((res) => res.data)
        .then((data) => setPosts(data))
    }, []);

    return (
        <div>
            {posts &&
            posts.map((post) => (
                <div key={post.id}>
                    <Post post={post} />
                </div>
            ))}
        </div>
    )
}

export default PostList
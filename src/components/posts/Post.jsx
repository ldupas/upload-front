import React from 'react'

const Post = ({post}) => {
    console.log(post.picture);

    return (
        <div>
            <h2>
                {post.title}
            </h2>
            <img src={`${process.env.REACT_APP_API_PIC}/${post.picture}`} alt={post.title} />
        </div>
    )
}

export default Post
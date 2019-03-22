import React, { Component } from 'react'
import PostListItem from './PostListItem'
class PostList extends Component {
  render() {
    const {posts} = this.props;
    return (
      <div>
        <h1>Feed</h1>
        {posts.map((event) => (
          <PostListItem key={event.id} post={event}/>
        ))}


      </div>
    )
  }
}

export default PostList
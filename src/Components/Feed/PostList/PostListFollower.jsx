import React, { Component } from 'react'
import { List, Image } from 'semantic-ui-react'

class PostListFollower extends Component {
  render() {
    const {follower} = this.props;
    return (
      <List.Item>
        <Image as='a' size="mini" circular src={follower.photoURL}/>
      </List.Item>
    )
  }
}

export default PostListFollower
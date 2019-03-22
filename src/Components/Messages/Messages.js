import React from 'react';
import {Segment, Comment, Container} from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import PostDashboard from '../Feed/PostDashboard/PostDashboard';

class Messages extends React.Component{
  render(){
    return(
    <React.Fragment>
    <MessagesHeader />
    <Container className="main">
      <PostDashboard />
    </Container>
    </React.Fragment>
  );
  }
}

export default Messages;

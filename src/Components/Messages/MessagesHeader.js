import React from 'react';
import {Icon, Input, Segment, Header, Grid, Search, Responsive} from 'semantic-ui-react';

class MessagesHeader extends React.Component{
  render(){
    return(
      <Grid>
        <Grid.Column width={6}>
           <Search />
        </Grid.Column>
      </Grid>
      
     
    )
  }
}

export default MessagesHeader;

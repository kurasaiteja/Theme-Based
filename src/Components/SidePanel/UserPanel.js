import React from 'react';
import firebase from '../../firebase'
import {connect} from "react-redux"
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';

class UserPanel extends React.Component{
  state = {
    user:this.props.currentUser
  }

  dropdownOptions = () =>[
  {
    key: "User",
    text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
    disabled: true
  },
  {
    key: "avatar",
    text: <span>Change avatar</span>
  },
  {
    key: "signOut",
    text: <span onClick={this.handleSignout}>SignOut</span>
  }
];

handleSignout=()=>{
  firebase
  .auth()
  .signOut()
  .then(()=>console.log('signed out'))
}

  render(){
    const{user}=this.state
    return(
      <Grid style={{background: '#16222a'}}>
      <Grid.Column>
      <Grid.Row style={{padding: "1.2em", margin: 0}}>
      {/* App header*/}
      <Header inverted floated="left" as="h2">
      <Icon cordered inverted color="green" name="comments" />
      <Header.Content><font color="grey">Buffer!</font></Header.Content>
      </Header>
      {/* User dropdown*/}
      <Header style={{ padding: '0.25em' }} as="h4" inverted>
      <Dropdown trigger={
        <span>
        <Image src={user.photoURL} spaced="right" avatar/>
        {user.displayName}</span>
      } options={this.dropdownOptions()} />
      </Header>
      </Grid.Row>
      </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default UserPanel;

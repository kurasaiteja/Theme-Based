import React from 'react';
import { Grid,Container} from 'semantic-ui-react';
import './App.css';
import {connect} from 'react-redux'
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import NavBar from './nav/NavBar/NavBar'
import MetaPanel from './MetaPanel/MetaPanel';
import Messages from './Messages/Messages';

const App = ({currentUser}) => (
<Grid columns='equal' className='app' style={{ background: "#eee", paddingTop: '20px' }}>
 {/*<ColorPanel />*/}
 <SidePanel currentUser={currentUser}/>
 {/*<NavBar />*/}
 <Grid.Column style={{ marginLeft: 320 }}>
 <Messages />
 </Grid.Column>
 <Grid.Column width={4}>
 <MetaPanel />
 </Grid.Column>
</Grid>
);

const mapStateToProps = state => ({
	currentUser: state.user.currentUser
})
export default connect(mapStateToProps)(App);

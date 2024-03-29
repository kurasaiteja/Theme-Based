import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import Login from "./Components/Auth/Login";
//import Post from "./Components/Post/Post";
import Register from "./Components/Auth/Register";
import registerServiceWorker from "./registerServiceWorker";
import Spinner from './Spinner'
import firebase from './firebase';
import rootReducer from "./reducers"
import {setUser,clearUser} from "./actions"
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools());
class Root extends React.Component{
	componentDidMount(){
		firebase.auth().onAuthStateChanged(user =>{
			if(user){
				this.props.setUser(user);
				this.props.history.push('/');
			}
			else{
				this.props.history.push('/login');
				this.props.clearUser();
			}
		})
	}
  render(){
  return this.props.isLoading ? <Spinner /> :(
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  
);
}
} 

const mapStatefromProps = state => ({
	isLoading: state.user.isLoading
})

const RootwithAuth = withRouter(
	connect(
		mapStatefromProps,
		{setUser,clearUser}
		)(Root)
);
ReactDOM.render(
<Provider store={store}>
<Router>
<RootwithAuth />
</Router>
</Provider>, document.getElementById("root"));
registerServiceWorker();

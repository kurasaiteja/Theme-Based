import React from "react";
import md5 from 'md5';
import {
  Grid,
  Form,
  Segment,
  Button,
  Message,
  } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Head from './Head'
import Particles from 'react-particles-js';
import firebase from '../../firebase';
import Select from 'react-select';
import '../App.css';
//particles effect in background
const particlesOptions ={
  "particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true
   }

//options for Year field in registration form
const Yearoptions = [
  { value: '1', label: '1st' },
  { value: '2', label: '2nd' },
  { value: '3', label: '3rd' },
  { value: '4', label: '4th' }
];

//options for Branch field in registration form
const Branchoptions = [
  { value: '1', label: 'CIV' },
  { value: '2', label: 'CSE' },
  { value: '3', label: 'ECE' },
  { value: '4', label: 'EEE' },
  { value: '5', label: 'IT'  },
  { value: '6', label: 'MECH'}
];


class Register extends React.Component {
  state = {
    head:{username:''},
    username:'',
    password:'',
    email:'',
    errors:[],
    selectedBranch: null,
    selectedYear: null,
    loading:false,
    usersRef: firebase.database().ref('users')
  };
//triggers when user selects a Branch in the registration form 
  handleBranchChange = (selectedBranch) => {
    this.setState({ selectedBranch });
    console.log(`Option selected:`, selectedBranch);
  };

//Triggers when user selects a Year in the Registration form
  handleYearChange = (selectedYear) => {
    this.setState({ selectedYear });
  };
//Triggers when User types username in the Registration form
   setName = (event) => {
        this.setState({
          head:{username:event.target.value}//head value is changed as we type username
          })
      };
//Explicitly giving errors as per requirement
    isFormValid = () => {
      let errors=[];
      let error;

       if(this.isFormEmpty(this.state)){
        error={ message: 'Fill in all fields'};
        this.setState({
          errors:errors.concat(error) 
        });
        return false;
      }else if(this.isPasswordValid(this.state)){
        error={ message: 'Password must be atleast 6 characters'};
        this.setState({
          errors:errors.concat(error)
        });
        return false;
      }else{
        return true;
      }
    };
//To check whether all fields are filled.
    isFormEmpty = ({username,password,email,selectedYear,selectedBranch}) => {
      return !username.length|| !email.length|| !password.length || !selectedBranch || !selectedYear;
    };
//To check password length.
    isPasswordValid = ({password}) => {
      if(password.length > 6){
        return false;
      }else{
        return true;
      }
    };

   displayErrors = errors => errors.map((error,i)=> <div key={i}>{error.message}</div>);
//Change the corresponding state while user edits the form.      
   handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    });
    };
    
  
//Handling form submit.
  handleSubmit=(event) => {
    if(this.isFormValid()){
      this.setState({
        errors:[], 
        loading:true
      });
    event.preventDefault();
    firebase
     .auth()

     //firebase method which authenicates and creates user with email and password
     .createUserWithEmailAndPassword(this.state.email,this.state.password)
    
     //If the User creation successful
     .then(createdUser=>{ 
      console.log(createdUser);

      //updating profile of User along with email,uid and password
      createdUser.
      updateProfile({ 
        displayName:this.state.username,
        photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.email
              )}?d=identicon`,
        })


      .then(()=>{
      this.saveUser(createdUser).then(() =>{
        console.log('user saved');
      })
      
      })

      //display errors related to updating profile
      .catch(err=>{
      console.error(err);
      this.setState({ 
        errors:this.state.errors.concat(err), 
        loading:false})
      })
     })

     //display errors related to form validation
     .catch(err=>{
      console.error(err);
      this.setState({ 
        errors:this.state.errors.concat(err), 
        loading:false
      });
      });
  }
}

saveUser = createdUser => {
 return this.state.usersRef.child(createdUser.uid).set({
  Name: createdUser.displayName,
  Avatar:createdUser.photoURL,
  });
};

  render() {
   const { username, password, email, selectedBranch, selectedYear, loading, errors } = this.state;   
    return (
      <div>
      <Particles className="particles"
            params={particlesOptions}
          /> 
      
      <Grid textAlign="center" verticalAlign="middle" className="app register">
       <Grid.Column style={{ maxWidth: 450 }}>
          <Head name={this.state.head.username} textAlign="center" ></Head>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>

              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={e=>{this.handleChange(e);this.setName(e);}}
                type="text"
                value={username}
              />
              
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                
                value={email}
                className={errors.some(error=>
                    error.message.toLowerCase().includes('email'))
                  ?'error'
                  :""
                }
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                value={password}
                className={errors.some(error=>
                    error.message.toLowerCase().includes('password'))
                  ?'error'
                  :""
                }
              />

              <Form.Field>
             <Select
             placeholder='Year'
        value={selectedYear}
        onChange={this.handleYearChange}
        options={Yearoptions}
      />
          </Form.Field>
           
          <Form.Field>
          <Select
          placeholder='Branch'
            value={selectedBranch}
        onChange={this.handleBranchChange}
        options={Branchoptions}/>   
          </Form.Field>

              
              <Button disabled={loading} className={loading ? 'loading' :''} color="blue" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
              </Message>
          )}

          <Message>
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
      </div>
      
    );
  }
}

export default Register;
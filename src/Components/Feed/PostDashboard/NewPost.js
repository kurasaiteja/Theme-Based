import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import { Input,Button, Grid,Form, TextArea, Responsive,Dropdown,Select, Segment } from 'semantic-ui-react';
import './NewPost.css';

class NewPost extends Component {
   


    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            post: {
                      title: '',
                      description: '',
                      category: '',
                      postedBy: '',
                      selectedTag:[]
                    }
            
        }
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    onFormSubmit = (event) => {
    event.preventDefault();
    this.props.createPost(this.state.post)
  }

  onInputChange = (event) => {
    const newPost = this.state.post;
    newPost[event.target.name] = event.target.value;
    this.setState({
      post: newPost,
     
    })
    console.log(event)
  }


  

    render() {
        const {post} = this.state;
        const styling = {
            position: "right",
        };
        let tagOptions = [ { key: 'java', value: 'java', text: 'Java' }, 
                             { key: 'python', value: 'python', text: 'Python' },
                             { key: 'javascript', value: 'javascript', text: 'JavaScript' }]
        return (
            <section>
                <button style={{background: '#00c07f'}} className="ui inverted align button" onClick={() => this.openModal()}>NewPost</button>                
                <Modal 
                    visible={this.state.visible}
                    width="800"
                    height="400"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >   <Segment raised inverted style={{background: '#313d4b'}}>
                    <div>
                        <div className="heading"><h1>New Post</h1></div>
                        <Grid style={{background: '#313d4b'}}>
                        <Grid.Column width={1}>
                        </Grid.Column>
                        <Grid.Column width={12}>
                        <Segment raised inverted style={{background: '#313d4b'}}>
                        <Form onSubmit={this.onFormSubmit}>
                        <Form.Field>
                        <Input name='title' onChange={this.onInputChange} placeholder='Post Title' />
                        </Form.Field>
                        <Form.Field>
                        <TextArea name='description' onChange={this.onInputChange} placeholder='Post Description' style={{ minHeight: 200 }} />
                        </Form.Field>
                        <Form.Field>
                        <Dropdown name='Tags' placeholder='Add Tags' multiple search selection/>
                        </Form.Field>
                        <Form.Field>
                        <Button.Group>
                            <Button positive type="submit"  onClick={() => this.closeModal()}>Post</Button>
                            <Button.Or text='or' />
                            <Button onClick={() => this.closeModal()}>cancel</Button>
                        </Button.Group>
                        </Form.Field>
                        </Form>
                        </Segment>
                        </Grid.Column>
                        <Grid.Column width={3}>
                        </Grid.Column>
                        </Grid>
                    </div>
                    </Segment>
                </Modal>
            </section>
        );
     }
}

export default NewPost;

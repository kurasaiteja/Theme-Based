import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import { Button, Form, TextArea, Dropdown } from 'semantic-ui-react';
import './Post.css';



const options = [
  { key: 'angular', code:'#75523C', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
]
 const colorValues: number[] | string[] = ['#75523C', '#4CD242', '#FF745C', '#3B8289', '#CA3832'];

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
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

    render() {
        const styling = {
            position: "right",
        };
        return (
            <section>
               {/* <h1>React-Modal Examples</h1>*/}
                <button class="ui blue align inverted button" onClick={() => this.openModal()}>NewPost</button>                
                <Modal 
                    visible={this.state.visible}
                    width="600"
                    height="400"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                    <div>
                        <div class="heading"><h1>New Post</h1></div>
                        <div class="adjust">
                        <Button.Group>
                            <Button positive>Post</Button>
                            <Button.Or text='or' />
                            <Button onClick={() => this.closeModal()}>cancel</Button>
                        </Button.Group>
                        </div>
                        <Form>
                        <div class='tarea'>
                        <TextArea placeholder='Try adding multiple lines' style={{ minHeight: 200 }} />
                         <br/>
                         <Dropdown placeholder='Skills' fluid multiple selection options={options} value={this.colorValues} />
                        </div>
                        </Form>
                        {/*<a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>*/}
                    </div>
                </Modal>
            </section>
        );
     }
}

export default Post;
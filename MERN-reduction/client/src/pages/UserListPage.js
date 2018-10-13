import React, {Component} from 'react';
import {   ToastStore} from 'react-toasts';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  // FormText,
  // FormFeedback,
} from 'reactstrap';
import { ValidatingFormGroup } from 'reactstrap-validation';

import Page from 'components/Page';
import axios from 'axios';
// import userService from '../services/user.service';

// import EditDataPage from './EditDataPage';

class UserListPage extends Component {
    constructor(props) {
        super(props);
        this.userid = this.props.match.params.id;
        this.state = {
            userData: {
                _id:'',
                username:'',
                email:'',
                password:'',
            },
            selectedFile:null,
            avatar:'',
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);   
        this.sendModifiedData = this.sendModifiedData.bind(this);
    }

    componentDidMount(){
    const userid = this.props.match.params.id;
    axios.get('http://localhost:4200/users/'+userid)
        .then(response => {
            this.setState({ userData: response.data });
            console.log(this.state.userData);
        })
        .catch(function(error) {
            console.log(error);
        });
        const avatar = this.state.userData.avatar;
        console.log(avatar);
        this.setState({avatar: avatar});
    }

    onChange(event) {
        const userData = Object.assign({}, this.state.userData);
        userData[event.target.name] = event.target.value;
        this.setState({userData:userData});
    }

    sendModifiedData(data,avatar,userid){
      const username = data.username;
      const email = data.email;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, avatar })
      };
      return fetch('http://127.0.0.1:4200/users/' + userid, requestOptions)
        .then(res =>{
            this.setState({userData: res.data , message: res.message});
            ToastStore.success("User updated successfully.", 3000);
          })
        .catch(function(error) {
            console.log(error);
        })
        this.props.history.push('/users');
        window.location.reload();
    }
    
    handleSubmit(event){
        event.preventDefault();

        console.log( this.state.avatar);
        // this.state.userData.avatar = this.state.avatar;
        this.sendModifiedData(this.state.userData,this.state.avatar,this.userid);
        this.props.history.push('/users');
        window.location.reload();
    }

    onChangeImage = event => {
      console.log(event.target.files[0]);
      this.setState({ 
        selectedFile:event.target.files[0]
      });
      // console.log(this.state.selectedFile);  
      // console.log(this.fileInput);
      const fd = new FormData();
      fd.append('image', event.target.files[0], event.target.files[0].name );
      console.log(fd);

      fetch('http://localhost:4200/upload', {
        method: 'POST',
        body: fd,
      }).then((response) => {
        response.json().then((body) => {
          this.setState({ avatar: `http://localhost:4200/${body.file}` });
          console.log(this.state.avatar);
          this.state.isSelected = true;
        });
      });
    }

    render() {
        const userData = this.state.userData;
        const avatar = this.state.avatar;
        const {initialValid } = this.props;
        return (
            <Page title="User Profile" breadcrumbs={[{ name: 'Profile', active: true }]}>
              <Row>
                <Col xl={12} lg={12} md={12}>
                  <Card>
                    <CardHeader>General Inforation</CardHeader>
                    <CardBody style={{padding:80}}>
                      <Form onSubmit={this.handleSubmit}>
                          <Row>
                            <Col xl={2} lg={2} md={2}>
                              <FormGroup></FormGroup>
                              <FormGroup></FormGroup>
                              <FormGroup className="image-upload" trigger="change" valid={initialValid}>
                                <Label htmlFor="file-input">
                                  <img src={process.env.PUBLIC_URL + userData.avatar}
                                     className="rounded-circle"
                                      height="150px" width="150px" 
                                  ></img>
                                </Label>
                                <Input style={{display:'none'}}
                                      ref={fileInput => this.fileInput = fileInput}
                                      type="file" id="file-input" 
                                      onChange={this.onChangeImage}
                                 />
                                {/* <Button onClick={() => this.fileInput.click()}>Pick File</Button> */}
                              </FormGroup>
                            </Col>
                              <Col xl={10} lg={10} md={10}>
                                <ValidatingFormGroup trigger="change" valid={initialValid} row>
                                  <Label for="username" sm={2}>
                                    Username
                                  </Label>
                                  <Col sm={8}>
                                    <Input
                                      type="username"
                                      name="username"
                                      placeholder="your username"
                                      value={userData.username}
                                      onChange={this.onChange}
                                      required
                                    />
                                  </Col>
                                </ValidatingFormGroup>   
                                <ValidatingFormGroup trigger="change" valid={initialValid} row>
                                  <Label for="Email" sm={2}>
                                    Email
                                  </Label>
                                  <Col sm={8}>
                                    <Input
                                      type="email"
                                      name="email"
                                      placeholder="your@email.com"
                                      value={userData.email}
                                      onChange={this.onChange}
                                      required
                                    />
                                  </Col>
                                </ValidatingFormGroup>   
                            <ValidatingFormGroup trigger="change" valid={initialValid} row>
                              <Label for="examplePassword" sm={2}>
                                Password
                              </Label>
                              <Col sm={8}>
                                <Input
                                  type="password"
                                  name="password"
                                  placeholder="password placeholder"
                                  value={userData.password}
                                  onChange={this.onChange}
                                  required
                                />
                              </Col>
                            </ValidatingFormGroup>
                            <FormGroup row>
                              <Label for="exampleText" sm={2}>
                                Text Area
                              </Label>
                              <Col sm={8}>
                                <Input type="textarea" name="text" />
                              </Col>
                            </FormGroup>                          
                          </Col>
                        </Row>           
                        <Button className="btn btn-primary" type="submit">Update user</Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
         </Page>
        );
    }
}

export default UserListPage;


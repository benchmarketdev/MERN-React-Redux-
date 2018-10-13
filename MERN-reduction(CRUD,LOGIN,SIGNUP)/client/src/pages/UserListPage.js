import React, {Component} from 'react';
import {ToastContainer, ToastStore} from 'react-toasts';
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
  FormText,
  FormFeedback,
} from 'reactstrap';
import { ValidatingFormGroup } from 'reactstrap-validation';

import Page from 'components/Page';
import axios from 'axios';
import userService from '../services/user.service';
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
    }
    onChange(event) {
        const userData = Object.assign({}, this.state.userData);
        userData[event.target.name] = event.target.value;
        this.setState({userData:userData});
    }
    sendModifiedData(data,userid){
        axios.put('http://localhost:4200/users/'+userid,data)
        .then(res =>{
            this.setState({userData: res.data , message: res.message});
            ToastStore.success("User updated successfully.", 3000);
          })
        .catch(function(error) {
            console.log(error);
        })
    }
    handleSubmit(event){
        event.preventDefault();
        this.sendModifiedData(this.state.userData,this.userid);
        this.props.history.push('/users');
        window.location.reload();
    }

    render() {
        const userData = this.state.userData;
        const {initialValid } = this.props;
        return (
            <Page title="User Profile" breadcrumbs={[{ name: 'Profile', active: true }]}>
              <Row>
                <Col xl={12} lg={12} md={12}>
                  <Card>
                    <CardHeader>General Inforation</CardHeader>
                    <CardBody>
                      <Form onSubmit={this.handleSubmit}>
                        <ValidatingFormGroup trigger="change" valid={initialValid} row>
                          <Label for="username" sm={2}>
                            Username
                          </Label>
                          <Col sm={10}>
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
                          <Col sm={10}>
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
                          <Col sm={10}>
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
                          <Col sm={10}>
                            <Input type="textarea" name="text" />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="exampleFile" sm={2}>
                            Image
                          </Label>
                          <Col sm={10}>
                            <Input type="file" name="file" />
                            <FormText color="muted">
                              This is some placeholder block-level help text for the
                              above input. It's a bit lighter and easily wraps to a new
                              line.
                            </FormText>
                          </Col>
                        </FormGroup>
                        <Button className="btn btn-primary" type="submit">Update userData</Button>
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


import React, { Component } from 'react';
import WidgetComponent from "../../../components/Widget";
import { authHeader } from "../../../helpers/auth-header";
import { Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

class TableEditPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        email: '',
        avatar: '',

      },
      avatar: '',

      value: false
    };

    this.onChangeImage = this.onChangeImage.bind(this);

    this.onEditSubmit = this.onEditSubmit.bind(this);
    
    this.requestOptions = {
      method: 'GET',
      headers: authHeader()
    };
  }

  componentDidMount() {
    this.loadUserDataById();
  }

  loadUserDataById() {

    fetch('http://127.0.0.1:3003/user/' + this.props.match.params.id, this.requestOptions)
      .then(response => response.json())
      .then(response => {
        this.setState({ user: response.data })
        this.setState({ avatar: response.data.avatar })
      });
  }

  onChange = (e) => {
    const state = this.state.user
    state[e.target.name] = e.target.value;
    this.setState({ user: state });
  }

  onEditSubmit(e) {
    e.preventDefault();

    const email = this.state.user.email;
    const username = this.state.user.username;
    const { dispatch } = this.props;
    if (username && email) {
      this.edit(username, email, this.state.avatar);
    }
  }

  edit(username, email, avatar) {
    console.log('=1231231131=====')
    console.log(avatar);

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, avatar })
    };
    return fetch('http://127.0.0.1:3003/user/' + this.props.match.params.id, requestOptions)
      .then(response => {
        console.log('===response')
        this.props.history.push("/tables");
      })
  }

  onChangeImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.ref.files[0]);
    // data.append('filename', this.fileName.value);
    console.log('==============data===================')
    console.log(data);
    fetch('http://127.0.0.1:3003/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ avatar: `http://127.0.0.1:3003/${body.file}` });
        this.state.isSelected = true;
      });
    });
  }

  render() {

    return (
      <div className="content-wrapper container-fluid px-5 mb-4 trans-03-in-out">
        <div className="col-lg-12 mb-3">
          <WidgetComponent header='Edit User' className='shadow-01 mb-4' excerpt=''>
            <form className="container" onSubmit={this.onEditSubmit}>
              <div className="row">

                <div className="col-md-2">

                  <div className="image-upload">
                    <label htmlFor="file-input">
                      <img src={process.env.PUBLIC_URL + this.state.avatar} className="rounded-circle " height="50px" width="50px" />
                    </label>

                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" id="file-input" name="file" onChange={this.onChangeImage} />
                  </div>

                </div>

                <div className="col-md-5">
                  <label htmlFor="validationCustom01">User Name</label>
                  <input type="text" className="form-control" placeholder="User name" name="username" onChange={this.onChange} value={this.state.user.username} required />
                </div>

                <div className="col-md-5">
                  <label htmlFor="validationCustom02">Email</label>
                  <input type="text" className="form-control" placeholder="Email" onChange={this.onChange} name="email" value={this.state.user.email} required />
                </div>

              </div>
              <div className="margin2">
                <button className="btn btn-primary" type="submit">Update</button>
              </div>
            </form>
          </WidgetComponent>
        </div>
      </div>
    );
  }
}

export default TableEditPage;

import {LoginView, STATE_LOGIN } from '../components/LoginView';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';
// import {connect} from 'react-redux';
class AuthPage extends React.Component {
  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/signup');
    }
  };

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>
            <LoginView
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

// export default AuthPage;
// function mapStateToProps(state) {
//   const { alert } = state;
//   return {
//     alert
//   };
// }

export default AuthPage;

// const connectedAuthPage = connect(mapStateToProps)(AuthPage);
// export { connectedAuthPage as AuthPage };
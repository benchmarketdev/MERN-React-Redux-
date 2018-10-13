import React, {Component} from 'react';

class LogoComponent extends Component {
  render() {
    return (
      <div className="logo px-4 pb-2">
        <a>
          <div className="text-center text-nowrap">
            {/* <i className="fa fa-spin fa-play-circle rounded-circle" aria-hidden="true"/> */}
            <h3>School App</h3>
            <p className="text-muted">
              <small>ver. 1.0.0</small>
            </p>
          </div>
        </a>
      </div>
    );
  }
}

export default LogoComponent;

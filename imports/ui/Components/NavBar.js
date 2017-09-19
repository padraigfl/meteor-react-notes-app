import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../AccountsUIWrapper.js';

// App component - represents the whole app
class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false
    };
  }

  render() {
    return (
      <div className="nav">
        <AccountsUIWrapper />
        <div className="links">
          <Link to="/" className="head-button notes">
            Notes
          </Link>
          <Link to="/drafts" className="head-button drafts not-implemented">
            Drafts
          </Link>
          <Link to="/new" className="head-button new">
            New
          </Link>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('notes');
  return {
    currentUser: Meteor.user()
  };
}, NavBar);

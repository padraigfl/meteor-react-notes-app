import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes.js';

import CellList from './Components/CellList.js';

import '../../client/stul.less';

// App component - represents the whole app
class NoteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  render() {
    return (
      <div>
        <div className='list'>
          <ul>
            <CellList notes={this.props.notes} className='notes' />
          </ul>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('notes');
  return {
    notes: Notes.find({}, { sort: { lastUpdated: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, NoteList);

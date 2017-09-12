import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes.js';

import CellList from './Components/CellList.js';

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
            <CellList notes={this.props.drafts} className='notes' />
          </ul>
        </div>
      </div>
    );
  }
}

NoteList.propTypes = {
  drafts: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
}

export default createContainer(() => {
  Meteor.subscribe('notes');
  return {
    drafts: Notes.find({}, { sort: { lastUpdated: 1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, NoteList);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import NoteCell from './NoteCell.js';

// Task component - represents a single todo item
export default class CellList extends Component {
  renderList() {
    const filteredNotes = this.props.notes;

    return filteredNotes.map( note => <NoteCell key={note._id} note={note} />);
  }

  render() {
    return (
      <div className="list">
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

CellList.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  notes: PropTypes.array.isRequired,
};

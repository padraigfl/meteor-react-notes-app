import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../../api/notes.js';

// Task component - represents a single todo item
class NoteView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      note: props.note,
    };
  }

  deleteNote() {
    console.log('we in here');
    Meteor.call('notes.remove', this.props.note._id);
  }

  render() {
    if (this.props.note === undefined) {
      return <Redirect to='/404' />;
    }

    return (
      <div className='display'>
        <div className='note-view'>
          <div className='note-heading display-heading'>
            <div className='note-info'>
              <span className='note-date'>
                Created on {this.props.note.createdAt.toLocaleString()}<br/>
                Last Edited: {this.props.note.lastUpdated.toLocaleString()}
              </span>
            </div>
            <div className='note-actions '>

              <Link className='mobile-only' to={`/`}>Back</Link>
              <Link to={`/edit/${this.props.note._id}`}>Edit</Link>
              <button onClick={this.deleteNote.bind(this)}>Delete</button>
            </div>
          </div>
          <div className='note-body'>
            <div className='note-title'>
              <div className='vertical-align'>{this.props.note.title}</div>
            </div>
            <div className='note-content'>
              {this.props.note.content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NoteView.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  noteId: PropTypes.string,
  note: PropTypes.object,
};

export default createContainer(({ match }) => {
  Meteor.subscribe('notes');
  const noteId = match.params.note_id;
  const note = Notes.findOne({ _id: noteId });
  return {
    noteId,
    note,
    currentUser: Meteor.user(),
  };
}, NoteView);

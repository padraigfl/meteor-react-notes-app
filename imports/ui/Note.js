import React, { Component, PropTypes } from 'react';

import { Notes } from '../api/notes.js';
 
// Task component - represents a single todo item
export default class Note extends Component {
  toggleChecked(){
    Notes.update(this.props.note._id, {
      $set: { checked: !this.props.note.checked },
    });
  }

  deleteNote(){
    Notes.remove(this.props.note._id);
  }

  render() {
    const noteClassName = this.props.note.checked ? 'checked': '';
    return (
      <li className={noteClassName}>
        <button className="delete" onClick={this.deleteNote.bind(this)}>
          &times;
        </button>
        <input
          type="checkbox"
          readOnly
          checked={this.props.note.checked}
          onClick={this.toggleChecked.bind(this)}
        />
        <span className="text">{this.props.note.text}</span>
      </li>
    );
  }
}
 
Note.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  note: PropTypes.object.isRequired,
};

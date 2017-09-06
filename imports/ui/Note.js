import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
 
// Task component - represents a single todo item
export default class Note extends Component {
  toggleChecked(){
    Meteor.call('notes.setChecked', this.props.note._id, !this.props.note.checked);
  }

  deleteNote(){
    Meteor.call('notes.remove', this.props.note._id);
  }

  togglePrivate() {
    Meteor.call('notes.setPrivate', this.props.note._id, ! this.props.note.private);
  }

  render() {
    const noteClassName = classnames({
      checked: this.props.note.checked,
      private: this.props.note.private,
    });

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
        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.note.private ? 'Private' : 'Public' }
          </button>
        ) : ''}
        <span className="text">
          <strong>{this.props.note.username}</strong>: {this.props.note.text}
        </span>
      </li>
    );
  }
}
 
Note.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  note: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};

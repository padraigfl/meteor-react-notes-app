import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

import { Notes } from "../api/notes.js";

import Note from "./Note.js";
import AccountsUIWrapper from "./AccountsUIWrapper.js";

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('notes.insert', text);

    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted
    });
  }

  renderNotes() {
    let filteredNotes = this.props.notes;
    if (this.state.hideCompleted) {
      filteredNotes = filteredNotes.filter(note => !note.checked);
    }
    return filteredNotes.map((note) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = note.owner === currentUserId;
 
      return (
        <Note
          key={note._id}
          note={note}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>
            Notes ({this.props.incompleteCount})
          </h1>

          <AccountsUIWrapper />

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Notes
          </label>

          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new notes"
              />
            </form> : ''
          }
        </header>
        <ul>
          {this.renderNotes()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  notes: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('notes');
  return {
    notes: Notes.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Notes.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, App);

import React, { Component } from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import { createContainer } from "meteor/react-meteor-data";

import { Notes } from "../api/notes.js";

import Note from "./Note.js";

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
    };
  }
 
  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Notes.insert({
      text,
      createdAt: new Date()
    });

    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderNotes() {
    let filteredNotes = this.props.notes;
    if (this.state.hideCompleted) {
      filteredNotes = filteredNotes.filter(note => !note.checked);
    }
    return filteredNotes.map((note) => (
      <Note key={note._id} note={note} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Notes  ({this.props.incompleteCount})</h1>
 
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Notes
          </label>
 
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>
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
};

export default createContainer(() => {
  return {
    notes: Notes.find({}, {sort: {createdAt: -1}}).fetch(),
    incompleteCount: Notes.find({ checked: { $ne: true } }).count(),
  };
}, App);

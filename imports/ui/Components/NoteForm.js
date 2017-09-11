import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class NoteForm extends Component {
  handleSubmit(event) {
    event.preventDefault();

    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const content = ReactDOM.findDOMNode(this.refs.content).value;

    Meteor.call("notes.insert", title, content);

    ReactDOM.findDOMNode(this.refs.title).value = '';
    ReactDOM.findDOMNode(this.refs.content).value = '';
  }

  render() {
    // Just render a placeholder container that will be filled in
    return (
      <div className="note-overlay">
        <div className="note-form">
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              ref="title"
              placeholder="Give your note a title (optional)"
            />
            <textarea ref="content" placeholder="Enter your note here" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

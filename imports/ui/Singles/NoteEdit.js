import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../../api/notes.js';

// Task component - represents a single todo item
class NoteView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fireReditect: false,
      noteId: this.props.noteId,
    };
  }

  componentWillMount() {
    const note =
      this.props.note !== undefined
        ? this.props.note
        : { title: '', content: '' };
    this.setState({ note });
  }

  handleSubmit(event) {
    event.preventDefault();

    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const content = ReactDOM.findDOMNode(this.refs.content).value;

    if (this.props.noteId === null) {
      let newId = null;
      Meteor.call('notes.insert', title, content, (err, res) => {
        newId = res;
      });
      console.log('new: ' + newId);
      this.setState({ noteId: newId });
    } else {
      Meteor.call('notes.update', this.props.noteId, title, content);
    }

    ReactDOM.findDOMNode(this.refs.title).value = '';
    ReactDOM.findDOMNode(this.refs.content).value = '';

    this.setState({ fireRedirect: true });
  }

  handleChange(event) {
    event.preventDefault();
    const title = ReactDOM.findDOMNode(this.refs.title).value;
    const content = ReactDOM.findDOMNode(this.refs.content).value;
    this.setState({ note: { title, content } });
  }

  render() {
    // Just render a placeholder container that will be filled in
    return (
      <div className='note-overlay'>
        <div className='note-form'>
          <form className='new-task' onSubmit={this.handleSubmit.bind(this)}>
            <input
              className='new-title'
              type='text'
              ref='title'
              placeholder='Give your note a title (optional)'
              value={this.state.note.title}
              onChange={this.handleChange.bind(this)}
            />
            <textarea
              className='new-note'
              ref='content'
              placeholder='Enter your note here'
              value={this.state.note.content}
              onChange={this.handleChange.bind(this)}
            />
            <button className='new-submit' type='submit'>
              Submit
            </button>
            <button className='new-save' type='submit'>
              Save
            </button>
          </form>
          {this.state.fireRedirect &&
            <Redirect to={`/note/${this.state.noteId}`} />}
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
  const noteId = match.params.note_id || null;
  const note = Notes.findOne(noteId);
  return {
    noteId,
    note,
    currentUser: Meteor.user(),
  };
}, NoteView);

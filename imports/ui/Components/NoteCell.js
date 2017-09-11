import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Link } from 'react-router-dom';

// Task component - represents a single todo item
export default class NoteCell extends Component {
  renderSummary() {
    return (
      <div className="note-summary">
        <span className="note-title">
          {this.props.note.title}
        </span>
        {this.props.note.title.length > 0 ? ': ' : ''}
        <span className="note-content">
          {this.props.note.content}
        </span>
      </div>
    );
  }

  render() {
    const noteClassName = classnames({
      checked: this.props.note.checked,
    });

    return (
      <li className={noteClassName}>
        <Link to={`/note/${this.props.note._id}`}>
          {this.renderSummary()}
          <span className="note-date">
            {this.props.note.lastUpdated.toLocaleDateString('en-US')}
          </span>
        </Link>
      </li>
    );
  }
}

NoteCell.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  note: PropTypes.object.isRequired,
};

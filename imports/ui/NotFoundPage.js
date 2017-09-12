import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className='display'>
        PAGE NOT FOUND 
        <br/><br/>
        There's a whole bunch of various issues here at the moment, 
        seems to stem from how meteor subscribes to the server side but if it's a react issue let me know
        <br/><br/>
        This page shouldn't pop up from links clicked on via Meteor. 
        Direct links to index specific pages fail as it renders before subscribing, as do redirects following new submissions

        <br/>

        <Link className='mobile-only' to={`/`}>Back</Link>
      </div>
    );
  }
}

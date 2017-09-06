import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('notes', function notesPublication() {
    return Notes.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'notes.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Notes.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'notes.remove'(noteId) {
    check(noteId, String);

    const note = Notes.findOne(noteId);
    if (note.private && note.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    Notes.remove(noteId);
  },
  'notes.setChecked'(noteId, setChecked) {
    check(noteId, String);
    check(setChecked, Boolean);
  
    const note = Notes.findOne(noteId);
    if (note.private && note.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }
 
    Notes.update(noteId, { $set: { checked: setChecked } });
  },
  'notes.setPrivate'(noteId, setToPrivate) {
    check(noteId, String);
    check(setToPrivate, Boolean);
 
    const note = Notes.findOne(noteId);
 
    // Make sure only the task owner can make a task private
    if (note.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Notes.update(noteId, { $set: { private: setToPrivate } });
  },
});

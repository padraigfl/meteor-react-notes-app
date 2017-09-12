import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/routes/mainroutes.js';

import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app'));
});

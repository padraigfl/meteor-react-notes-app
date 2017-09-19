import React from 'react';
import {
  BrowserRouter,
  Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
// route components
import DraftList from '../ui/DraftList';
import NoteList from '../ui/NoteList.js';
import Greeting from '../ui/Greeting.js';
import NavBar from '../ui/Components/NavBar.js';
import NoteView from '../ui/Singles/NoteView.js';
import NoteEdit from '../ui/Singles/NoteEdit.js';
import NotFoundPage from '../ui/NotFoundPage.js';

import '../../client/style.less';

const browserHistory = createBrowserHistory();

export const renderRoutes = () =>
  <BrowserRouter>
    <div>
      <div className="main">
        <NavBar />
        <Switch>
          <Route name="drafts" exact path="/drafts" component={DraftList} />
          <Route name="notes" component={NoteList} />
        </Switch>
      </div>
      <div>
        <Switch>
          <Route name="greeting" exact path="/" component={Greeting}/>
          <Route name="note" exact path="/note/:note_id" component={NoteView} />
          <Route name="new" exact path="/new" component={NoteEdit} />
          <Route name="edit" exact path="/edit/:note_id" component={NoteEdit} />
          <Route name="notfound" path="/404" component={NotFoundPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>;

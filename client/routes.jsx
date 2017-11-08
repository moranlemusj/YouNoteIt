import React from 'react';
//requires dom as well
import { mount } from 'react-mounter';

import { MainLayout } from './layouts/MainLayout.jsx'
import NotesContainer from './Notes/NotesContainer.jsx';

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: (<NotesContainer />)
    })
  }
});
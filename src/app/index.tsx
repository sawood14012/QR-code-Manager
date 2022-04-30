import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Store, { Context } from './store/store';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';
import { useEffect, useState } from 'react';

const App: React.FunctionComponent = () => (
  <Store>
    <Router>
      <AppLayout>
      <AppRoutes />
      </AppLayout> 
  </Router>
  </Store>
);

export default App;

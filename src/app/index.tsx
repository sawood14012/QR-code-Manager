import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Store from './store/store';
import { Tree } from './Tree/tree';
import { AppLayout } from '@app/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import '@app/app.css';

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

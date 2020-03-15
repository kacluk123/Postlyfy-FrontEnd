import * as React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

function renderWithRouter(
  ui: React.ReactNode,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: {
    route?: string,
    history?: any
  }
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
};

export default renderWithRouter;
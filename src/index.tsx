import React  from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppStore from './store/app';
import AppContext from './utils/context';
import AppApi from './api/app';
import './styles/index.scss'
const store = new AppStore();
const api = new AppApi(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AppContext.Provider value={{store, api}}>
    <App/>
  </AppContext.Provider>
);


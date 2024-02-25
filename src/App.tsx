import { observer } from 'mobx-react';
import React from 'react';
import MainPage from './pages/main.page';
import SavedPage from './pages/users.page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return(
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/allUsers" element={<SavedPage/>} />
      </Routes>
    </Router>
  )
}

export default observer(App);


import { makeStyles } from '@material-ui/core/styles';
import './App.css';

import Header from './components/Header';


import Info from './components/Info';
import HomePage from './components/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const useStyles = makeStyles({
  app:
  {
    backgroundColor: '#14161a',
    minHeight: '100vh',
    color: 'white',
    
  }
})



function App() {

  const classes = useStyles();
  return (
    <BrowserRouter>
    <div className={classes.app}>
        <Header />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/coins/:id' element={<Info />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

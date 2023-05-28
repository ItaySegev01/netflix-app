import './App.scss';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element ={<HomePage/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

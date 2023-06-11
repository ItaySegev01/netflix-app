import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import WatchPage from './pages/WatchPage/WatchPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import Search from './pages/Search/Search';
import MyListPage from './pages/MyListPage/MyListPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer toastStyle={{ backgroundColor: "black" , color : "white"}} position="bottom-center" limit={1} />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/movies" element={<HomePage type="movies" />} />
          <Route exact path="/series" element={<HomePage type="series" />} />
          <Route exact path="/watch/:_id" element={<WatchPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/mylist" element={<MyListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

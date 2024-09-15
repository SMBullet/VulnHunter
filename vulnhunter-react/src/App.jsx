import { Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';
import Navbar from './page/Navbar/Navbar';
import Profile from './page/Profile/Profile';
import NotFound from './page/NotFound/NotFound';
import FirstHome from './page/Home/FirstHome';
import Auth from './page/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './State/Auth/Action';
import ScanHistory from './page/ScanHistory/ScanHistory';
import ScanPage from './page/Scanner/ScanPage';

function App() {
  // Correctly select the auth state from the Redux store
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  console.log(" auth ---- ", auth);

  // Ensure the useEffect runs only when auth.jwt changes
  useEffect(() => {
    const token = auth.jwt || localStorage.getItem("jwt");
    if (token) {
      dispatch(getUser(token));
    }
  }, [auth.jwt, dispatch]);

  return (
    <>
      {auth.user ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/scan-history" element={<ScanHistory />} />
            <Route path="/scanner" element={<ScanPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;

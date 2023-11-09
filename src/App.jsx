import './App.scss';
import Profile from './pages/profile/Profile';
import Search from './pages/search/Search';
import Feed from './pages/feed/Feed';
import ViewPost from './pages/viewpost/ViewPost';
import Notifications from './pages/notifications/Notifications';
import Signin from './pages/home/Signin';
import Signup from './pages/home/Signup';
import Listing from './pages/listing/Listing';
import NewPost from './pages/newpost/NewPost';
import Admin from './pages/admin/Admin';
import AdminLogin from './pages/admin/AdminLogin';

import { UserContext } from './contexts/UserContext';
import { RandomUsersContext } from './contexts/RandomUsers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

function App() {
  //creating state of the user that might be signed in
  const [userData, setUserData] = React.useState({});
  const [randomUsersData, setRandomUsersData] = React.useState({});

  //value that will be passed by context provider
  //it will consist of the state and the function to udpate the state
  const ucvalue = {userData, setUserData};
  const rucvalue = {randomUsersData, setRandomUsersData};
  
  return (
    <div className="App">
      <UserContext.Provider value={ucvalue}>
      <RandomUsersContext.Provider value={rucvalue}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Signin />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/viewpost' element={<ViewPost />} />
            <Route path='/newpost' element={<NewPost />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/search' element={<Search />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/listing' element={<Listing />} />
            <Route path='/admin' element={<AdminLogin />} />
            <Route path='/admin/home' element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </RandomUsersContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;

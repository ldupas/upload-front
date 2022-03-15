import { Routes, Route } from 'react-router-dom';
import UserProvider from './contexts/UserProvider';

import Home from './pages/Home';
import Navbar from './components/navbar/Navbar';
import Register from './components/register/Register';
import AdminRoutes from './components/admin/AdminRoutes';
import AdminPanel from './components/admin/AdminPanel';
import Disconnect from './components/disconnect/Disconnect';
import Login from './components/login/Login';
import AddPost from './components/posts/AddPost';

import './App.css';
import PostList from './components/posts/PostList';



function App() {
  return (
    <div className="App">
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/disconnect" element={<Disconnect />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/readpost" element={<PostList />} />
        <Route path="/admin" element={<AdminRoutes />}>
          <Route element={<AdminPanel />} />
        </Route>  
      </Routes>
    </UserProvider>
    </div>
  );
}

export default App;

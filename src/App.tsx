import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import About from './components/About';
import { RecoilRoot } from 'recoil';
import Logout from './components/Logout';

function App() {

  return (
    <BrowserRouter>
      <RecoilRoot>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import About from './pages/About';
import ExtractInfo from './pages/ExtractInfo';
import LicensePlateExtractor from './pages/LicensePlateExtractor';
import HelloUser from './pages/HelloUser';
import DefaultPage from './pages/DefaultPage';
import Theme from './themes/theme';

const App = () => (
  <Theme>
    <Router>
      <div id="root" className="content">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/extract-info" element={<ExtractInfo />} />
            <Route path="/license-plate-extractor" element={<LicensePlateExtractor />} />
            <Route path="/hello-user" element={<HelloUser />} />
            <Route path="*" element={<h1>404: Page Not Found</h1>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  </Theme>
);

export default App;

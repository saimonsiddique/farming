import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Sidebar from './components/Sidebar';
import Landingpage from './pages/Landingpage';
import ProjectsPage from './pages/ProjectsPage';
import LandsPage from './pages/LandsPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <div className="flex">
                <Sidebar />
                <Landingpage />
              </div>
            </div>
          }
        ></Route>
        <Route
          path="/lands"
          element={
            <div className="App">
              <div className="flex">
                <Sidebar />
                <LandsPage />
              </div>
            </div>
          }
        ></Route>
        <Route
          path="/projects"
          element={
            <div className="App">
              <div className="flex">
                <Sidebar />
                <ProjectsPage />
              </div>
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <NavigationBar />
    //   <div className="flex">
    //     <Sidebar />
    //     <Landingpage />
    //   </div>
    // </div>
  );
}

export default App;

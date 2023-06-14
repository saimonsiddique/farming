import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Sidebar from "./components/Sidebar";
import ProjectsPage from "./pages/ProjectsPage";
import LandsPage from "./pages/LandsPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <NavigationBar />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <div className="flex px-36  bg-purple-50">
                <Sidebar />
                <div className="px-2 pt-5">
                  <LandsPage />
                </div>
              </div>
            </div>
          }
        ></Route>
        <Route
          path="/projects"
          element={
            <div className="App">
              <div className="flex px-36  bg-purple-50">
                <Sidebar />
                <ProjectsPage />
              </div>
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

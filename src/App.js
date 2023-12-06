import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components - Layout
import Header from "./shared/Header";
import Sidebar from "./shared/Sidebar";
import Footer from "./shared/Footer";

import { Routes } from "./auth/Routes";
function App() {
 
  return (
    
      <BrowserRouter>
        <Header />

        <div className="flex">
          <Sidebar />
          <div className="mainOptions">
            <Routes />
          </div>
        </div>

        <Footer />
      </BrowserRouter>
   
  );
}

export default App;

import { Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import CountryDetail from "./components/CountryDetail/CountryDetail";
import HomePage from "./components/HomePage/HomePage";
import ActivityCreate from "./components/ActivityCreate/ActivityCreate";
import VerActivity from "./components/VerActivity/VerActivity";
import EditAct from "./components/EditAct/EditAct";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/home/:id" element={<CountryDetail />} />
        <Route exact path="/home/createact" element={<ActivityCreate />} />
        <Route exact path="/veract" element={<VerActivity />} />
        <Route exact path="/updateact/:id" element={<EditAct />} />
        <Route path="*" element={
            <main>
              <p>No se encontro la ruta buscada</p>
            </main>
            }
        />
      </Routes>
    </div>
  );
}

export default App;


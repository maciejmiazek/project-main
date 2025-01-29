import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Planning from "./components/Planning";
import Workers from "./components/Workers";
import Machines from "./components/Machines";
import NoPage from "./components/NoPage";
import "./App.css";

const Magazyn = () => <h2>Magazyn</h2>;
const Finanse = () => <h2>Finanse</h2>;

function App() {
  return (
    <Routes>
      {/* Po zalogowaniu używamy Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Planning />} />
        <Route path="planowanie" element={<Planning />} />
        <Route path="pracownicy" element={<Workers />} />
        <Route path="maszyny" element={<Machines />} />
        <Route path="magazyn" element={<Magazyn />} />
        <Route path="finanse" element={<Finanse />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
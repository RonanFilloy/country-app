import { Routes, Route } from "react-router-dom";
import CountryList from "./pages/CountryList";
import CountryInfo from "./pages/CountryInfo";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/:country/:countryCode" element={<CountryInfo />} />
        <Route path="*" element={<CountryList />} />
      </Routes>
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";

//Components
import { Header } from "./components/Header";

// pages
import { Homepage } from "./pages/Homepage";
import Gamepage from "./pages/Gamepage";

function App() {
  return (
    <>
      <Header />
      <Homepage />
    </>
  );
}

export default App;

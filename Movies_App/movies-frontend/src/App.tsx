import Footer from "./Footer";
import Menu from "./Menu";
import Router from "./Routes/Router";
import { routes } from "./Routes/route-config";
import "./App.css";
import configureValidations from "./Validation";

configureValidations();
function App() {
  return (
    <>
      <Menu />
      <div className="container">
        <div className="router-container">
          <Router routes={routes} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;

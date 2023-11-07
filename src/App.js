import Error404 from "containers/errors/Error404";
import Home from "containers/pages/Home";
import ValidarArchivos from "containers/pages/ValidarArchivos"
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import store from "store";
import { Provider } from "react-redux";
import BuscarQueries from "containers/pages/BuscarQueries";
import Secreto from "containers/pages/Secreto";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AnimatedRoutes from "Routes";

function App() {
  
  return (
    <HelmetProvider>
      <Helmet>
        <title>AIET | Portal de procesamiento de la información</title>
      </Helmet>
      <Provider store={store}>
        <Router>
          <AnimatedRoutes />         
        </Router>
      </Provider>
    </HelmetProvider>
    );
}

export default App;

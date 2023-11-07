import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Error404 from "containers/errors/Error404";
import Home from "containers/pages/Home";
import ValidarArchivos from "containers/pages/ValidarArchivos"
import BuscarQueries from "containers/pages/BuscarQueries";
import Secreto from "containers/pages/Secreto";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes(){
    const location = useLocation()
    return(
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            {/* Error display */}
            <Route path="*" element={<Error404 />} />
            {/* Home display */}
            <Route path="/" element={<Home />} />
            {/* Validador de archivos */}
            <Route path="/validador" element={<ValidarArchivos />} />
            {/* Home display */}
            <Route path="/busqueda" element={<BuscarQueries />} />

            {/* Sistema secreto */}
            <Route path="/secreto" element={<Secreto />} />

          </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
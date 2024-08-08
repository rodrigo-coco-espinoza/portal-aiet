import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Error404 from "containers/errors/Error404";
import Home from "containers/pages/Home";
import ValidarArchivos from "containers/pages/ValidarArchivos"
import BuscarQueries from "containers/pages/BuscarQueries";
import { AnimatePresence } from "framer-motion";
import User from "containers/pages/User";
import PcIsla from "containers/pages/PcIsla";
import Convenios from "containers/pages/Convenios";


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
            {/* Buscador de Queries */}
            <Route path="/busqueda" element={<BuscarQueries />} />
            {/* PC Isla */}
            <Route path="/pc_isla" element={<PcIsla />} />
            {/* Login usuarios */}
            <Route path="/usuarios" element={<User />} />

            {/* Sistema de convenios */}
            <Route path="/convenios" element={<Convenios />} />

          </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
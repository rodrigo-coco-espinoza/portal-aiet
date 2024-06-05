import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from 'framer-motion'
import Footer from "components/navigation/Footer";
import Calendar from "components/pc_isla/Calendar";
import ProyectosActivos from "components/pc_isla/ProyectosActivos";
import { connect } from "react-redux";
import { get_instituciones_options, get_encargados_pc_isla_options, get_proyectos, get_jornadas_minhacienda } from "redux/actions/pc_isla/pc_isla";
import { Alert } from "@material-tailwind/react";

function PcIsla({
    institucionesOptions,
    get_instituciones_options,
    get_encargados_pc_isla_options,
    get_proyectos,
    get_jornadas_minhacienda,
}){
    useEffect(() => {
        window.scrollTo(0,0);
        get_instituciones_options()
        get_encargados_pc_isla_options()
        get_proyectos()
        get_jornadas_minhacienda()
    }, [])

    return (

        <Layout>
            <Helmet>
                <title>AIET | Administrador de PC Isla</title>
            </Helmet>

            <Navbar />
            <div className="flex justify-center items-center sm-sii:px-20 px-10">
                <div className="lg-sii:max-w-[1280px] w-full sm:my-20 my-28">
                    <div className="flex flex-col sm:py-16 py-6">
                        <div className="flex-col flex items-start mb-8">
                        <motion.div 
                            initial={{opacity: 0, transition: {duration: 1}}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0, transition: {duration: 0}}}
                            className="w-full"
                        >
                            <h2 className='font-semibold sm:text-[44px] text-[40px] text-azul-brillante-400 sm-sii:leading-[76.8px] leading-[66.8px] w-full cursor-default'>Administrador de PC Isla</h2>
                            <Calendar />
                            <ProyectosActivos
                            />
                        </motion.div>
                                </div>
                            </div>
                        </div>           
                    </div>
                        
            <Footer />

                  
        </Layout>
    )

}

const mapStateToProps = state =>({
    institucionesOptions: state.institucion_reducer.institucionesOptions
})

export default connect(mapStateToProps, {
    get_instituciones_options,
    get_encargados_pc_isla_options,
    get_proyectos,
    get_jornadas_minhacienda
})(PcIsla);
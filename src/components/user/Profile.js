import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import Layout from "hocs/layouts/Layout"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { connect } from "react-redux"
import { logout } from "redux/actions/auth/auth"
import { get_queries } from "redux/actions/queries/queries"
import ModalPassword from "./ModalPassword"
import Query from "./Query"
import { PlusIcon } from "@heroicons/react/20/solid"
import { Tooltip } from "react-tooltip"
import ModalAgregar from "./ModalAgregar"
import AsistenciaPcIsla from "./AsistenciaPcIsla"


function Profile({
    logout,
    isAuthenticated,
    loading,
    user,
    queries,
    get_queries
}){

    useEffect(() => {
        window.scrollTo(0,0)
        get_queries()
    }, [])


    const [showModalPassword, setShowModalPassword] = useState(false)   
    const openModalPassword = () => {
        console.log("abriendo modal")
        setShowModalPassword(true);
    }

    const handleClickPassword = () => {
        setShowModalPassword(false)
    }

    const [showModalAgregar, setShowModalAgregar] = useState(false)
    const handleClickAgregar = () => {
        setShowModalAgregar(false)
    }

   
    const LogOut = () =>{
        logout()
        window.location.href = '/'
    }
 
        return (
            <Layout>
            <Helmet>
                <title>AIET | Página de usuario</title>
            </Helmet>
            
            <Navbar />
            <motion.div 
            initial={{opacity: 0, transition: {duration: 1}}}
            animate={{opacity: 1}}
            exit={{opacity: 0, transition: {duration: 0}}}
            className="pt-28 px-16 lg-sii:mx-64 md-sii:mx-40 sm-sii:mx-16 mt-8">

            <div className="flex min-h-full items-center justify-center py-12">
                <div className="w-full space-y-8 rounded-xl pb-8 shadow-lg bg-white">
                    <div className="">
                        <h2 className="mt-6 text-center text-2xl md-siii:text-3xl font-bold tracking-tight text-gris-800 border-b-2 border-gris-500 ">
                        Bienvenido/a
                        </h2>
                        <div className="flex flex-col items-center mt-5 max-w-[280px] md:max-w-xs mx-auto px-4">
                            <button
                                onClick={openModalPassword}
                                className="w-full text-white bg-azul-cobalto-400 hover:bg-azul-cobalto-300 focus:outline-none focus:ring-2 focus:ring-azul-cobalto-400 focus:ring-offset-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4"
                            >
                                Cambiar contraseña
                            </button>
                            <button
                                onClick={LogOut}
                                className="w-full text-white bg-naranja-400 hover:bg-naranja-300 focus:outline-none focus:ring-2 focus:ring-naranja-400 focus:ring-offset-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            

            { (user && (user.is_pc_isla_admin || user.is_pc_isla_investigador)) && 
                <AsistenciaPcIsla />
            }


            { (user && (user.is_buscador_admin || user.is_buscador_editor)) && <>
            <div className="flex items-end">
                <span className="w-full mt-6 text-2xl font-bold tracking-tight text-gris-800 border-b-2 border-gris-500 ">
                        Gestionar queries 
                </span>
                <div className="ml-auto">
                <a 
                    className="anchor-agregar"
                    onClick={() => setShowModalAgregar(true)}>      
                    <PlusIcon className="h-8 w-8 text-gris-600 hover:text-verde-esmeralda-400 inline border-b-2 border-gris-500" />
                </a>
                <Tooltip key="tooltipAgregar" anchorSelect=".anchor-agregar" place="top">Agregar</Tooltip>
                </div>
            </div>
            
            <div>
                {queries.map((query)=> (
                    <>{(user && (user.is_buscador_admin || query.author.id === user.id)) && 
                        <Query
                            key={`query_${query.id}`}
                            query={query && query}           
                        />

                    }</>
                )) }
            </div>
                
            </>}

            <ModalPassword 
                active={showModalPassword}
                closeModal={handleClickPassword}
            />
            <ModalAgregar
                active={showModalAgregar}
                closeModal={handleClickAgregar}
            />

            </motion.div>
            <Footer />
            

        </Layout>
    )

    }


const mapStateToProps = state => ({
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.auth.loading,
        user: state.auth.user,
        queries: state.queries.queries
    })

export default connect (mapStateToProps, {
    logout,
    get_queries
} )(Profile)
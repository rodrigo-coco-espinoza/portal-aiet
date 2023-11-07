import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import Layout from "hocs/layouts/Layout"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'

function ValidarArchivos(){
    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return (
        <Layout>
            <Helmet>
                <title>AIET | Validador de archivos</title>
            </Helmet>
            <Navbar 
                validador={true}
            />
            
            <motion.div
                initial={{opacity: 0, transition: {duration: 1}}}
                animate={{opacity: 1}}
                exit={{opacity: 0, transition: {duration: 0}}}
                className="pt-28">
                    <h1 className="font-bold text-gris-900 text-4xl">Validador de archivos</h1>
                    <p className="text-gris-600 text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </motion.div>
            
            <Footer />      
        </Layout>
    )
}

export default ValidarArchivos
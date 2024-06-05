import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import Layout from "hocs/layouts/Layout"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import ConveniosMain from "components/convenios/ConveniosMain"


function Convenios(){

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])


    return (

        <Layout>
            <Helmet>
                <title>AIET | Sistema de Convenios</title>
            </Helmet>

            <Navbar />
            <div className="flex justify-center items-center sm-sii:px-20 px-10">
                <div className="lg-sii:max-w-[1280px] w-full sm:my-20 my-28">
                    <div className="flex flex-col sm:py-16 py-6">
                        <div className="flex-col flex items-start mb-8 cursor-default">
                        <motion.div 
                            initial={{opacity: 0, transition: {duration: 1}}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0, transition: {duration: 0}}}
                            className="w-full"
                        >                            
                            <ConveniosMain />
                        </motion.div>
                                </div>
                            </div>
                        </div>           
                    </div>
                        
            <Footer />

                  
        </Layout>


    )
}

export default Convenios
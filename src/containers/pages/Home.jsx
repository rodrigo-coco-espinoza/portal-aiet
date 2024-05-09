import Buscador from "components/home/Buscador"
import Hero from "components/home/Hero"
import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import Layout from "hocs/layouts/Layout"
import Validador from "components/home/Validador"
import { useEffect } from "react"
import { motion } from 'framer-motion'
import Isla from "components/home/Isla"

function Home(){

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])


    return (
        <Layout>
            <div className="w-full overflow-hidden">
                <div className="sm:px-16 px-6 flex justify-center items-center">
                        <Navbar />
                </div>

                <motion.div
                    initial={{opacity: 0, transition: {duration: 1}}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0, transition: {duration: 0}}}
                    >
                    <div className="flex justify-center items-center">
                        <div className="lg:max-w-[1280px] w-full sm-sii:my-16 my-24 sm-sii:px-10">
                            <Hero />
                        </div>           
                    </div>
                    <div className="bg-gris-400">
                        <div className="sm:px-16 px-6 flex justify-center items-start">
                            <div className="xl:max-w-[1280px] w-full">
                                <Buscador />  
                            </div>
                        </div>
                    </div>

                    <div className="sm:px-16 px-6 flex justify-center items-start">
                        <div className="xl:max-w-[1280px] w-full">
                            <Isla />  
                        </div>
                    </div> 
                    
                    <div className="bg-gris-400">
                        <div className="sm:px-16 px-6 flex justify-center items-start">
                            <div className="xl:max-w-[1280px] w-full">
                                <Validador />  
                            </div>
                        </div> 
                    </div>
                </motion.div>

                <Footer />   
            </div>
        </Layout>
    )
}

export default Home
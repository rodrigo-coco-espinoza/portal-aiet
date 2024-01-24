
import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import DetalleConvenio from "components/secreto/Convenios/DetalleConvenio"
import InfoInstitucion from "components/secreto/Convenios/InfoInstitucion"
import ResumenConvenios from "components/secreto/Convenios/ResumenConvenios"
import TabsInstitucion from "components/secreto/Convenios/TabsInstitucion"
import Timeline from "components/secreto/Timeline"
import Layout from "hocs/layouts/Layout"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"


function Secreto(){

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])


    return (
        <Layout>
            <Helmet>
                <title>AIET | Convenios</title>
            </Helmet>
            <div className="w-full overflow-hidden">
                <div className="sm:px-16 px-6 flex justify-center items-center">
                        <Navbar />
                </div>
                <div className="flex justify-center items-center">
                    <div className="xl:max-w-[1280px] w-full sm:my-16 my-28">
                        <div className="flex flex-col sm:py-16 py-6">
                            <div className="flex-col flex items-start xl:px-0 sm:px-16 px-6 mb-8">
                                <InfoInstitucion />
                            </div>

                            <div className="flex-col flex items-start xl:px-0 sm:px-16 px-6 mb-8 w-full">
                                <TabsInstitucion />
                            </div>
                        </div>
                    </div>           
                </div>
            </div>
            <Footer />             
        </Layout>
    )
}

export default Secreto
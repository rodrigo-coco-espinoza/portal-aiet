
import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
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
                <title>AIET | Secreto</title>
            </Helmet>
            <div className="w-full overflow-hidden">
                <div className="sm:px-16 px-6 flex justify-center items-center">
                        <Navbar />
                </div>
                <div className="flex justify-center items-center">
                    <div className="xl:max-w-[1280px] w-full sm:my-16 my-6">
                        <main className="flex md:flex-row flex-col sm:py-16 py-6 mb-10">
                            <div className="flex-1 basis-1/5 flex justify-center items-start flex-col xl:px-0 sm:px-16 px-6 mx-auto">
                                <Timeline />
                            </div>
                        </main>
                    </div>           
                </div>
                <Footer />             
            </div>
        </Layout>
    )
}

export default Secreto
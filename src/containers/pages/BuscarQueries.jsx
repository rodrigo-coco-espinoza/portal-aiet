import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import Layout from "hocs/layouts/Layout"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { get_queries, get_combobox } from "redux/actions/queries/queries"
import { connect } from "react-redux"
import ComboboxQuery from "components/buscador/Combobox"

function BuscarQueries({
    get_queries,
    queries,
    get_combobox,
    combobox
}){

    useEffect(() => {
        window.scrollTo(0,0)
        get_queries()
        get_combobox()
    }, [])


    return (
        <Layout>
            <Helmet>
                <title>AIET | Buscador de queries</title>
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
                            <h2 className='font-semibold sm-sii:text-[44px] text-azul-brillante-400 text-[40px] sm-sii:leading-[76.8px] leading-[66.8px]'>Buscador de queries</h2>
                            <p className="text-gris-600 text-xl">En esta sección podrás consultar, editar y agregar nuevas queries para la extracción de datos.</p>
                            <ComboboxQuery
                                key={'combobox_queries'}
                                options={combobox && combobox} 
                                queryData={queries && queries}
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

const mapStateToProps = state => ({
    queries: state.queries.queries,
    combobox: state.queries.options
})
export default connect (mapStateToProps, {
    get_queries,
    get_combobox
} )(BuscarQueries)
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
                <motion.div 
                initial={{opacity: 0, transition: {duration: 1}}}
                animate={{opacity: 1}}
                exit={{opacity: 0, transition: {duration: 0}}}
                className="pt-28 px-16">
                    <h2 className='font-semibold sm:text-[44px] text-azul-brillante-400 text-[40px] xs:leading-[76.8px] leading-[66.8px] w-full'>Buscador de queries</h2>
                    <p className="text-gris-600 text-xl">En esta sección podrás consultar, editar y agregar nuevas queries para la extracción de datos.</p>

                    <ComboboxQuery
                        key={'combobox_queries'}
                        options={combobox && combobox} 
                        queryData={queries && queries}
                    />

                    


                </motion.div>
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
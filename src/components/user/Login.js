import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import Layout from "hocs/layouts/Layout"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { connect } from "react-redux"
import { MusicalNoteIcon } from '@heroicons/react/20/solid'
import { login } from "redux/actions/auth/auth"


function Login({
    login,
    isAuthenticated,
    loading
}){
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const {
        email,
        password
    } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        login(email, password)
    }

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])
 
        return (
            <Layout>
                <Helmet>
                    <title>AIET | Iniciar sesión</title>
                </Helmet>

                <Navbar />
                <motion.div 
                initial={{opacity: 0, transition: {duration: 1}}}
                animate={{opacity: 1}}
                exit={{opacity: 0, transition: {duration: 0}}}
                className="pt-28 px-16">

                    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 rounded">
                        <div className="w-full max-w-md space-y-8  rounded-xl pb-8 px-8 shadow-lg bg-white">
                            <div>
                                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gris-900">
                                Inicia sesión con tu cuenta
                                </h2>
                            </div>
                            <form onSubmit={e=>{onSubmit(e)}} className="mt-8 space-y-6" action="#" method="POST">
                                <input type="hidden" name="remember" defaultValue="true" />
                                <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                    Correo electrónico
                                    </label>
                                    <input
                                    id="email-address"
                                    name="email"
                                    value={email}
                                    type="email"
                                    onChange={e=>onChange(e)}
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gris-300 px-3 py-2 text-gris-900 placeholder-gris-600 focus:z-10 focus:border-naranja-300 focus:outline-none focus:ring-naranja-300 sm:text-sm"
                                    placeholder="Correo electrónico"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                    Contraseña
                                    </label>
                                    <input
                                    id="password"
                                    name="password"
                                    value={password}
                                    type="password"
                                    onChange={e=>onChange(e)}
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gris-300 px-3 py-2 text-gris-900 placeholder-gris-600 focus:z-10 focus:border-naranja-300 focus:outline-none focus:ring-naranja-300 sm:text-sm"
                                    placeholder="Contraseña"
                                    />
                                </div>
                                </div>

                                <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gris-300 text-gris-300 focus:ring-gris-300"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gris-900">
                                    Recuérdame <MusicalNoteIcon className="inline w-4 h-4 mb-1 text-gris-700"/>
                                    </label>
                                </div>

                                {/* <div className="text-sm">
                                    <a href="#" className="font-medium text-púrpura-400 hover:text-púrpura-300">
                                    ¿Olvidaste tu contraseña?
                                    </a>
                                </div> */}
                                </div>

                                <div>
                                <button
                                    type="submit"
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-naranja-300 py-2 px-4 text-sm font-medium text-white hover:bg-naranja-400 focus:outline-none focus:ring-2 focus:ring-naranja-400 focus:ring-offset-2"
                                >
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    </span>
                                    Ingresar
                                </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </motion.div>
                <Footer />

                    
            </Layout>
        )
    }


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
})
export default connect (mapStateToProps, {
    login
} )(Login)
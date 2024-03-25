import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import Layout from "hocs/layouts/Layout"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { motion } from 'framer-motion'
import { connect } from "react-redux"
import { logout } from "redux/actions/auth/auth"
import Login from "components/user/Login"
import Profile from "components/user/Profile"


function User({
    isAuthenticated,
    loading,
    user,
    logout
}){
   
    useEffect(() => {
        window.scrollTo(0,0)
    }, [])  

    if (isAuthenticated){
        return(<Profile />) 
   } else {  
        return (<Login />)
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    user: state.auth.user
})
export default connect (mapStateToProps, {
    logout
} )(User)
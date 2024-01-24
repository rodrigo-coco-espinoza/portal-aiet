import { useEffect } from "react";
import { connect } from "react-redux";
import { check_aunthenticated, load_user, refresh } from "redux/actions/auth/auth";


function Layout({
    children,
    refresh,
    check_aunthenticated,
    load_user,
    user_loading,
    isAuthenticated,
    user,
}){

    useEffect(() => {
        isAuthenticated ? <></> :
        <>

        {refresh()}
        {check_aunthenticated()}
        {load_user()}
        </>
    }, [])

    return(
        <div className="min-h-screen bg-gris-100">
            {children}
        </div>
    )
}

const mapStateToProp = state => ({
    user_loading: state.auth.user_loading,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProp, {
    refresh,
    check_aunthenticated,
    load_user,
}) (Layout)
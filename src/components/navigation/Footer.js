import { connect } from "react-redux"

function Footer(){
    return(
        <nav className="w-full py-3 bg-azul-marino-400">
            <p className="text-gris-500 text-center text-white">Área de Información y Estadística Tributaria<br />Subdirección de Gestión Estratégica y Estudios Tributarios</p>
        </nav>
    )
}

const mapStateToProp = state => ({

})

export default connect(mapStateToProp, {

}) (Footer)
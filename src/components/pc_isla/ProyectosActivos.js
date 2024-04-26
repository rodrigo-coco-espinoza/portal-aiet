import { PlusIcon } from "@heroicons/react/20/solid"
import { Tooltip } from "react-tooltip"
import ProyectoCard from "./ProyectoCard";
import { useEffect, useState } from "react";
import ModalAgregarProyecto from "./ModalAgregarProyecto";
import { Alert } from "@material-tailwind/react";
import { connect } from "react-redux";
import ModalDetalleProyecto from "./ModalDetalleProyecto";
import { get_bloques_ocupados, get_jornadas_minhacienda } from "redux/actions/pc_isla/pc_isla";

function ProyectosActivos({
    proyectosPcIsla,
    user,
    get_bloques_ocupados,
    get_jornadas_minhacienda,

}){

    useEffect(() => {
        get_jornadas_minhacienda();
        if (user && (user.is_pc_isla_admin || user.is_pc_isla_editor)) {
            get_bloques_ocupados();
            
        }
        
    }, []);

    // Funciones Modal Agregar Proyecto
    const [showModalAgregarProyecto, setShowModalAgregarProyecto] = useState(false);
    const handleClickAgregar = () => {
        setShowModalAgregarProyecto(false);
    }
    // Alert nuevo proyecto
    const [showAlertNuevoProyecto, setShowAlertNuevoProyecto] = useState(false);
    const [nombreNuevoProyecto, setnombreNuevoProyecto] = useState("");
    const openAlertNuevoProyecto = (nombreProyecto) => {
        setnombreNuevoProyecto(nombreProyecto);
        setShowAlertNuevoProyecto(true);
    };

    // Alert proyecto rechazado
    const [showAlertProyectoRechazado, setShowAlertProyectoRechazado] = useState(false);
    const [nombreProyectoRechazado, setNombreProyectoRechazado] = useState(""); 
    const openAlertProyectoRechazado = (nombreProyecto) => {
        setNombreProyectoRechazado(nombreProyecto);
        setShowAlertProyectoRechazado(true);
    }

    return(
        <>  
            
            <div className="flex items-end mt-10 mb-8 ">
                <span className="w-full font-bold text-gris-700 text-4xl border-b-2 border-gris-500 cursor-default">
                        Proyectos activos
                </span>
                { (user && (user.is_pc_isla_admin || user.is_pc_isla_editor)) && 
                <div className="ml-auto">
                <a 
                    className="anchor-agregar cursor-pointer"
                    onClick={() => setShowModalAgregarProyecto(true)}
                >      
                    <PlusIcon className="h-8 w-8 text-gris-600 hover:text-verde-esmeralda-400 inline border-b-2 border-gris-500" />
                </a>
                <Tooltip key="tooltipAgregar" anchorSelect=".anchor-agregar" place="top">Agregar proyecto</Tooltip>
                </div>
                }
            </div>
            {/* Alert proyecto rechazado */}
            <Alert
                open={showAlertProyectoRechazado}
                onClose={() => setShowAlertProyectoRechazado(false)}
                onClick={(e) => e.stopPropagation()}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                }}
                className="relative max-w-[28rem] sm-sii:max-w-[40rem] transform -top-4 z-50 bg-verde-esmeralda-300 mx-auto"
            >
                {nombreProyectoRechazado} eliminado de la lista proyectos de activos.
            </Alert>
            {/* Alert nuevo proyecto */}
            <Alert
                open={showAlertNuevoProyecto}
                onClose={() => setShowAlertNuevoProyecto(false)}
                onClick={(e) => e.stopPropagation()}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                }}
                className="relative max-w-[28rem] sm-sii:max-w-[40rem] transform -top-4 z-50 bg-verde-esmeralda-300 mx-auto"
            >
                Proyecto {nombreNuevoProyecto} agregado exitosamente.
            </Alert>

            <div className="flex flex-wrap -mx-4">
                {proyectosPcIsla.map((institucion) => (
                    institucion.proyectos
                    .filter((proyecto) => proyecto.estado !== "finalizado" && proyecto.estado !== "rechazado")
                    .map((proyecto) => (
                        <div key={`div_${proyecto.id}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-4">
                        <ProyectoCard
                            key={proyecto.id}
                            data={proyecto}
                            institucion={{
                                id: institucion.id_institucion, 
                                nombre: institucion.nombre_institucion, 
                                sigla: institucion.nombre_sigla
                                }}
                            showAlertRechazado={openAlertProyectoRechazado}
                        />
                        </div>
                    ))
                ))}
            </div>

            <ModalAgregarProyecto 
                active={showModalAgregarProyecto}
                closeModal={handleClickAgregar}
                showAlertNuevo={openAlertNuevoProyecto}
            />
            
        </>
    )
}

const mapStateToProps = state => ({
    proyectosPcIsla: state.institucion_reducer.proyectosPcIsla,
    user: state.auth.user,
})
export default connect (mapStateToProps, {
    get_bloques_ocupados,
    get_jornadas_minhacienda
} )(ProyectosActivos)

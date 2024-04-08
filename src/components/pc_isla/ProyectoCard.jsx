import { useState } from "react";
import ModalDetalleProyecto from "./ModalDetalleProyecto";

function ProyectoCard({data, institucion, showAlertRechazado}){

    // Funciones Modal Detalle Proyecto
    const [showModalDetalleProyecto, setShowModalDetalleProyecto] = useState(false);
    const handleClickCerrarDetalle = () => {
        setShowModalDetalleProyecto(false);
    }
    const openDetalleProyecto = () => {
        setShowModalDetalleProyecto(true)
    }
    const alertRechazado = (nombreProyecto) => {
        showAlertRechazado(nombreProyecto);
    }


    return (
        
    <>
        <div className="max-w-sm p-6 bg-white border border-gris-300 rounded-lg shadow h-full flex flex-col">
            <h5 className="mb-0 text-2xl font-bold tracking-tight text-gris-800 cursor-default">{institucion.sigla}</h5>
            <p className="mb-4 font-normal text-gris-700 cursor-default">{data.nombre}</p>
            <p className="mb-1 font-normal text-sm text-gris-600 cursor-default">Encargado: {data.encargado_sii.nombre}</p>
            <p className="mb-1 font-normal text-sm text-gris-600 cursor-default">Estado: {data.estado}</p>
            <p className="mb-1 font-normal text-sm text-gris-600 cursor-default">TODO Investigador: Solo si hay, puede ser mas de uno</p>
            <p className="mb-1 font-normal text-sm text-gris-600 cursor-default">TODO Jornada: Bora Bora Lun AM Jue PM</p>
            <p className="mb-5 font-normal text-sm text-gris-600 cursor-default">TODO Fecha de término: 15-04-2024</p>
            <button  
                className="mt-auto w-[120px] inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-azul-brillante-400 rounded-lg hover:bg-azul-marino-300"
                onClick={openDetalleProyecto}
            >
                Ver detalle
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
        </div>
        <ModalDetalleProyecto 
            active={showModalDetalleProyecto}
            closeModal={handleClickCerrarDetalle}
            institucion={institucion}
            proyecto={data}
            showAlertRechazado={alertRechazado}
        />
    </>

    )
}

export default ProyectoCard;
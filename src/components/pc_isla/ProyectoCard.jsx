import { useState } from "react";
import ModalDetalleProyecto from "./DetalleProyecto/ModalDetalleProyecto";

function ProyectoCard({
    data, institucion, 
    showAlertRechazado,
    informProyectoFinalizado,
})
{

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

    // Jornadas
    const dias = ['Lun', 'Mar', 'Mier', 'Jue', 'Vie'];

    const jornada_text = () => {
        let text = [];
        if (Object.keys(data.jornada).length !== 0) {
            for (let i = 0; i < 5; i++) {
                if (data.jornada.AM[i] || data.jornada.PM[i]) {
                    text.push(`${dias[i]} ${data.jornada.AM[i] ? 'AM' : ''} ${data.jornada.PM[i] ? 'PM' : ''}`)
                }
            }
        } else {
            text.push('Sin jornada asignada')
        }

        return text;
    };

    // Proyecto finalizado
    const alertProyectoFinalizado = (proyecto, institucion) => {
        informProyectoFinalizado(proyecto, institucion);
    };


    return (
        
    <>
        <div className="max-w-sm p-6 bg-white border border-gris-300 rounded-lg shadow h-full flex flex-col">
            <h5 className="mb-0 text-2xl font-bold tracking-tight text-gris-800 cursor-default">{institucion.sigla}</h5>
            <p className="mb-4 font-normal text-gris-700 cursor-default">{data.nombre} (cód: {data.id})</p>
            <p className="mb-1 font-normal text-sm text-gris-600 cursor-default">Encargado: {data.encargado_sii.nombre_completo}</p>
            <p className="mb-1 font-normal text-sm text-gris-600 cursor-default">Estado: {data.estado}</p>
            { data.protocolo && (
                <>
                <div className="mb-1 font-normal text-sm text-gris-600 cursor-default flex flex-row">
                    <span>Investigador/es:</span>
                    <div className="ml-1 ">
                    {
                        data.investigadores.map((investigador, index) => (
                            <span className="line-clamp-1" key={index}>{investigador.nombre_completo}<br/></span>
                        ))
                    }
                    </div> 
                </div>
                <p className="mb-1 font-normal text-sm text-gris-600 cursor-default">Equipo: {data.equipo}</p>
                <p className="mb-1 font-normal text-sm text-gris-600 cursor-default">Usuario: {data.usuario_equipo}</p>
                <div className="mb-1 font-normal text-sm text-gris-600 cursor-default flex flex-row">
                    <span>Jornada/s:</span>
                    <div className="ml-1">
                    {
                        jornada_text().map((jornada, index) => (
                            <span key={index}>{jornada}<br/></span>
                        ))
                    }
                    </div> 
                </div>
                
                <p className="mb-5 font-normal text-sm text-gris-600 cursor-default">Fecha de término: <br className='sm-sii:hidden'/> <span className={`${data.pronto_a_terminar ? 'text-red-400' : 'text-gris-600'}`}>{data.formatted_fecha_termino} {data.extendido ? '(extendido)' : ''}</span></p>
                </>
            )
            }
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
            alertProyectoFinalizado={alertProyectoFinalizado}
        />
    </>

    )
}

export default ProyectoCard;
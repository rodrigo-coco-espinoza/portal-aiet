import { DocumentArrowDownIcon, DocumentTextIcon, PrinterIcon } from "@heroicons/react/20/solid";
import ComboboxSelect from "../formularios/ComboboxSelect";
import { Tooltip } from "react-tooltip";
import InformeAsistenciaMensual from "./Informes/AsistenciaMensual/InformeAsistenciaMensual";
import { useRef, useState } from "react";
import html2pdf from 'html2pdf.js';
import ReactToPrint from "react-to-print";
import { connect } from "react-redux";
import axios from "axios";
import { informe_asistencia } from "redux/actions/pc_isla/pc_isla";


function EstadsiticasUso({
    idProyecto,
    data,
    user,
    informe_asistencia
}){

    // Informe
    const componentRef = useRef();

    const [contenidoInforme, setContenidoInforme] = useState(false);

    const [mesInforme, setMesInforme] = useState();

    const [documentTitle, setDocumentTitle] = useState('');

    const mesChange = (e) => {
        setMesInforme(e.id);
        // Fetch data del mes
        informe_asistencia(idProyecto, e.id)
        .then( response => {
            // Asignar data del mes a estado
            setContenidoInforme(response);
            setDocumentTitle(`Informe de asistencia mensual ${response.mes}  proyecto ${idProyecto}`);
        })
        .catch(error => {
            console.error("There was an error fetching the data", error);
        });       
    };

    return (
        <>
        <div className="mt-8">
            <h1 className="font-bold text-gris-800 cursor-default">Estadísticas de uso</h1>

            <div className="flex flex-row">
                <label className="text-gris-700 text-sm w-[100px] mr-2">Mes</label>
                <label className="text-gris-700 text-sm w-[120px] mr-2"> Asistencia</label>
                <label className="text-gris-700 text-sm w-[120px] mr-2">Horas de uso</label>
                <label className="text-gris-700 text-sm mr-2">Uso fuera de horario</label>
            </div>

            {data.asistenciaMensual.map((infoMes, index) => (
                <div className="flex flex-row" key={`tabla_asistencia_${index}`}>
                    <p className="sm-sii:text-base text-sm text-gris-900 mr-2 w-[100px]">{infoMes.mes}</p>
                    <p className="sm-sii:text-base text-sm text-gris-900 w-[120px] mr-2">{infoMes.asistencia} / {infoMes.jornadasAsignadas} ({infoMes.porcentajeAsistencia})</p>
                    <p className="sm-sii:text-base text-sm text-gris-900 w-[120px] mr-2">{infoMes.horasUtilizadas} / {infoMes.horasAsignadas}</p>
                    <p className="sm-sii:text-base text-sm text-gris-900 mr-2">{infoMes.horasExtra}</p>
                </div>
            ))

            }

            <div id="estadisticas-total" className='flex sm-sii:flex-row flex-col my-10 text-gris-800'>
                <div className='sm-sii:w-1/3 text-center flex flex-col sm-sii:mr-4 mb-5 sm-sii:mb-0'>
                    <span className='font-bold text-lg'>Asistencia del proyecto</span>
                    <span className='text-3xl text-gris-900'>{data.estadisticasTotal.porcentajeAsistenciaTotal}%</span>
                </div>

                <div className='sm-sii:w-1/3 text-center flex flex-col sm-sii:mr-4 mb-5 sm-sii:mb-0'>
                    <span className='font-bold text-lg text-gris-800'>Uso de horas asignadas</span>
                    <span className='text-3xl text-gris-900'>{data.estadisticasTotal.usoHorasAsignadasTotal}%</span>
                </div>

                <div className='sm-sii:w-1/3 text-center flex flex-col sm-sii:mr-4'>
                    <span className='font-bold text-lg text-gris-800'>Uso fuera de horario</span>
                    <span className='text-3xl text-gris-900'>{data.estadisticasTotal.horasExtraTotal}</span>
                </div>

            </div>

            {user &&
            (user.is_pc_isla_admin || user.is_pc_isla_editor) &&
            (<>
            <div className="mt-5">
            <label className="text-gris-700 text-sm">Generar informe mensual:</label>
            <div className="flex flex-row">
                <ComboboxSelect 
                    key="mesInforme"
                    onChange={mesChange}
                    options={data.mesesInforme}
                    label="mesInforme"
                />
                {contenidoInforme && 
                    <ReactToPrint
                        trigger={() => <button 
                        className="anchor-imprimir"><PrinterIcon className="h-11 w-11 text-gris-800 inline hover:text-azul-cobalto-400 cursor-pointer ml-1"/></button>}
                        content={() => componentRef.current}
                        documentTitle={documentTitle}
                    />

                }
                
                
                     
            </div>
            </div>
            <Tooltip 
                key="informeAsistenciaMensual"
                anchorSelect=".anchor-imprimir"
                place="top"
            >
                Imprimir informe
            </Tooltip>
            </>)}              
        </div>
        {contenidoInforme && 
            <div style={{ display: 'none' }}>
                <InformeAsistenciaMensual
                    ref={componentRef} 
                    content={contenidoInforme}
                    />
            </div>
        }

        </>

    );
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
    informe_asistencia,

})(EstadsiticasUso);
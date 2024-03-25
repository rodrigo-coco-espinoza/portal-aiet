import { DocumentArrowDownIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tooltip } from "react-tooltip";
import ComboboxSelect from "./ComboboxSelect";
import { Alert } from "@material-tailwind/react";
import { update_encargados_sii, rechazar_proyecto, aceptar_proyecto } from "redux/actions/pc_isla/pc_isla";
import ModalRechazarProyecto from "./ModalRechazarProyecto";
import ProtocloInstituciones from "./ProtocoloInstituciones";
import ProtocoloMINHACIENDA from "./ProtocoloMINHACIENDA";


function ModalDetalleProyecto({
    active,
    closeModal,
    institucion,
    proyecto,
    user,
    encargadosSiiOptions,
    update_encargados_sii,
    showAlertRechazado,
    rechazar_proyecto,
    aceptar_proyecto
}) {

    const handleCloseModal = () => {
        // Editar encargados SII
        setEditarEncargadosSii(false);
        // Alertas
        setOpenAlertEncargadosSii(false);
        // Respuesta SII
        setRespuestaSiiData({
            fecha: "",
            documento: null
        });

        closeModal();
    }

    // Editar encargados SII
    const [forceRender, setForceRender] = useState(false);
    const [editarEncargadosSii, setEditarEncargadosSii] = useState(false);
    const [encargadosSiiSelections, setEncargadosSiiSelections] = useState({
        encargadoSii: "",
        backupSii: "",
    });
    const encargadosSiiChange = (e, role) => {
        setEncargadosSiiSelections(prevState => ({
            ...prevState,
            [role]: e.id
        }));
    };
    const cerrarEditarEncargadosSii = () => {
        // Esconder combobox encargados SII
        setEditarEncargadosSii(false);
        // Resetear combobox
        setEncargadosSiiSelections({
            encargadoSii: "",
            backupSii: "",
        });
        setForceRender(prevState => !prevState);
    };
    const [openAlertEncargadosSii, setOpenAlertEncargadosSii] = useState(false);

    // Actualizar encargados SII
    const [encargadosSiiValidations, setencargadosSiiValidations] = useState({
        encargado: true,
        backup: true,
        backup2: true,
    });
    const validateEncargadosSii = () => {
        const encargado = encargadosSiiSelections.encargadoSii;
        const backup = encargadosSiiSelections.backupSii;
        // Validar encargado
        const encargadoValid = encargado !== "";

        // Validar backup
        const backupValid = backup !== "";
        let backup2Valid = true;
        if (encargado !== "" && backup !== ""){
            backup2Valid = encargado !== backup;
        }

        const allValidations = Object.values({
            encargado: encargadoValid,
            backup: backupValid,
            backup2: backup2Valid
        }).every((validation) => validation);

        setencargadosSiiValidations({
            ...encargadosSiiValidations,
            encargado: encargadoValid,
            backup: backupValid,
            backup2: backup2Valid
        });

        return allValidations;
        

    };
    const actualizarEncargadosSii = async () => {
        // Comprobar que hayan cambios
        if (proyecto.encargado_sii.id === encargadosSiiSelections.encargadoSii &&
            proyecto.backup_sii.id === encargadosSiiSelections.backupSii) {
                setOpenAlertEncargadosSii(true);
                cerrarEditarEncargadosSii();
            }
        else {
            if ( validateEncargadosSii() ) {
                const requestData = {
                    ...encargadosSiiSelections,
                    proyectoId: proyecto.id
                }
                await update_encargados_sii(requestData);
                setOpenAlertEncargadosSii(true);
                cerrarEditarEncargadosSii();
            }
            
        }
    }

    // Respuesta SII
    const [respuestaSiiData, setRespuestaSiiData] = useState({
        fecha: "",
        documento: null
    });
    const [isAccepted, setIsAccepted] = useState(proyecto.oficio_respuesta !== null);
    const [openAlertRespuesta, setOpenAlertRespuesta] = useState(false);
    const handleOficioRespuesta = (e) => {
        const selectedFile = e.target.files[0];
        setRespuestaSiiData({...respuestaSiiData, documento: selectedFile});
    };
    const [showModalRechazar, setShowModalRechazar] = useState(false);
    const changeShowModalRechazar = (e) => {
        e.preventDefault();
        setShowModalRechazar(true);

    }
    const closeModalRechazar = () => {
        setShowModalRechazar(false);
    };
    const rechazarProyecto = () => {
        // Actualizar BBDD
        rechazar_proyecto({idProyecto: proyecto.id});
        // Mostrar alerta
        showAlertRechazado(`${institucion.sigla}: ${institucion.nombre}`);
        // Cerrar modal detalle proyecto
        closeModal();
    };
    const onSubmitAceptarProyecto = async (e) => {
        e.preventDefault()
        
        const dataToSend = new FormData();

        for (const key in respuestaSiiData) {
            dataToSend.append(key, respuestaSiiData[key]);
        }
        dataToSend.append('id', proyecto.id);

        try {
            await aceptar_proyecto(dataToSend);
            setIsAccepted(true);
            setOpenAlertRespuesta(true);

        } catch (error) {
            console.error('Error uploading file', error);
        }

    };

    return (
        <>
            {active && (
                <div className="bg-opacity-25 fixed inset-0 z-40 bg-black" onClick={handleCloseModal}>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 sm-sii:-top-20 outline-none focus:outline-none">
                        <div className="relative sm-sii:w-full w-5/6 my-6 mx-auto max-w-3xl">
                        {/* Alert encargados SII */}
                        <Alert
                            open={openAlertEncargadosSii}
                            onClose={() => setOpenAlertEncargadosSii(false)}
                            onClick={(e) => e.stopPropagation()}
                            animate={{
                                mount: { y: 0 },
                                unmount: { y: 100 }
                            }}
                            className="relative max-w-[28rem] sm-sii:max-w-[40rem] transform -top-3 z-50 bg-verde-esmeralda-300 mx-auto"
                        >
                            Encargados SII actualizados.
                        </Alert>
                        {/* Alert respuesta SII  */}
                        <Alert
                            open={openAlertRespuesta}
                            onClose={() => setOpenAlertRespuesta(false)}
                            onClick={(e) => e.stopPropagation()}
                            animate={{
                                mount: { y: 0 },
                                unmount: { y: 100 }
                            }}
                            className="relative max-w-[28rem] sm-sii:max-w-[40rem] transform -top-3 z-50 bg-verde-esmeralda-300 mx-auto"
                        >
                            El proyecto ha sido aceptado.
                        </Alert>
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gris-100 outline-none focus:outline-none bg-opacity-100" onClick={(e) => e.stopPropagation()}>
                                {/*header*/}
                                <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-gris-600 rounded-t">
                                    <h3 className="text-normal font-semibold cursor-default text-gris-700">
                                        Detalle del proyecto
                                    </h3>
                                    <p className="text-xl font-semibold leading-tight text-gris-800 cursor-default">{institucion.sigla}: {proyecto.nombre}</p>
                                </div>

                                {/*body*/}
                                <div className="relative flex-auto overflow-y-auto max-h-[60vh]">
                                    <div>
                                        {/* Solicitud de proyecto */}
                                        <div className="mb-2 bg-gris-300 px-6 py-4">
                                            <h1 className="text-xl text-gris-800 cursor-default">Solicitud de proyecto</h1>
                                            <div className="mt-1">
                                                <label className="text-lg text-gris-700 text-sm" id="oficio-solicitud">Descripción:</label>
                                                <p className="text-gris-900 text-justify leading-tight cursor-default">{proyecto.objetivo}</p>
                                            </div>
                                            <div className="mt-1">
                                                <label className="text-lg text-gris-700 text-sm" id="oficio-solicitud">Oficio de solicitud de la institución externa:</label>
                                                <p className="text-gris-900 cursor-default">Recibido el {proyecto.formatted_fecha_oficio_recibido} ({proyecto.gabinete}) <a
                                                    href={`${process.env.REACT_APP_API_URL}/api/pc_isla/download_oficio_recibido/${proyecto.id}/`}
                                                    target="_blank"
                                                 className="anchor-descargar-oficio-solicitud"><DocumentArrowDownIcon 
                                                    className="h-6 w-6 text-gris-800 inline hover:text-azul-cobalto-400 cursor-pointer"
                                                /></a>
                                                </p>
                                                <Tooltip
                                                    key="descargarOficioSolicitud"
                                                    anchorSelect=".anchor-descargar-oficio-solicitud"
                                                    place="top"
                                                >
                                                    Descargar documento
                                                </Tooltip>
                                            </div>
                                            <div className={`mt-1 ${editarEncargadosSii ? 'hidden' : ''}`}>
                                                <label className="text-lg text-gris-700 text-sm" id="oficio-solicitud">Encargados:</label>
                                                <p className="text-gris-900 cursor-default">{proyecto.encargado_sii.nombre} (encargado) - {proyecto.backup_sii.nombre} (backup) { (user && (user.is_pc_isla_admin || user.is_pc_isla_user)) && <a 
                                                    className="anchor-editar-encargados"
                                                >
                                                    <PencilSquareIcon
                                                        onClick={() => setEditarEncargadosSii(true)} 
                                                        className="h-6 w-6 text-gris-800 hover:text-azul-cobalto-400 inline cursor-pointer"
                                                    />
                                                </a>}
                                                </p>                       
                                                <Tooltip 
                                                    key="tooltipEditarEncargados" 
                                                    anchorSelect=".anchor-editar-encargados" 
                                                    place="top">
                                                    Editar encargados
                                                </Tooltip>
                                            </div> 
                                            <div className={`mt-1 ${editarEncargadosSii ? '' : 'hidden'}`}>
                                                <div className="flex flex-col sm-sii:flex-row mb-4">
                                                    <div className="w-full sm-sii:w-2/5 sm-sii:pr-3">
                                                        <label className="text-gris-700 text-sm" id="encargado-label">Editar encargado</label>
                                                        <ComboboxSelect
                                                            key="encargado"
                                                            onChange={encargadosSiiChange}
                                                            options={encargadosSiiOptions}
                                                            label="encargadoSii"
                                                            render={forceRender}
                                                            
                                                        />
                                                        <span className="text-rojo-400 text-sm" hidden={encargadosSiiValidations.encargado}>Debe seleccionar un encargado.</span>
                                                    </div>
                                                    <div className="w-full sm-sii:w-2/5">
                                                        <label className="text-gris-700 text-sm" id="backup-label">Editar backup</label> 
                                                        <ComboboxSelect 
                                                            key="backup"
                                                            onChange={encargadosSiiChange}
                                                            options={encargadosSiiOptions}
                                                            label="backupSii"
                                                            render={forceRender}
                                                        />
                                                        <span className="text-rojo-400 text-sm" hidden={encargadosSiiValidations.backup}>Debe seleccionar un backup.</span>
                                                        <span className="text-rojo-400 text-sm" hidden={encargadosSiiValidations.backup2}>El backup debe ser distinto del encargado.</span>
                                                    </div>
                                                    <div className="w-full sm-sii:w-1/4 flex items-end justify-end pt-3">
                                                        <button
                                                            onClick={actualizarEncargadosSii}
                                                            className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150 mr-3">
                                                                Guardar
                                                        </button>
                                                        <button
                                                            onClick={cerrarEditarEncargadosSii}
                                                            className="text-rojo-300 hover:text-rojo-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150" type="button">
                                                                Cancelar
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Respuesta SII */}
                                        <div className={`mb-2 px-6 pb-4 pt-2 ${isAccepted ? 'hidden' : ''}`}>
                                            <h1 className="text-xl text-gris-800 cursor-default">Respuesta SII</h1>
                                            <form onSubmit={e => {onSubmitAceptarProyecto(e)}} method="POST" action="#">
                                            <div className="mt-1">
                                                <label className="text-lg text-gris-700 text-sm" id="oficio-respuesta">Adjuntar oficio de respuesta:</label>
                                                <input
                                                    type="file"
                                                    id="oficioRespuesta"
                                                    name="oficioRespuesta"
                                                    accept=".pdf, .PDF"
                                                    required
                                                    onChange={handleOficioRespuesta}
                                                    className="block w-full rounded border border-azul-marino-100 bg-clip-padding px-3 py-2 text-gris-800 transition file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid
                                                    file:cursor-pointer
                                                    file:border-inherit file:bg-gris-800 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gris-400 hover:file:text-gris-800 focus:border-primary focus:text-gris-800 focus:shadow-te-primary focus:outline-none"
                                                />
                                            </div>
                                            <div className="flex flex-row">
                                                <div className="mt-1 sm-sii:w-1/3 w-1/2 pr-3">
                                                    <label className="text-lg text-gris-700 text-sm" id="fecha-respuesta">Fecha oficio:</label>
                                                    <input 
                                                        type="date"
                                                        id='fecha'
                                                        name='fecha'
                                                        value={respuestaSiiData.fecha}
                                                        onChange={e=>setRespuestaSiiData({...respuestaSiiData,fecha: e.target.value})}
                                                        required
                                                        className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded h-9"
                                                    /> 
                                                </div>
                                                <div className="mt-1 sm-sii:w-3/4 w-1/2 flex items-end justify-end pt-3">
                                                    <button
                                                        type="submit"
                                                        className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150 mr-3">
                                                            Aceptar
                                                    </button>
                                                    <button
                                                        onClick={(e) => {changeShowModalRechazar(e)}}
                                                        className="text-rojo-300 hover:text-rojo-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150" type="button">
                                                            Rechazar
                                                    </button>
                                                </div>   
                                            </div>
                                            </form>
                                        </div>
                                        <div className={`mb-2 px-6 pb-4 pt-2 ${isAccepted ? '' : 'hidden'}`}>
                                            <h1 className="text-xl text-gris-800 cursor-default">Respuesta SII</h1>
                                            <div className="mt-1">
                                                <label className="text-lg text-gris-700 text-sm" id="oficio-respuesta">Oficio de respuesta de aprobación del proyecto:</label>
                                                <p className="text-gris-900 cursor-default">Enviado el {proyecto.formatted_fecha_oficio_respuesta}<a
                                                    href={`${process.env.REACT_APP_API_URL}/api/pc_isla/download_oficio_respuesta/${proyecto.id}/`}
                                                    target="_blank"
                                                 className="anchor-descargar-oficio-solicitud"><DocumentArrowDownIcon 
                                                    className="h-6 w-6 text-gris-800 inline hover:text-azul-cobalto-400 cursor-pointer"
                                                /></a>
                                                </p>
                                                <Tooltip
                                                    key="descargarOficioSolicitud"
                                                    anchorSelect=".anchor-descargar-oficio-solicitud"
                                                    place="top"
                                                >
                                                    Descargar documento
                                                </Tooltip>
                                            </div>
                                        </div>
                                        {/* Protocolo de uso */}
                                        { institucion.sigla === "MINHACIENDA" ? 
                                            <ProtocoloMINHACIENDA />
                                        :
                                            <ProtocloInstituciones
                                                institucion={institucion}
                                            />
                                        }
                                        

                                        <div className="mb-4 px-6 pb-4 pt-2">
                                            <h1 className="text-xl text-gris-800 cursor-default">Registro de asistencia</h1>
                                            <div className="mt-1">
                                                <label className="text-lg text-gris-700 text-sm" id="oficio-solicitud">Descripción:</label>
                                                <p className="text-gris-900 text-justify leading-tight">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae nulla eu mi tincidunt imperdiet. Duis tincidunt turpis in nulla convallis viverra. Integer sit amet mi tortor. Integer sed sagittis magna. Sed varius leo eu sem convallis, ut efficitur dui laoreet. Pellentesque sollicitudin tristique ante, vel sagittis elit dignissim vitae.</p>
                                            </div>
                                            <div className="mt-1">
                                                <label className="text-lg text-gris-700 text-sm" id="oficio-solicitud">Oficio de solicitud de la institución externa:</label>
                                                <p className="text-gris-900">Recibido el 30-10-2024 (GE001547) - Ver documento </p>
                                            </div>
                                            <div className="mt-1">
                                                <label className="text-lg text-gris-700 text-sm" id="oficio-solicitud">Encargados:</label>
                                                <p className="text-gris-900">Cristian Gutiérrez (encargado) - Rodrigo Espinoza (backup) </p>
                                            </div>   
                                        </div>
                                    </div>
                                </div>

                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gris-400 rounded-b">                                   
                                    <button
                                    onClick={handleCloseModal}
                                    className="text-rojo-300 hover:text-rojo-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150" type="button">
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            )}
            <ModalRechazarProyecto 
                active={showModalRechazar}
                closeModal={closeModalRechazar}
                rechazarProyecto={rechazarProyecto}

            />
        </>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user,
    encargadosSiiOptions: state.institucion_reducer.encargadosPcIslaOptions,
})

export default connect (mapStateToProps, {
    update_encargados_sii,
    rechazar_proyecto,
    aceptar_proyecto,
}) (ModalDetalleProyecto);
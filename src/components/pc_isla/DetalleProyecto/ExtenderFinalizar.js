import { useState } from "react";
import { connect } from "react-redux";
import ModalFinalizarProyecto from "./ModalFinalizarProyecto";
import { extender_proyecto, update_extension } from "redux/actions/pc_isla/pc_isla";
import { Alert } from "@material-tailwind/react";
import Loading from "components/formularios/Loading";
import { ArrowPathIcon, DocumentArrowDownIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";

function ExtenderFinalizar({
    idProyecto,
    proyectoFinalizado,
    extender_proyecto,
    extendido,
    fechaExtension,
    user,
    update_extension,
}) 
{
    // Form extender proyecto
    const [formData, setFormData] = useState({
        proyectoId: idProyecto,
        documento: "",
        fechaDocumento: "",
    });

    const {
        proyectoId,
        documento,
        fechaDocumento,
    } = formData;

    const handleDocument = e => {
        setFormData({
            ...formData,
            documento: e.target.files[0]
        });
        
    };
    
    const [alertExtendido, setAlertExtendido] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        extender_proyecto(formDataToSend)
            .then(() => {
                setLoading(false);
                setAlertExtendido(true);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    // Actualizar documento extensión
    const [showActualizarExtension, setShowActualizarExtension] = useState(false);
    const [actualizarExtensionData, setActualizarExtensionData] = useState("");

    const cerrarActualizarExtension = () => {
        setShowActualizarExtension(false);
        setActualizarExtensionData("");
    };

    const actualizarExtension = async () => {
        if (actualizarExtensionData) {
            const formDataToSend = new FormData();
            formDataToSend.append('proyectoId', idProyecto);
            formDataToSend.append('documento', actualizarExtensionData);

            try {
                await update_extension(formDataToSend);
                cerrarActualizarExtension();
            } catch (error) {
                console.log(error);
            }
        }
    };

    // Finalizar proyecto
    const [showModalFinalizar, setShowModalFinalizar] = useState(false);
    const handleFinalizarProyecto = (isFinished) => {
        setShowModalFinalizar(false);
        if (isFinished) {
            proyectoFinalizado();
        }
    }

    return (
        <>
        <Alert 
            open={alertExtendido}
            onClose={() => setAlertExtendido(false)}
            onClick={(e) => e.stopPropagation()}
            animate={{
                mount: { y: 20 },
                unmount: { y: 100 },
            }}
            className="relative max-w-[28rem] sm-sii:max-w-[40rem] transform -top-3 z-50 bg-verde-esmeralda-300 mx-auto"
        >
            El plazo del proyecto ha sido extendido.
        </Alert>
        { extendido ?
        <>
            <h1 className="font-bold text-gris-800 cursor-default mt-4">Plazo del proyecto extendido</h1>
            <p className={`text-gris-900 cursor-default ${showActualizarExtension ? 'hidden' : ''}`}>
                Recibido el {fechaExtension} <a href={`${process.env.REACT_APP_API_URL}/api/pc_isla/download_extension/${proyectoId}/`} target="_blank" className="anchor-descargar-extension"><DocumentArrowDownIcon className="h-6 w-6 text-gris-800 inline hover:text-azul-cobalto-400 cursor-pointer" /></a>
                {user && 
                    (user.is_pc_isla_admin || user.is_pc_isla_editor) && (
                        <a className="anchor-actualizar-extension">
                            <ArrowPathIcon
                                onClick={() => setShowActualizarExtension(!showActualizarExtension)}
                                className="h-6 w-6 text-gris-800 inline hover:text-azul-cobalto-400 cursor-pointer"
                            />
                        </a>
                    )

                }
            </p>
            <p className={`flex flex-col sm-sii:flex-row ${showActualizarExtension ? '' : 'hidden'}`}>
                <input 
                                type='file'
                                id='actualizarExtension'
                                name='actualizarExtension'
                                accept=".pdf, .PDF"
                                required
                               onChange={(e) => setActualizarExtensionData(e.target.files[0])}
                                className="block w-full rounded border border-azul-marino-100 bg-clip-padding px-3 py-2 text-gris-800 transition file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:cursor-pointer file:border-inherit file:bg-gris-800 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gris-400 hover:file:text-gris-800 focus:border-primary focus:text-gris-800 focus:shadow-te-primary focus:outline-none"
                              />
                              <span className="flex items-end justify-end ms-1">

                              
                                <button
                                 onClick={actualizarExtension}
                                  className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150 mr-3"
                                >
                                  Guardar
                                </button>
                                <button
                                 onClick={cerrarActualizarExtension}
                                  className="text-rojo-300 hover:text-rojo-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150"
                                  type="button"
                                >
                                  Cancelar
                                </button>
                              </span>
            </p>
            <Tooltip
                key="descargarExtension"
                anchorSelect=".anchor-descargar-extension"
                place="top"
            >
                Descargar documento
            </Tooltip>
            <Tooltip
                key="actualizarExtension"
                anchorSelect=".anchor-actualizar-extension"
                place="top"
            >
                Actualizar documento
            </Tooltip>
        </>
        :
        <form onSubmit={e => {onSubmit(e)}} method="POST" action="#">
            <h1 className="font-bold text-gris-800 cursor-default mt-4">Extender plazo del proyecto</h1>
            <div className="">
                <label className="text-lg text-gris-700 text-sm">Adjuntar documento:</label>
                <input 
                    type='file'
                    id='documentoExtension'
                    name='documentoExtension'
                    accept='.pdf, .PDF'
                    required
                    onChange={handleDocument}
                    className="block w-full rounded border border-azul-marino-100 bg-clip-padding px-3 py-2 text-gris-800 transition file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:cursor-pointer file:border-inherit file:bg-gris-800 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gris-400 hover:file:text-gris-800 focus:border-primary focus:text-gris-800 focus:shadow-te-primary focus:outline-none"
                />
            </div>
            {/* Fecha documento */}
            <div className="mt-1 sm-sii:w-1/3 w-1/2 pr-3">
                <label className="text-gris-700 text-sm">Fecha documento:</label>
                <input 
                    type="date"
                    if="fechaDocumento"
                    name="fechaDocumento"
                    value={fechaDocumento}
                    onChange={e => setFormData({...formData, fechaDocumento: e.target.value})}
                    required
                    className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded h-9"

                />
            </div>
            {/* Botón extender */}
            <div className="flex items-center justify-end">
                <button
                type='submit'
                className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150">
                    Extender plazo
                </button>
            </div>          
        </form>
        }
        <h1 className="font-bold text-gris-800 cursor-default mt-4">Finalizar proyecto</h1>
        <div className="flex items-center justify-end">
            <button
            onClick={e => setShowModalFinalizar(true)}
            className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150">
                Finalizar proyecto
            </button>
        </div>
        {loading && <Loading message={'Extendiendo jornada.'} />}
        <ModalFinalizarProyecto 
            idProyecto={proyectoId}
            closeModal={handleFinalizarProyecto}
            active={showModalFinalizar}
        />
        </>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user,

});

export default connect(mapStateToProps, {
    extender_proyecto,
    update_extension
})(ExtenderFinalizar);
import { useState } from "react";
import { connect } from "react-redux";
import { Alert } from "@material-tailwind/react";
import Loading from "components/formularios/Loading";
import { add_extraccion, delete_extraccion } from "redux/actions/pc_isla/pc_isla";
import { DocumentArrowDownIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";

function Extracciones({ 
    user,
    idProyecto,
    data,
    add_extraccion,
    delete_extraccion
}) {
    // Form extraccion
    const [formData, setFormData] = useState({
        id: idProyecto,
        numero_extraccion: "",
        gabinete_electronico: "",
        fecha: "",
        documento_extraccion: null,
        informe_revision: null,
    });

    const {
        id,
        numero_extraccion,
        gabinete_electronico,
        fecha,
        documento_extraccion,
        informe_revision
    } = formData;

    // Validaciones
    const [validations, setValidations] = useState({
        numero_extraccion: true,
        gabinete_electronico: true,
        fecha: true,
        documento_extraccion: true,
        informe_revision: true,
        gabinete_formato: true,
    });

    const validateGabineteFormat = (gabinete) => {
        // Formato GEXXXXX donde XXX son números
        const regex = /^GE\d+$/;
        return regex.test(gabinete);
    };

    const validateForm = () => {
        // Validar número de extracción
        const numeroValid = numero_extraccion !== "" && !isNaN(numero_extraccion) && numero_extraccion > 0;

        // Validar gabinete electrónico
        const gabineteValid = gabinete_electronico !== "";
        const gabineteFormatoValid = validateGabineteFormat(gabinete_electronico);

        // Validar fecha
        const fechaValid = fecha !== "";

        // Validar archivos
        const documentoValid = documento_extraccion !== null;
        const informeValid = informe_revision !== null;

        const allValidations = Object.values({
            numero_extraccion: numeroValid,
            gabinete_electronico: gabineteValid,
            fecha: fechaValid,
            documento_extraccion: documentoValid,
            informe_revision: informeValid,
            gabinete_formato: gabineteFormatoValid,
        }).every((validation) => validation);

        setValidations({
            numero_extraccion: numeroValid,
            gabinete_electronico: gabineteValid,
            fecha: fechaValid,
            documento_extraccion: documentoValid,
            informe_revision: informeValid,
            gabinete_formato: gabineteFormatoValid,
        });

        return allValidations;
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            // Validar que sea archivo comprimido
            const allowedTypes = ['application/zip', 'application/x-zip-compressed', 'application/x-rar-compressed', 'application/vnd.rar'];
            const allowedExtensions = ['.zip', '.rar'];
            const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
            
            if (allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension)) {
                setFormData({
                    ...formData,
                    [fieldName]: file
                });
            } else {
                alert('Por favor seleccione un archivo comprimido (.zip o .rar)');
                e.target.value = '';
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            
            // Crear FormData para enviar archivos
            const submitFormData = new FormData();
            submitFormData.append('id', id);
            submitFormData.append('numero_extraccion', numero_extraccion);
            submitFormData.append('gabinete_electronico', gabinete_electronico);
            submitFormData.append('fecha', fecha);
            submitFormData.append('documento_extraccion', documento_extraccion);
            submitFormData.append('informe_revision', informe_revision);

            // Registrar extracción
            add_extraccion(submitFormData)
                .then(() => {
                    setFormData({
                        id: idProyecto,
                        numero_extraccion: "",
                        gabinete_electronico: "",
                        fecha: "",
                        documento_extraccion: null,
                        informe_revision: null,
                    });
                    // Limpiar inputs de archivos
                    const fileInputs = document.querySelectorAll('input[type="file"]');
                    fileInputs.forEach(input => input.value = '');
                    
                    setLoading(false);
                    setAlertExtraccion(true);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    };

    // Mensajes
    const [alertExtraccion, setAlertExtraccion] = useState(false);
    const [loading, setLoading] = useState(false);

    // Función para eliminar extracción
    const handleDeleteExtraccion = (extraccionId) => {
        if (window.confirm('¿Está seguro que desea eliminar esta extracción?')) {
            setLoading(true);
            delete_extraccion(extraccionId)
                .then(() => {
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    alert('Error al eliminar la extracción');
                });
        }
    };

   return (
    <>
      <div className="mt-2">
        <Alert
            open={alertExtraccion}
            onClose={() => setAlertExtraccion(false)}
            onDirectionLock={(e) => e.stopPropagation()}
            animate={{
                mount: { y: 0 },
                unmount: { y: 100 }
            }}
            className="relative max-w-[28rem] sm-sii:max-w-[40rem] transform -top-3 z-50 bg-verde-esmeralda-300 mx-auto"         
        >
            Extracción registrada exitosamente.
        </Alert>

        {/* Extracciones registradas */}
        <div className="mt-2">
           {data && data.length > 0 ? (
             <>
               <div className="flex flex-row">
                  <label className="text-gris-700 text-sm w-[50px] mr-2">#</label>
                  <label className="text-gris-700 text-sm w-[120px] mr-2">Fecha</label>
                  <label className="text-gris-700 text-sm w-[120px] mr-2">Gabinete</label>
                  {user && (user.is_pc_isla_admin || user.is_pc_isla_editor) && (
                    <>
                      <label className="text-gris-700 text-sm w-[80px] mr-2 text-center">Extracción</label>
                      <label className="text-gris-700 text-sm w-[80px] mr-2 text-center">Inf. Revisión</label>
                      <label className="text-gris-700 text-sm w-[80px] mr-2 text-center">Eliminar</label>
                    </>
                  )}
                </div>

                {data.map((extraccion, index) => (
                  <div className="flex flex-row items-center" key={`tabla_extracciones_${index}`}>
                    <p className="sm-sii:text-base text-sm text-gris-900 mr-2 w-[50px]">{extraccion.numero}</p>
                    <p className="sm-sii:text-base text-sm text-gris-900 mr-2 w-[120px]">{extraccion.fecha}</p>
                    <p className="sm-sii:text-base text-sm text-gris-900 mr-2 w-[120px]">{extraccion.gabinete}</p>
                    {user && (user.is_pc_isla_admin || user.is_pc_isla_editor) && (
                        <>
                            <div className="w-[80px] mr-2 flex justify-center">
                            <a
                                href={`${process.env.REACT_APP_API_URL}/api/pc_isla/download_extraccion/${extraccion.id}/`}
                                target="_blank"
                                rel="noreferrer"
                                className={`anchor-descargar-extraccion-${extraccion.id}`}
                            >
                                <DocumentArrowDownIcon className="h-6 w-6 text-gris-800 inline hover:text-azul-cobalto-400 cursor-pointer" />
                            </a>
                            <Tooltip
                                anchorSelect={`.anchor-descargar-extraccion-${extraccion.id}`}
                                place="top"
                            >
                                Descargar extracción
                            </Tooltip>
                            </div>
                            <div className="flex justify-center w-[80px] mr-2">
                            <a
                                href={`${process.env.REACT_APP_API_URL}/api/pc_isla/download_informe_revision/${extraccion.id}/`}
                                target="_blank"
                                rel="noreferrer"
                                className={`anchor-descargar-informe-${extraccion.id}`}
                            >
                                <DocumentArrowDownIcon className="h-6 w-6 text-gris-800 inline hover:text-azul-cobalto-400 cursor-pointer" />
                            </a>
                            <Tooltip
                                anchorSelect={`.anchor-descargar-informe-${extraccion.id}`}
                                place="top"
                            >
                                Descargar informe de revisión
                            </Tooltip>
                            </div>
                            <div className="flex justify-center w-[80px]">
                                <button
                                    onClick={() => handleDeleteExtraccion(extraccion.id)}
                                    className={`anchor-eliminar-extraccion-${extraccion.id} bg-transparent border-none p-0`}
                                >
                                    <TrashIcon className="h-6 w-6 text-gris-800 hover:text-rojo-400 cursor-pointer" />
                                </button>
                                <Tooltip
                                    anchorSelect={`.anchor-eliminar-extraccion-${extraccion.id}`}
                                    place="top"
                                >
                                    Eliminar extracción
                                </Tooltip>
                            </div>

                        </>

                    )}
                  </div>
                ))}
             </>
           ) : (
             <div className="text-center py-2">
               <p className="text-gris-700 text-md">No extracciones registradas</p>
             </div>
           )}
        </div>

        {/* Agregar nueva extracción */}
        {user && 
            (user.is_pc_isla_admin || user.is_pc_isla_editor) && (

                <div className="mt-4">
                    <h1 className="font-bold text-gris-800 cursor-default">Agregar nueva extracción</h1>
                    <form onSubmit={e => {onSubmit(e)}} method="POST" action="#">
                        {/* Primera fila: Número, Gabinete, Fecha */}
                        <div className="flex flex-col sm-sii:flex-row gap-4 mt-3">
                            {/* Número de extracción */}
                            <div className="flex-1">
                                <label className="text-gris-700 text-sm"># de extracción:</label>
                                <input 
                                    type="number"
                                    id="numero_extraccion"
                                    name="numero_extraccion"
                                    value={numero_extraccion}
                                    onChange={e => setFormData({...formData, numero_extraccion: e.target.value})}
                                    required
                                    min="1"
                                    className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded h-9"
                                />
                                <span className="text-rojo-400 text-sm" hidden={validations.numero_extraccion}>
                                    Debe ingresar un número de extracción válido.
                                </span>
                            </div>

                            {/* Gabinete electrónico */}
                            <div className="flex-1">
                                <label className="text-gris-700 text-sm"># Gabinete electrónico:</label>
                                <input 
                                    type="text"
                                    id="gabinete_electronico"
                                    name="gabinete_electronico"
                                    value={gabinete_electronico}
                                    onChange={e => setFormData({...formData, gabinete_electronico: e.target.value.toUpperCase()})}
                                    placeholder="GE12345"
                                    required
                                    className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded h-9"
                                />
                                <span className="text-rojo-400 text-sm" hidden={validations.gabinete_electronico}>
                                    Debe ingresar el gabinete electrónico.
                                </span>
                                <span className="text-rojo-400 text-sm" hidden={validations.gabinete_formato}>
                                    El formato debe ser GEXXXXX (GE seguido de números).
                                </span>
                            </div>

                            {/* Fecha */}
                            <div className="flex-1">
                                <label className="text-gris-700 text-sm">Fecha:</label>
                                <input 
                                    type="date"
                                    id="fecha"
                                    name="fecha"
                                    value={fecha}
                                    onChange={e => setFormData({...formData, fecha: e.target.value})}
                                    required
                                    className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded h-9"
                                />
                                <span className="text-rojo-400 text-sm" hidden={validations.fecha}>
                                    Debe seleccionar una fecha.
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm-sii:grid-cols-2 gap-4 mt-3">
                            {/* Documento extracción */}
                            <div>
                                <label className="text-gris-700 text-sm">Documento extracción (ZIP/RAR):</label>
                                <input 
                                    type="file"
                                    id="documento_extraccion"
                                    name="documento_extraccion"
                                    onChange={e => handleFileChange(e, 'documento_extraccion')}
                                    accept=".zip,.rar"
                                    required
                                    className="block w-full rounded border border-azul-marino-100 bg-clip-padding px-3 py-2 text-gris-800 transition file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:cursor-pointer file:border-inherit file:bg-gris-800 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gris-400 hover:file:text-gris-800 focus:border-primary focus:text-gris-800 focus:shadow-te-primary focus:outline-none"
                                />
                                <span className="text-rojo-400 text-sm" hidden={validations.documento_extraccion}>
                                    Debe adjuntar el documento de extracción.
                                </span>
                            </div>

                            {/* Informe revisión */}
                            <div>
                                <label className="text-gris-700 text-sm">Informe revisión (ZIP/RAR):</label>
                                <input 
                                    type="file"
                                    id="informe_revision"
                                    name="informe_revision"
                                    onChange={e => handleFileChange(e, 'informe_revision')}
                                    accept=".zip,.rar"
                                    required
                                    className="block w-full rounded border border-azul-marino-100 bg-clip-padding px-3 py-2 text-gris-800 transition file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:cursor-pointer file:border-inherit file:bg-gris-800 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gris-400 hover:file:text-gris-800 focus:border-primary focus:text-gris-800 focus:shadow-te-primary focus:outline-none"
                                />
                                <span className="text-rojo-400 text-sm" hidden={validations.informe_revision}>
                                    Debe adjuntar el informe de revisión.
                                </span>
                            </div>
                        </div>

                        {/* Botón Agregar alineado a la derecha */}
                        <div className="flex justify-end mt-4">
                            <button
                                type='submit'
                                className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400 background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150">
                                Agregar
                            </button>
                        </div>
                    </form>
                </div>
            )
            
        }
      </div>
      {loading && <Loading message={'Por favor, espere'}/>}
    </>
   );
 }

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {
    add_extraccion,
    delete_extraccion,
})(Extracciones);

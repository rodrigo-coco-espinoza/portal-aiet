import ComboboxSelect from "./ComboboxSelect";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get_personas_institucion, add_protocolo} from "redux/actions/pc_isla/pc_isla";
import { PlusIcon, UserMinusIcon, UserPlusIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";
import ModalAgregarPersona from "./ModalAgregarPersona";
import { Alert } from "@material-tailwind/react";
import BloquesSelection from "./BloquesSelection";
import Loading from "./Loading";

function ProtocoloMINHACIENDA({
    get_personas_institucion,
    institucion,
    personasInstitucion,
    add_protocolo,
    idProyecto,
    bloquesOcupados,
    protocoloSaved
}) {
    // Obtener personas de la institucion
    useEffect(() => {
        get_personas_institucion(institucion.id);
    }, []);

    const [personasOptions, setpersonasOptions] = useState([]);
    useEffect(() => {
        // Update personasOptions when personasInstitucion changes
        setpersonasOptions(personasInstitucion.map(persona => ({ id: persona.id, full_name: persona.nombre })));
    }, [personasInstitucion]);

    // Form protocolo de uso
    const [formData, setFormData] = useState({
        proyectoId: idProyecto,
        documento: "",
        fecha_inicio: "",
        encargado: "",
        investigadores: [""],
        fecha_termino: null,
        equipo: "Juan Fernández",
        jornada_am: [],
        jornada_pm: [],
    });
    const {
        proyectoId,
        documento,
        fecha_inicio,
        encargado,
        investigadores,
        fecha_termino,
        equipo,
        jornada_am,
        jornada_pm,
    } = formData;

    const onChange = e => {
        
        if (e.target.name === "fecha_inicio") {
            const fechaDocumento = new Date(e.target.value);
            fechaDocumento.setMonth(fechaDocumento.getMonth() + 3);
            const fin_periodo = fechaDocumento.toISOString().split('T')[0];
            setFormData({
                ...formData, 
                ['fecha_inicio']: e.target.value, 
                ['fecha_termino']: fin_periodo
            });
        } else if (e.target.name === "documentoProtocolo") {
            setFormData({
                ...formData,
                documento: e.target.files[0]
            });
        } else {
            setFormData({
                ...formData, 
                [e.target.name]: e.target.value
            });
        }
    };
    
    
    // Validar formulario protocolo
    const [protocoloValidations, setProtocoloValidations] = useState({
        encargado: true,
        investigadores: true,
        investigadores2: true,
        jornada: true,
    });

    const validateProtocolo = () => {

        // Validar encargado
        const encargadoValid = encargado !== "";

        // Validar investigadores
        // Todos los investigadores seleccionados
        const investigadoresValid = !investigadores.some(element => element === "");

        // No se repiten investigadores
        let investigadores2Valid = true;
        if (investigadoresValid) {
            for (let i = 0; i < investigadores.length; i++) {
                const currentElement = investigadores[i];
                if (currentElement !== "") {
                    // Loop through remaining elements starting from the next index
                    for (let j = i + 1; j < investigadores.length; j++) {
                        if (currentElement === investigadores[j]) {
                            investigadores2Valid = false;
                            break;
                        }
                    }
                }
            }
        }

        // Validar jornada
        let jornadaValid = true;
        if (jornada_am.length === 0 && jornada_pm.length === 0) {
                jornadaValid = false;
        }
        
       
        const allValidations = Object.values({
            encargado: encargadoValid,
            jornada: jornadaValid,
            investigadores: investigadoresValid,
            investigadores2: investigadores2Valid,

        }).every((validation) => validation);

        setProtocoloValidations({
            ...protocoloValidations,
            encargado: encargadoValid,
            jornada: jornadaValid,
            investigadores: investigadoresValid,
            investigadores2: investigadores2Valid,

        });

        return allValidations;
    };

    const [loading, setLoading] = useState(false);
    const onSubmit =  (e) => {
        e.preventDefault();

        if (validateProtocolo()) {
            const formDataToSend = new FormData();
            
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            try {
                setLoading(true);
                add_protocolo(formData)
                    .then(() => {
                        setLoading(false);
                        protocoloSaved();
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                    });

            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
        
    };

    // Agregar persona
    const [showModalAgregarPersona, setShowModalAgregarPersona] = useState(false);
    const [showAlertNuevaPersona, setShowAlertNuevaPerson] = useState({
        open: false,
        nombre: "" 
    });
    const handleAgregarPersona = (isNuevaPersona, nombrePersona) => {
        setShowModalAgregarPersona(false);
        if (isNuevaPersona) {
            setShowAlertNuevaPerson({
                open: true,
                nombre: nombrePersona
            });
        }
    };

    // Combobox encargado e investigadores
    const encargadoChange = (e) => {
        setFormData({...formData, encargado: e.id});
    };

    const investigadoresChange = async (e, label, index) => {
        const updatedInvestigadores = investigadores;
        updatedInvestigadores[index] = e.id;
        setFormData({...formData, investigadores: updatedInvestigadores});
    };  

    // Agregar o quitar investigadores dinámicamente 
    const handleAgregarInvestigador = () => {
        setFormData({
            ...formData,
            investigadores: [...investigadores, ""]
        });
    };

    const handleEliminarInvestigador = () => {
        const updatedInvestigadores = investigadores.slice(0, -1);
        setFormData({
            ...formData,
            investigadores: updatedInvestigadores
        });
    };

    // Format date to dd/mm/yyyy
    const formatDate = (dateString) => {
        if (!dateString) return ''; // Return empty string if dateString is null or empty
        const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/); // Match yyyy-mm-dd format
        if (!match) return ''; // Return empty string if dateString doesn't match the format
        const [_, year, month, day] = match; // Destructure the matched parts
        return `${day}-${month}-${year}`; // Return formatted date
      };

    // Asignación de horarios
    const [bloquesOptions, setBloquesOptions] = useState(null);
    const bloqueChange = (selection) => {
    setFormData({
        ...formData,
        jornada_am: selection.am,
        jornada_pm: selection.pm
    });
    };

    return (
        <>
        <div className="mb-2 px-6 pb-4 pt-4 bg-gris-300">
            {/* Alert nueva persona */}
            <Alert
                open={showAlertNuevaPersona.open}
                onClose={(prev) => setShowAlertNuevaPerson({...prev, open: false})}
                onClick={(e) => e.stopPropagation()}
                animate={{
                    mount: { y: 5 },
                    unmount: { y: 100 },
                }}
                className="relative max-w-[28rem] sm-sii:max-w-[40rem] transform -top-3 z-50 bg-verde-esmeralda-300 mx-auto"
            >
                Se ha agregado {showAlertNuevaPersona.nombre} a {institucion.sigla}. 
            </Alert>
            <h1 className="text-xl text-gris-800 cursor-default">Protocolo de uso</h1> 
            <form 
                onSubmit={e => {onSubmit(e)}} 
                method="POST" 
                action="#"
            >
                {/* Documento */}
                <div className="mt-1">
                    <label className="text-lg text-gris-700 text-sm" id="documento-protocolo">Adjuntar protocolo de uso:</label>
                    <input 
                        type='file'
                        id='documentoProtocolo'
                        name='documentoProtocolo'
                        accept=".pdf, .PDF"
                        required
                        onChange={onChange}
                        className="block w-full rounded border border-azul-marino-100 bg-clip-padding px-3 py-2 text-gris-800 transition file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:cursor-pointer file:border-inherit file:bg-gris-800 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gris-400 hover:file:text-gris-800 focus:border-primary focus:text-gris-800 focus:shadow-te-primary focus:outline-none"
                    />
                </div>
                {/* Fecha inicio */}
                <div className="mt-1 flex flex-row">
                    <div className="sm-sii:w-1/4 mr-4 sm-sii:mr-0">
                        <label className="text-lg text-gris-700 text-sm" id="fecha-protocolo">Fecha inicio proyecto:</label>
                        <input 
                            type="date"
                            name="fecha_inicio"
                            id="fecha_inicio"
                            value={fecha_inicio}
                            onChange={e => onChange(e)}
                            required
                            className="block py-2 px-3 text-gris-800 leading-tight  focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded h-9"
                        />
                    </div>
                    <div hidden={fecha_termino === null}>
                        <label className="text-lg text-gris-700 text-sm" id="fecha-protocolo">Fin periodo del proyecto:</label>
                        <p className="text-gris-900 cursor-default">{formatDate(fecha_termino)}</p>
                    </div>    
                </div>
                {/* Encargado proyecto */}
                <div className="mt-1 sm-sii:w-1/2">
                    <div className="flex items-end">
                        <label className="text-gris-700 text-sm" id="encargado-institucion">Encargado proyecto:</label>
                        <div className="ml-auto">
                            <a 
                                className="anchor-agregarPersona cursor-pointer"
                                onClick={() => setShowModalAgregarPersona(true)}
                            >      
                                <PlusIcon className="h-6 w-6 text-gris-600 hover:text-azul-cobalto-400 inline" />
                            </a>
                        <Tooltip key="tooltipAgregar" anchorSelect=".anchor-agregarPersona" place="top">Agregar persona</Tooltip>
                        </div>
                    </div>   
                    <ComboboxSelect 
                        key="encargadoIE"
                        onChange={encargadoChange}
                        options={personasOptions}
                        label="encargadoInstitucion"

                    />
                    <span className="text-rojo-400 text-sm" hidden={protocoloValidations.encargado}>Debe seleccionar un encargado.</span>
                </div>
                {/* Investigadores proyecto */}
                <div className="mt-1 sm-sii:w-1/2">
                    <div className="flex items-end">
                        <label className="text-gris-700 text-sm" id="encargado-institucion">Investigador/es del proyecto:</label>
                        <div className="ml-auto">
                            {investigadores.length >= 2 &&(
                                <>
                                    <a 
                                        className="anchor-eliminarInvestigador cursor-pointer"
                                        onClick={handleEliminarInvestigador}
                                    >      
                                        <UserMinusIcon className="h-6 w-6 text-gris-600 hover:text-azul-cobalto-400 inline mr-1"/>
                                    </a>
                                    <Tooltip key="tooltipAgregar" anchorSelect=".anchor-eliminarInvestigador" place="top">Eliminar investigador</Tooltip>
                                </>
                            )}
                            <a 
                                className="anchor-agregarInvestigador cursor-pointer"
                                onClick={handleAgregarInvestigador}
                            >      
                                <UserPlusIcon className="h-6 w-6 text-gris-600 hover:text-azul-cobalto-400 inline" />
                            </a>
                            <Tooltip key="tooltipAgregar" anchorSelect=".anchor-agregarInvestigador" place="top">Agregar investigador</Tooltip>
                            
                            
                        </div>
                        

                    </div>
                    {investigadores.map((investigador, index) => (                           
                            <ComboboxSelect 
                                key={`investigador_${index}`}
                                onChange={investigadoresChange}
                                options={personasOptions}
                                label="encargadoInstitucion"
                                index={index}
                            />
                    ))}
                    <span className="text-rojo-400 text-sm" hidden={protocoloValidations.investigadores}>Debe seleccionar él o los investigadores.</span>
                    <span className="text-rojo-400 text-sm" hidden={protocoloValidations.investigadores2}>Los investigadores no se pueden repetir.</span>                      
                </div>
                {/* Asignación de horario */}
                <div className="mt-1">
                    <label className="text-gris-700 text-sm" id="horario-institucion">Asignación de horario:</label>
                    <div className="flex sm-sii:flex-row flex-col">
                    <p className="text-gris-900 mr-4">Juan Fernández</p>
                    <div>
                        <BloquesSelection 
                            bloques={bloquesOcupados}
                            onChange={bloqueChange}
                        />                       
                    </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-rojo-400 text-sm" hidden={protocoloValidations.jornada}>Debe seleccionar al menos una jornada.</span>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <button
                    type="submit"
                    className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150">
                        Agregar
                    </button>
                </div>
   
            </form> 

        </div>
        {loading && <Loading message={'Ingresando protocolo de uso'}/>}
        <ModalAgregarPersona 
            active={showModalAgregarPersona}
            closeModal={handleAgregarPersona}
            institucion_id={institucion.id}
        />
        </>
    )
}

const mapStateToProps = state => ({
    personasInstitucion: state.institucion_reducer.personasInstitucion,
})

export default connect (mapStateToProps, {
    get_personas_institucion,
    add_protocolo,
}) (ProtocoloMINHACIENDA);
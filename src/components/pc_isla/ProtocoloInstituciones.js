import { useEffect, useState } from "react";
import ComboboxSelect from "./ComboboxSelect";
import { connect } from "react-redux";
import { get_personas_institucion } from "redux/actions/pc_isla/pc_isla";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";
import ModalAgregarPersona from "./ModalAgregarPersona";

function ProtocloInstituciones({
    get_personas_institucion,
    institucion,
    personasInstitucion
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
        proyecto: "",
        documento: "",
        fecha_documento: "",
        encargado: "",
        investigadores: [],
        //periodo 
        // jornada
    });

    const {
        proyecto,
        documento,
        fecha_documento,
        encargado,
        investigadores,
        //periodo,
        //jornada,
    } = formData;

    // Agregar persona
    const [showModalAgregarPersona, setShowModalAgregarPersona] = useState(false);
    const handleAgregarPersona = () => {
        setShowModalAgregarPersona(false);
    }

    return (
        <>
            <div className="mb-2 px-6 pb-4 pt-4 bg-gris-300">
                <h1 className="text-xl text-gris-800 cursor-default">Protocolo de uso</h1>
                <form 
                    //</div>onSubmit={console.log('yahu')} 
                    method="POST" 
                    action="#"
                >
                    <div className="mt-1">
                        <label className="text-lg text-gris-700 text-sm" id="documento-protocolo">Adjuntar protocolo de uso:</label>
                        <input 
                            type='file'
                            id='documentoProtocolo'
                            name='documentoProtocolo'
                            accept=".pdf, .PDF"
                            required
                            //onChange={console.log('subí documento')}
                            className="block w-full rounded border border-azul-marino-100 bg-clip-padding px-3 py-2 text-gris-800 transition file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:cursor-pointer file:border-inherit file:bg-gris-800 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gris-400 hover:file:text-gris-800 focus:border-primary focus:text-gris-800 focus:shadow-te-primary focus:outline-none"
                        />
                    </div>
                    <div className="mt-1 sm-sii:w-1/4">
                        <label className="text-lg text-gris-700 text-sm" id="fecha-protocolo">Fecha firma protocolo:</label>
                        <input 
                            type="date"
                            id="fechaProtocolo"
                            value={fecha_documento}
                            //onChange={'onchange'}
                            required
                            className="block w-full py-2 px-3 text-gris-800 leading-tight  focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded h-9"
                        />
                    </div>
                    <div className="mt-1 sm-sii:w-1/2">
                        <div className="flex items-end">
                            <label className="text-gris-700 text-sm" id="encargado-institucion">Encargado proyecto:</label>
                            <div className="ml-auto">
                                <a 
                                    className="anchor-agregarPersona cursor-pointer"
                                    onClick={() => setShowModalAgregarPersona(true)}
                                >      
                                    <PlusIcon className="h-6 w-6 text-gris-600 hover:text-verde-esmeralda-400 inline" />
                                </a>
                            <Tooltip key="tooltipAgregar" anchorSelect=".anchor-agregarPersona" place="top">Agregar persona</Tooltip>
                            </div>
                        </div>   
                        <ComboboxSelect 
                            key="encargadoIE"
                            onChange={'ya no sé qué se hace'}
                            options={personasOptions}
                            label="encargadoInstitucion"

                        />
                    </div> 
                </form>
            </div>
            <ModalAgregarPersona 
                active={showModalAgregarPersona}
                closeModal={handleAgregarPersona}
                institucion_id={institucion.id}
            />
</>
    );
}

const mapStateToProps = state => ({
    personasInstitucion: state.institucion_reducer.personasInstitucion,
})

export default connect (mapStateToProps, {
    get_personas_institucion,
}) (ProtocloInstituciones);
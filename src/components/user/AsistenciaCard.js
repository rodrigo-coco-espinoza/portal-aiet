import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/20/solid";
import ComboboxSelect from "components/pc_isla/ComboboxSelect";
import ComboboxSelected from "components/pc_isla/ComboboxSelected";
import { useState } from "react";
import { connect } from "react-redux";
import { Tooltip } from "react-tooltip";
import { registrar_ingreso, registrar_salida } from "redux/actions/pc_isla/pc_isla";

function AsistenciaCard({
    data,
    registrar_ingreso,
    registrar_salida,
    user,
    showAlert,    
}) {

    const salida_options = [
        {id: 'fin jornada', full_name: 'Fin jornada'},
        {id: 'proceso ejecutándose', full_name: 'Proceso ejecutándose'},
        {id: 'extracción de datos', full_name: 'Extracción de datos'},
        {id: 'otro', full_name: 'Otro'}
    ]

    const { 
        id,
        codigo,
        sigla,
        nombre,
        extendido,
        pronto_a_terminar,
        dia,
        fecha,
        equipo,
        jornada,
        ingreso,
        salida,
        extra,
        investigadores,
    } = data

    // Registrar ingreso
    // Investigadores
    const [selectedInvestigadores, setSelectedInvestigadores] = useState([""]);
    const investigadoresChange = async (e, label, index) => {
        const updatedInvestigadores = selectedInvestigadores;
        updatedInvestigadores[index] = e.id;
        setSelectedInvestigadores(updatedInvestigadores);
    };

    const handleAgregarInvestigador = () => {
        setSelectedInvestigadores([...selectedInvestigadores, ""]);
    };

    const handleEliminarInvestigador = () => {
        const updatedInvestigadores = selectedInvestigadores.slice(0, -1);
        setSelectedInvestigadores(updatedInvestigadores);
    };

    // Validar investigadores
    const [validations, setValidations] = useState({
        investigadores: true,
        investigadores2: true,
    });

    const validateIngreso = () => {
        // Todos los investigadores seleccionados
        const investigadoresValid = !selectedInvestigadores.some(element => element === "");

        // No se repiten investigadores
        let investigadores2Valid = true;
        if (investigadoresValid) {
            for (let i = 0; i < investigadores.length; i++) {
                const currentElement = selectedInvestigadores[i];
                for (let j = i + 1; j < selectedInvestigadores.length; j++) {
                    if (currentElement === selectedInvestigadores[j]) {
                        investigadores2Valid = false;
                        break;
                    }
                }
            }
        }

        const allValidations = Object.values({
            investigadores: investigadoresValid,
            investigadores2: investigadores2Valid
        }).every((validation) => validation);

        setValidations({
            ...validations,
            investigadores: investigadoresValid,
            investigadores2: investigadores2Valid
        });

        return allValidations;
    };



    const handleIngreso = () => {
        if (validateIngreso()) {
            
            const formData = new FormData();
            formData.append('id_asistencia', id);
            formData.append('investigadores', selectedInvestigadores);
            registrar_ingreso(formData);
            showAlert('Ingreso registrado exitosamente.')
        }

    };

    // Registrar salida
    const [motivo, setMotivo] = useState('fin jornada');
    const motivoChange = ( e ) => {
        setMotivo(e.id);
    };
    const handleSalida = () => {
        const formData = new FormData();
        formData.append('motivo', motivo);
        formData.append('id_asistencia', id);
        registrar_salida(formData);
        showAlert('Salida registrada exitosamente.')

    };

    return (
        <div className="max-w-sm p-4 bg-white border border-gris-300 rounded-lg shadow h-full flex flex-col">
            <h5 className="mb-0 text-xl font-bold tracking-tight text-gris-800 cursor-default">{sigla}</h5>
            <div className="mb-3">
            <p className="mb-1 font-normal text-gris-700 cursor-default">{nombre} (cód: {codigo})</p>
            {extendido &&
                <p className="mb-0 font-normal text-sm text-gris-600 cursor-default">Plazo extendido</p>
            }
            {pronto_a_terminar &&
                <p className="mb-0 font-normal text-sm text-rosa-400 cursor-default">Projecto próximo a terminar. {!extendido && <span>Recuerde pedir extensión del plazo con anticipación.</span>}</p>
            }

            

            </div>
            <p className="mb-1 font-normal text-sm text-gris-600">{dia} {fecha} {extra ? "(jornada extra)" : ""}</p>
            <p className="mb-1 font-normal text-sm text-gris-600">{equipo} - Horario {jornada}</p>
            { 
            ingreso ? 
            <>
                <p className="mb-1 font-normal text-sm text-gris-600">Ingreso {ingreso}</p>

                {
                salida ? 
                    <p className="mb-1 font-normal text-sm text-gris-600">Salida {salida}</p>
                :
                    <>
                    <label className="text-gris-600 text-sm mt-3">Seleccionar motivo</label>
                    <ComboboxSelected 
                        options={salida_options}
                        optionSelected={salida_options[0]}
                        onChange={motivoChange}
                    />
                    <button
                    onClick={handleSalida}
                    className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mt-3 mb-0 ease-linear transition-all duration-150"
                    >
                        Registrar salida
                    </button>

                    </>
                }


            </>
                
            :
            <>
                {/* Select investigadores */}
                <div className="mt-1">
                    <div className="flex items-end">
                        <label className="text-gris-700 text-sm">Investigador/es asistente/s:</label>
                            <div className="ml-auto">
                                {selectedInvestigadores.length >= 2 && (
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
                        {selectedInvestigadores.map((investigador, index) => (                           
                                <ComboboxSelect 
                                    key={`investigador_${index}`}
                                    onChange={investigadoresChange}
                                    options={investigadores}
                                    label="encargadoInstitucion"
                                    index={index}
                                />
                        ))}
                        <span className="text-rojo-400 text-sm" hidden={validations.investigadores}>Debe seleccionar él o los investigadores.</span>
                        <span className="text-rojo-400 text-sm" hidden={validations.investigadores2}>Los investigadores no se pueden repetir.</span>                      
                    </div>

                <button
                onClick={handleIngreso}
                className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mt-3 mb-0 ease-linear transition-all duration-150"
                >
                    Registrar ingreso
                </button>
            </>
            }

        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
});
export default connect (mapStateToProps, {
    registrar_ingreso,
    registrar_salida
})(AsistenciaCard);

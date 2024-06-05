import { useEffect, useState } from "react";
import { get_jornadas_minhacienda, update_jornadas_minhacienda } from "redux/actions/pc_isla/pc_isla";
import { connect } from "react-redux";
import Loading from "./Loading";


function ModalEditarJornada({
    active,
    closeModal,
    jornadasHacienda,
    update_jornadas_minhacienda,
    jornadaUpdated,
}) {

    useEffect(() => {
        // Actualizar el estado interno cuando cambie el estado de jornadasHacienda
        setSelectedProyectos({
            lunes: {
                AM: jornadasHacienda.horario[0].AM,
                PM: jornadasHacienda.horario[0].PM,
            },
            martes: {
                AM: jornadasHacienda.horario[1].AM, 
                PM: jornadasHacienda.horario[1].PM
            },
            miércoles: {
                AM: jornadasHacienda.horario[2].AM, 
                PM: jornadasHacienda.horario[2].PM
            },
            jueves: {
                AM: jornadasHacienda.horario[3].AM, 
                PM: jornadasHacienda.horario[3].PM
            },
            viernes: {
                AM: jornadasHacienda.horario[4].AM, 
                PM: jornadasHacienda.horario[4].PM
            }
        });
    }, [jornadasHacienda]);



    const [selectedProyectos, setSelectedProyectos] = useState({
        lunes: {
            AM: jornadasHacienda.horario[0].AM,
            PM: jornadasHacienda.horario[0].PM,
        },
        martes: {
            AM: jornadasHacienda.horario[1].AM, 
            PM: jornadasHacienda.horario[1].PM
        },
        miércoles: {
            AM: jornadasHacienda.horario[2].AM, 
            PM: jornadasHacienda.horario[2].PM
        },
        jueves: {
            AM: jornadasHacienda.horario[3].AM, 
            PM: jornadasHacienda.horario[3].PM
        },
        viernes: {
            AM: jornadasHacienda.horario[4].AM, 
            PM: jornadasHacienda.horario[4].PM
        }
    });

    
    const handleChange = (e, dia, horario, proyectoId) => {
        const updatedProyectos = { ...selectedProyectos };
        updatedProyectos[dia][horario] = proyectoId === updatedProyectos[dia][horario] ? null : proyectoId;
        setSelectedProyectos(updatedProyectos);

    };


    // Cerrar modal
    const handleClose = () => {
        setSelectedProyectos(
            {

                lunes: {
                    AM: jornadasHacienda.horario[0].AM,
                    PM: jornadasHacienda.horario[0].PM,
                },
                martes: {
                    AM: jornadasHacienda.horario[1].AM, 
                    PM: jornadasHacienda.horario[1].PM
                },
                miércoles: {
                    AM: jornadasHacienda.horario[2].AM, 
                    PM: jornadasHacienda.horario[2].PM
                },
                jueves: {
                    AM: jornadasHacienda.horario[3].AM, 
                    PM: jornadasHacienda.horario[3].PM
                },
                viernes: {
                    AM: jornadasHacienda.horario[4].AM, 
                    PM: jornadasHacienda.horario[4].PM
                }
            }
        );
        closeModal();
    };


    // Actualizar jornadas
    const [loading, setLoading] = useState(false);

    const onClick = () => {
        // Comprobar que hayan cambios 
        for (const element of jornadasHacienda.horario) {
            if (element.AM !== selectedProyectos[element.dia]['AM'] || element.PM !== selectedProyectos[element.dia]['PM']) {
                setLoading(true);
                // Actualizar jornadas
                update_jornadas_minhacienda(selectedProyectos)
                    .then(() => {
                        setLoading(false);
                        // Activar alert
                        jornadaUpdated();
                        // Cerrar modal
                        closeModal();
                        

                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                    });
                break;
            } else {
                setLoading(false);
                // Activar alert
                jornadaUpdated();
                // Cerrar modal
                closeModal();
            }
        }

        

    };
    
    if (active) {
        return (
            <>
                <div className="bg-opacity-25 fixed inset-0 z-40 bg-black">
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 -top-20 outline-none focus:outline-none">
                        <div className="relative lg:w-full w-5/6 my-6 mx-auto max-w-3xl">
                            {/* content */}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gris-100 outline-none focus:outline-none bg-opacity-100" onClick={(e) => e.stopPropagation()}>
                                {/* header */}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gris-400 rounded-t">
                                    <h3 className="text-2xl font-semibold">Editar jornadas Juan Fernández</h3>
                                </div>
                                {/* body */}
                                <div className="relative px-6 pb-2 pt-6 flex-auto mx-auto">
                                    <div className="flex flex-row">

                                    {/* Columna proyectos */}
                                    <div className="flex flex-col sm-sii:w-[250px] w-[110px]">
                                        <div className="invisible">Día</div>
                                        <div className="invisible">Jornada</div>
                                        {jornadasHacienda.proyectos.map((proyecto, index) => (
                                            <div key={`div_proyecto_${index}`} className="text-gris-700 mr-3 mb-2 text-xs sm-sii:text-sm truncate">
                                                {proyecto.nombre}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Columnas días */}
                                    {jornadasHacienda.horario.map((item, index) => (
                                        <div key={`key_dia_${index}`} className="text-center text-gris-800 sm-sii:w-[92px]">
                                            <div className="">
                                                {window.innerWidth < 1024 ? item.dia.charAt(0).toUpperCase() : item.dia.charAt(0).toUpperCase() + item.dia.slice(1)}
                                            </div>
                                            {/* Jornadas*/}
                                            <div key={`key_div_${index}`} className="flex flex-row justify-center px-3">
                                                {/* Inputs AM */}
                                                <div className="flex-col sm-sii:mx-auto mr-1">
                                                    <div className="text-xs sm-sii:text-sm">AM</div>
                                                    {jornadasHacienda.proyectos.map((proyecto, index) => (
                                                        <div className="flex-col mt-1">
                                                            <input 
                                                                key={`key_AM_${index}`}
                                                                type="radio"
                                                                name={`${item.dia}_AM`}
                                                                id={`${item.dia}_AM_${proyecto.id}`}
                                                                value={`${item.dia}_AM_${proyecto.id}`}
                                                                checked={selectedProyectos[item.dia].AM === proyecto.id}
                                                                onClick={(e) => handleChange(e, item.dia, 'AM', proyecto.id)}
                                                                readOnly
                                                            />
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Inputs PM */}
                                                <div className="flex-col sm-sii:mx-auto">
                                                    <div className="text-xs sm-sii:text-sm">PM</div>
                                                    {jornadasHacienda.proyectos.map((proyecto, index) => (
                                                        <div className="flex-col mt-1">
                                                            <input 
                                                                key={`key_PM_${index}`}
                                                                type="radio"
                                                                name={`${item.dia}_PM`}
                                                                id={`${item.dia}_PM_${proyecto.id}`}
                                                                value={`${item.dia}_PM_${proyecto.id}`}
                                                                checked={selectedProyectos[item.dia].PM === proyecto.id}
                                                                onClick={(e) => handleChange(e, item.dia, 'PM', proyecto.id)}
                                                                readOnly
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>

                                {/* footer */}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gris-400 rounded-b">
                                    <button
                                    onClick={onClick}
                                    className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150 mr-3">
                                        Actualizar
                                    </button>
                                
                                    <button
                                    onClick={handleClose}
                                    className="text-rojo-300 hover:text-rojo-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150" type="button">
                                        Cerrar
                                </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {loading && <Loading message={'Actualizando jornadas'}/>}
            </>
        )
    } else {
        return (<></>)
    }
}

const mapStateToProps = state => ({
    jornadasHacienda: state.institucion_reducer.jornadasHacienda,
});

export default connect (mapStateToProps, {
    update_jornadas_minhacienda,
})(ModalEditarJornada);
import { useState } from "react";
import ComboboxSelect from "./ComboboxSelect";
import { Alert, select } from "@material-tailwind/react";
import BloquesSelection from "./BloquesSelection";
import { connect } from "react-redux";
import { add_jornada_extra } from "redux/actions/pc_isla/pc_isla";
import Loading from "./Loading";

let equiposOptions = [
    {id: 'Bora Bora', full_name: "Bora Bora"},
    {id: 'Rapa Nui', full_name: "Rapa Nui"},
    {id: 'Juan Fernández', full_name: 'Juan Fernández'}
]

function JornadaExtra({
    id_proyecto,
    bloquesOcupados,
    add_jornada_extra,
})

{
    // Form jornada extra
    const [formData, setFormData] = useState({
        id: id_proyecto,
        fecha: "",
        equipo: "",
        jornada_am: [], 
        jornada_pm: [],
    });

    const {
        id,
        fecha,
        equipo,
        jornada_am,
        jornada_pm
    } = formData;

    // Selección de equipo y jornada
    const [bloquesOptions, setBloquesOptions] = useState(null);
    const equipoChange = (e) => {
        setFormData({
            ...formData,
            equipo: e.id
        });
        setBloquesOptions({options: bloquesOcupados[e.id]});
    };

    const bloqueChange = (selection) => {
        setFormData({
            ...formData,
            jornada_am: selection.am,
            jornada_pm: selection.pm
        });
    };
    
    // Validaciones
    const [validations, setValidations] = useState({
        equipo: true,
        jornada: true,
        jornada2: true,
    });

    const validateForm = () => {
        // Validar equipo
        const equipoValid = equipo !== "";

        // Validar jornada
        let jornadaValid = true;
        if (jornada_am.length === 0 && jornada_pm.length === 0) {
            jornadaValid = false;
        }

        let jornadaValid2 = true;
        if (jornada_am.length > 1 || jornada_pm.length > 1) {
            jornadaValid2 = false;
        }

        if (jornada_am.length > 0 && jornada_pm.length > 0) {
            jornadaValid2 = false;
        }

        const allValidations = Object.values({
            equipo: equipoValid,
            jornada: jornadaValid,
            jornada2: jornadaValid2
        }).every((validation) => validation);

        setValidations({
            ...validations,
            equipo: equipoValid,
            jornada: jornadaValid,
            jornada2: jornadaValid2
        });

        return allValidations;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            // Registar jornada extra
            add_jornada_extra(formData)
                .then(() => {
                    setFormData({
                        id: id_proyecto,
                        fecha: "",
                        equipo: "",
                        jornada_am: [], 
                        jornada_pm: [],
                    });
                    setBloquesOptions(null); 
                    setLoading(false);
                    setAlertJornadaExtra(true);
                    setForceRender(prevState => !prevState);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                })
            

        }
    };

    // Mensajes
    const [alertJornadaExtra, setAlertJornadaExtra] = useState(false);
    const [loading, setLoading] = useState(false);
    const [forceRender, setForceRender] = useState(false);





    return (
        <>
        <div className="mt-8">
            <Alert
                open={alertJornadaExtra}
                onClose={() => setAlertJornadaExtra(false)}
                onDirectionLock={(e) => e.stopPropagation()}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 }
                }}
                className="relative max-w-[28rem] sm-sii:max-w-[40rem] transform -top-3 z-50 bg-verde-esmeralda-300 mx-auto"         
            >
                Jornada extra registrada exitosamente.
            </Alert>
            <h1 className="font-bold text-gris-800 cursor-default">Agregar jornada extra</h1>
            <form onSubmit={e => {onSubmit(e)}} method="POST" action="#">
                <div className="mt-1 sm-sii:w-1/3 w-1/2 pr-3">
                    <label className="text-gris-700 text-sm">Fecha jornada extra:</label>
                    <input 
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={fecha}
                        onChange={e => setFormData({...formData, fecha: e.target.value})}
                        required
                        className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded h-9"
                    />
                </div>
            
                <div className="mt-1">           
                    <label className="text-gris-700 text-sm">Selección de horario:</label>
                    <div className="flex sm-sii:flex-row flex-col">
                        <ComboboxSelect
                            key='equipo'
                            options={equiposOptions}
                            onChange={e => equipoChange(e)}
                            label='equipo'
                            render={forceRender}
                        />
                        { bloquesOptions &&
                            <BloquesSelection 
                                bloques={bloquesOptions}
                                onChange={bloqueChange}
                            />

                        }
                    </div>
                    <div className="flex flex-col">
                        <span className="text-rojo-400 text-sm" hidden={validations.equipo}>Debe seleccionar un equipo.</span>
                        <span className="text-rojo-400 text-sm" hidden={validations.jornada}>Debe seleccionar una jornada.</span>
                        <span className="text-rojo-400 text-sm" hidden={validations.jornada2}>Debe seleccionar solo una jornada extra.</span>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <button
                    type='submit'
                    className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150">
                        Agregar
                    </button>
                </div>
            </form>
        </div>
        {loading && <Loading message={'Por favor, espere'}/>}
        </>
    );

}

const mapStateToProps = state => ({

});

export default connect (mapStateToProps, {
    add_jornada_extra,
}) (JornadaExtra);
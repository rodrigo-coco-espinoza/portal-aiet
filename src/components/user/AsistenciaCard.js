import ComboboxSelected from "components/pc_isla/ComboboxSelected";
import { useState } from "react";
import { connect } from "react-redux";
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
        {id: 'otro', full_name: 'Otro'}
    ]

    const { 
        id,
        sigla,
        nombre,
        dia,
        fecha,
        equipo,
        jornada,
        ingreso,
        salida,
        extra
    } = data

    // Registrar ingreso
    const handleIngreso = () => {
        const formData = new FormData();
        formData.append('id_asistencia', id);
        registrar_ingreso(formData);
        showAlert('Ingreso registrado exitosamente.')
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
            <p className="mb-4 font-normal text-gris-700 cursor-default">{nombre} (cód: {id})</p>
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
                <button
                onClick={handleIngreso}
                className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mt-3 mb-0 ease-linear transition-all duration-150"
                >
                    Registrar ingreso
                </button>
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

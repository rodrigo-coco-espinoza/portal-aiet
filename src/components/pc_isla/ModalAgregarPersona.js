import { useState } from "react";
import { connect } from "react-redux";
import { add_persona_institucion } from "redux/actions/pc_isla/pc_isla";

function ModalAgregarPersona({
    active,
    closeModal,
    personasInstitucion,
    institucion_id,
    add_persona_institucion
}) {

    // Change form
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        area: "",
        cargo: "",
    });

    const {
        nombre,
        email,
        telefono,
        area,
        cargo
    } = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // Submit form
    const [nombreValidation, setNombreValidation] = useState(true);
    const validateForm = () => {
        // Validar nombre
        const trimmedNombre = nombre.trim().toLocaleLowerCase();
        const nombreValid = personasInstitucion.some(persona => persona.nombre.toLocaleLowerCase() === trimmedNombre);

        setNombreValidation(!nombreValid);
        return !nombreValid;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            add_persona_institucion(formData, institucion_id);
            handleCloseModal({nuevaPersona: true});
        }
    }


    // Cerrar modal
    const handleCloseModal = ({e, nuevaPersona=false}) => {
        setFormData({
            nombre: "",
            email: "",
            telefono: "",
            area: "",
            cargo: ""
        });

        setNombreValidation(true);
        
        closeModal(nuevaPersona, nombre);
    };
    

    return (
        <>
        {active && (
            <div className="bg-opacity-25 fixed inset-0 z-40 bg-black">
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 -top-20 outline-none focus:outline-none">
                    <div className="relative sm-sii:w-full w-5/6 my-6 mx-auto max-w-3xl">
                        {/* content */}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gris-100 outline-none focus:outline-none bg-opacity-100" onClick={(e) => e.stopPropagation()}>
                            <form onSubmit={e=>{onSubmit(e)}} className="" action="#" method="POST">
                                {/* header */}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gris-400 rounded-t">
                                    <h3 className="text-2xl font-semibold cursor-default">
                                        Agregar nueva persona
                                    </h3>
                                </div>
                                {/* body */}
                                <div className="relative px-6 pt-6 flex-auto">
                                    <div className="mb-4">
                                        <label htmlFor="nombre" id="nombre-label" className="text-gris-700 text-sm ">Nombre</label>
                                        <input 
                                            id="nombre"
                                            name="nombre"
                                            value={nombre}
                                            onChange={e => onChange(e)}
                                            required
                                            className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded"
                                            placeholder="Ingrese nombre de la persona"
                                        />
                                        <span className="text-rojo-400 text-sm" hidden={nombreValidation}>Esta persona ya está registrada en esta institución.</span>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="email" id="email-label" className="text-gris-700 text-sm ">Correo electrónico</label>
                                        <input 
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={e => onChange(e)}
                                            required
                                            type="email"
                                            className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded"
                                            placeholder="Ingrese email de la persona"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="telefono" id="telefono-label" className="text-gris-700 text-sm ">Teléfono</label>
                                        <input 
                                            id="telefono"
                                            name="telefono"
                                            value={telefono}
                                            onChange={e => onChange(e)}
                                            className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded"
                                            placeholder="Ingrese teléfono de la persona"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="area" id="area-label" className="text-gris-700 text-sm ">Área</label>
                                        <input 
                                            id="area"
                                            name="area"
                                            value={area}
                                            onChange={e => onChange(e)}
                                            className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded"
                                            placeholder="Ingrese área en la que trabaja la persona"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="cargo" id="cargo-label" className="text-gris-700 text-sm ">Cargo</label>
                                        <input 
                                            id="cargo"
                                            name="cargo"
                                            value={cargo}
                                            onChange={e => onChange(e)}
                                            className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded"
                                            placeholder="Ingrese cargo que desempeña la persona"
                                        />
                                    </div>
                                </div>
                                {/* footer */}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gris-200 rounded-b">
                                    <button
                                    type="submit"
                                    className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150 mr-3">
                                        Agregar
                                    </button>
                                    
                                    <button
                                    onClick={handleCloseModal}
                                    className="text-rojo-300 hover:text-rojo-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150" type="button">
                                        Cerrar
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>

            </div>
        )}
        </>
    );
}

const mapStateToProps = state => ({
    personasInstitucion: state.institucion_reducer.personasInstitucion,
})
export default connect(mapStateToProps, {
    add_persona_institucion,
})(ModalAgregarPersona);
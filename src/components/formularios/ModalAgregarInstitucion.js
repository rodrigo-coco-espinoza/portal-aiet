import { useState, useEffect } from "react";
import { connect } from "react-redux";
import ComboboxSelect from "./ComboboxSelect";
import { add_institucion } from "redux/actions/pc_isla/pc_isla";
import { Alert } from "@material-tailwind/react";

let comboboxSelections = {
    ministerio: -1,
    tipo: -1
};

const tipoOptions = [
    {
        id: 'empresa pública',
        full_name: 'Empresa pública'
    },
    {
        id: 'ministerio',
        full_name: 'Ministerio'
    },
    {
        id: 'municipalidad',
        full_name: 'Municipalidad'
    },
    {
        id: 'servicio público',
        full_name: 'Servicio público'
    },
    {
        id: 'privado',
        full_name: 'Privado'
    },


]


function ModalAgregarInstitucion({
    active,
    ministeriosOptions,
    institucionesOptions,
    closeModal,
    add_institucion,
    user
}) 
{
    const [formData, setFormData] = useState({
        nombre: "",
        sigla: "",
        rut: "",
        direccion: "",
        tipo: "", 
        ministerio: "",
    })

    const {
        nombre,
        sigla,
        rut,
        direccion,
        tipo,
        ministerio
    } = formData

    const [isDisabled, setIsDisabled] = useState(false);

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const comboboxChange = (e, role) => {
        comboboxSelections[role] = e.id
    }
    const comboboxChangeTipo = (e, role) => {
        comboboxSelections[role] = e.id
        if (e.id === "ministerio" || e.id === "privado"){
            setIsDisabled(true);
            comboboxSelections['ministerio'] = null;
        } else {
            setIsDisabled(false);
        }
    }



    const [validations, setValidations] = useState({
        nombre: true,
        sigla: true,
        sigla2: true,
        rut: true,
        tipo: true,
        ministerio: true,
    })

    const validateForm = (data) => {

        // Validar nombre
        const filteredNames = institucionesOptions.map(item => {
            const name = item.full_name.split(" ").slice(1).join(" ");
            return { ...item, name: name };
        })
        const nombreValid = !filteredNames.some(item => item.name === data.nombre);
        
        // Validar sigla
        const siglaValid = /^[A-Z]+$/.test(data.sigla);

        // Validar sigla 2
        const filteredSiglas = institucionesOptions.map(item => {
            const sigla = item.full_name.split(" ")[0];
            return { ...item, sigla: sigla}
        });
        const sigla2Valid = !filteredSiglas.some(item => item.sigla === data.sigla )

        // Validar rut
        let rutValid;
        if (data.rut !== ""){
            rutValid =  /^(\d{8}-\d{1}|\d{8}-K)$/.test(data.rut);
        } else {
            rutValid = true;
        }
        
        // Validar tipo
        const tipoValid = data.tipo !== -1;

        // Validar ministerio
        let ministerioValid;
        if (data.tipo !== 'ministerio' || data.tipo !== 'privado'){
            ministerioValid = data.ministerio !== -1;
        } else {
            ministerioValid = true;
        }

        const allValidations = Object.values({
            nombre: nombreValid,
            sigla: siglaValid,
            sigla2: sigla2Valid,
            rut: rutValid,
            tipo: tipoValid,
            ministerio: ministerioValid,
        }).every((validation) => validation);
    
        setValidations({
            ...validations,
            nombre: nombreValid,
            sigla: siglaValid,
            sigla2: sigla2Valid,
            rut: rutValid,
            tipo: tipoValid,
            ministerio: ministerioValid,
        });
    
        return allValidations;
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const updatedFormData = { ...formData, ...comboboxSelections };
        if (validateForm(updatedFormData)){ 
            add_institucion(updatedFormData)
            handleCloseModal({nuevaInstitucion: true})
        }
        
    }

    
    const handleCloseModal = ({e, nuevaInstitucion=false}) => {
        setFormData({
            nombre: "",
            sigla: "",
            rut: "",
            direccion: "",
            tipo: "", 
            ministerio: ""
        });

        comboboxSelections = {
            ministerio: -1,
            tipo: -1
        };

        setIsDisabled(false);

        setValidations({
            nombre: true,
            sigla: true,
            sigla2: true,
            rut: true,
            tipo: true,
            ministerio: true,
        })
       
        closeModal(nuevaInstitucion);
    }

    return (
        <>
        {active && (
        <div className="bg-opacity-25 fixed inset-0 z-40 bg-black">
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 -top-20 outline-none focus:outline-none">
            <div className="relative sm-sii:w-full w-5/6 my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gris-100 outline-none focus:outline-none bg-opacity-100" onClick={(e) => e.stopPropagation()}>

                <form onSubmit={e=>{onSubmit(e)}} className="" action="#" method="POST">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gris-400 rounded-t">
                        <h3 className="text-2xl font-semibold cursor-default">
                            Agregar nueva institución
                        </h3>

                    </div>
                    {/*body*/}
                    <div className="relative px-6 pt-6 flex-auto">
                        <div className="mb-4">
                            <label htmlFor="nombre" id="nombre-label" className="text-gris-700 text-sm ">Nombre de la institución</label>
                            <input 
                                id="nombre"
                                name="nombre"
                                value={nombre}
                                onChange={e=>onChange(e)}
                                required
                                className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded"
                                placeholder="Ingrese nombre de la institución"
                            />
                            <span className="text-rojo-400 text-sm" hidden={validations.nombre}>Esta institución ya está registrada.</span>
                        </div>

                        <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/2 sm:pr-3">
                                <div className="mb-4 ">
                                    <label className="text-gris-700 text-sm" htmlFor="sigla" id="sigla-label">Sigla</label>
                                    <input 
                                        id="sigla"
                                        name="sigla"
                                        value={sigla}
                                        onChange={e=>onChange(e)}
                                        required
                                        className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded"
                                        placeholder="Ingrese SIGLA"
                                    />
                                    <span className="text-rojo-400 text-sm" hidden={validations.sigla}>La sigla debe contener solo letras mayúsculas.</span>
                                    <span className="text-rojo-400 text-sm" hidden={validations.sigla2}>Esta sigla ya está registrada.</span>
                                </div>
                            </div>
                            <div className="sm:w-1/2">
                                <div className="mb-4">
                                    <label className="text-gris-700 text-sm" htmlFor="rut" id="ge-label">RUT</label>
                                    <input 
                                        id='rut'
                                        name='rut'
                                        value={rut}
                                        onChange={e=>onChange(e)}
                                        required
                                        className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded h-9"
                                        placeholder="12345678-9"
                                    />
                                    <span className="text-rojo-400 text-sm" hidden={validations.rut}>El RUT debe tener el formato 12345678-K.</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="direccion" id="direccion-label" className="text-gris-700 text-sm">Dirección</label>
                            <input 
                                id="direccion"
                                name="direccion"
                                value={direccion}
                                onChange={e=>onChange(e)}
                                className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded"
                                placeholder="Ingrese direcciónde la institución"
                            />
                        </div>

                        <div className="flex mb-4">
                            <div className="w-1/3 pr-3">
                                <div className="">
                                    <label className="text-gris-700 text-sm" id="tipo-label">Tipo de institución</label>
                                    <ComboboxSelect
                                        key="tipo"
                                        onChange={comboboxChangeTipo}
                                        options={tipoOptions}
                                        label="tipo"
                                    />
                                    <span className="text-rojo-400 text-sm" hidden={validations.tipo}>Debe seleccionar el tipo de institución.</span>
                                </div>
                            </div>
                            <div className="w-2/3" hidden={isDisabled}>
                                <div>
                                    <label className="text-gris-700 text-sm" id="ministerio-label">Ministerio al que pertenece</label>
                                    <ComboboxSelect 
                                        key="ministerio"
                                        onChange={comboboxChange}
                                        options={ministeriosOptions}
                                        label="ministerio"
                                    />
                                    <span className="text-rojo-400 text-sm" hidden={validations.ministerio}>Debe seleccionar una opción.</span>
                                </div>
                            </div>
                            </div>
                    </div>

                    {/*footer*/}
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
    )

}

const mapStateToProps = state => ({
    user: state.auth.user,
    ministeriosOptions: state.institucion_reducer.ministeriosOptions,
    institucionesOptions: state.institucion_reducer.institucionesOptions,
})
export default connect (mapStateToProps, {
    add_institucion
})(ModalAgregarInstitucion)


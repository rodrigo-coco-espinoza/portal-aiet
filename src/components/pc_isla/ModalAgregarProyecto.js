import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { add_proyecto } from "redux/actions/pc_isla/pc_isla"
import ComboboxSelect from "components/formularios/ComboboxSelect"
import { PlusIcon } from "@heroicons/react/20/solid"
import { Tooltip } from "react-tooltip"
import ModalAgregarInstitucion from "components/formularios/ModalAgregarInstitucion"
import { Alert } from "@material-tailwind/react"


let comboboxSelections = {
    institucion: "",
    encargado: "",
    backup: "",
}

function ModalAgregarProyecto({
    active,
    institucionesOptions, 
    closeModal,
    add_proyecto,
    encargadosPcIslaOptions,
    proyectosPcIsla,
    showAlertNuevo,
    user,
    
}) {
   
    const [formData, setFormData] = useState({
        institucion: "",
        nombre: "",
        objetivo: "",
        gabinete: "",
        encargado: "",
        backup: "",
        documento: null,
        fecha: "",
    });

    const {
        institucion,
        nombre,
        objetivo,
        gabinete,
        encargado,
        backup,
        documento,
        fecha,
    } = formData

    const onChange = e => {  
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }
    const comboboxChange = (e, role) => {
        comboboxSelections[role] = e.id
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFormData({ ...formData, documento: selectedFile });
      };
    

    const textAreaRef = useRef(null)
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
    }, [objetivo]);
    
    const [validations, setValidations] = useState({
        institucion: true,
        nombre: true,
        gabinete: true,
        encargado: true,
        backup: true,
        backup2: true,
    });

    const validateForm = (data) => {

        // Validar nombre
        const proyectosInstitucion = proyectosPcIsla.find((inst) => inst.id_institucion === data.institucion);
        const nombreValid = proyectosInstitucion ? 
            !proyectosInstitucion.proyectos.some((proyecto) => 
                proyecto.nombre.trim().toLowerCase() === data.nombre.trim().toLowerCase()
            ) 
            : true;

        // Validar institución
        const institucionValid = data.institucion !== "";

        // Validar encargado
        const encargadoValid = data.encargado !== "";

        // Validar backup
        const backupValid = data.backup !== "";
        let backup2Valid = true;
        if (data.encargado !== "" && data.backup !== ""){
            backup2Valid = data.encargado !== data.backup;
        }
        
        // Validar gabinete
        let gabineteValid;
        if (data.gabinete !== ""){
            gabineteValid = /^GE\d+$/.test(data.gabinete);
        };
        
        const allValidations = Object.values({
            nombre: nombreValid,
            institucion: institucionValid,
            encargado: encargadoValid,
            backup: backupValid,
            backup2: backup2Valid,
            gabinete: gabineteValid,
        }).every((validation) => validation);

        setValidations({
            ...validations,
            nombre: nombreValid,
            institucion: institucionValid,
            encargado: encargadoValid,
            backup: backupValid,
            backup2: backup2Valid,
            gabinete: gabineteValid,
        });

        return allValidations;
    }


    const onSubmit = async (e) => {
        e.preventDefault()
        const updatedFormData = { ...formData, ...comboboxSelections };

        if (validateForm(updatedFormData)){
            const formDataToSend = new FormData();
    
            for (const key in updatedFormData) {
                formDataToSend.append(key, updatedFormData[key]);
            }
    
            try {
                await add_proyecto(formDataToSend);
                showAlertNuevo(nombre);
                handleCloseModal();
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    }

    const handleCloseModal = () => {
        setFormData({
            institucion: "",
            nombre: "",
            objetivo: "",
            gabinete: "",
            encargado: "",
            backup: "",
            documento: null,
            fecha: "",
        });

        comboboxSelections = {
            institucion: "",
            encargado: "",
            backup: "",
        }

        setValidations({
            institucion: true,
            nombre: true,
            gabinete: true,
            encargado: true,
            backup: true,
            backup2: true,
        })

        closeModal();
    };

    const [openAlert, setOpenAlert] = useState(false);
    const [showModalAgregarInstitucion, setShowModalAgregarInstitucion] = useState(false)
    const handleClickAgregar = (nuevaInstitucion) => {
        setShowModalAgregarInstitucion(false)
        if (nuevaInstitucion){
            setOpenAlert(true)
        }
        
    }
        return (
            <>
            {active && (
            <div className="bg-opacity-25 fixed inset-0 z-40 bg-black">
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 sm-sii:-top-20 outline-none focus:outline-none">
                <div className="relative sm-sii:w-full w-5/6 my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <Alert
                        open={openAlert}
                        onClose={() => setOpenAlert(false)}
                        onClick={(e) => e.stopPropagation()}
                        animate={{
                            mount: { y: 0 },
                            unmount: { y: 100 },
                        }}
                        className="relative max-w-[28rem] sm-sii:max-w-[40rem] transform -top-3 z-50 bg-verde-esmeralda-300 mx-auto"
                    >
                        Institución agregada correctamente.
                    </Alert>
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gris-100 outline-none focus:outline-none bg-opacity-100" onClick={(e) => e.stopPropagation()}>

                    <form onSubmit={e=>{onSubmit(e)}} className="" action="#" method="POST">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gris-400 rounded-t">
                            <h3 className="text-2xl font-semibold cursor-default">
                                Agregar nuevo proyecto
                            </h3>

                        </div>
                        {/*body*/}
                        <div className="relative px-6 pt-6 flex-auto">
                            <div>
                                <div className="mb-4">
                                    <div className="flex items-end">
                                        <label className="text-gris-700 text-sm" id="instituciones-label">Institución</label>
                                        <div className="ml-auto">
                                        <a 
                                            className="anchor-agregarInstitucion cursor-pointer"
                                            onClick={() => setShowModalAgregarInstitucion(true)}
                                        >      
                                            <PlusIcon className="h-6 w-6 text-gris-600 hover:text-verde-esmeralda-400 inline" />
                                        </a>
                                        <Tooltip key="tooltipAgregar" anchorSelect=".anchor-agregarInstitucion" place="top">Agregar institución</Tooltip>
                                        </div>
                                    </div>                               
                                    <ComboboxSelect
                                        key="institucion"
                                        onChange={comboboxChange}
                                        options={institucionesOptions}
                                        label="institucion"
                                    />
                                    <span className="text-rojo-400 text-sm" hidden={validations.institucion}>Debe seleccionar una institución.</span>
                                </div>
                
                                <div className="mb-4">
                                    <label htmlFor="nombre" id="nombre-label" className="text-gris-700 text-sm">Nombre del proyecto</label>
                                    <input 
                                    id='nombre'
                                    name='nombre'
                                    value={nombre}
                                    onChange={e=>onChange(e)}
                                    required
                                    className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded"
                                    placeholder="Ingrese nombre del proyecto"
                                    />
                                    <span className="text-rojo-400 text-sm" hidden={validations.nombre}>Este nombre ya está registrado para esta institución.</span>
                                </div>

                                <label htmlFor="objetivo" id="objetivo-label" className="text-gris-700 text-sm">Objetivo del proyecto</label>
                                <textarea 
                                    id='objetivo'
                                    name='objetivo'
                                    value={objetivo}
                                    onChange={e=>onChange(e)}
                                    required
                                    className="whitespace-normal block w-full mb-4 py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded min-h-0 h-auto max-h-[500px]"
                                    rows='3'
                                    ref={textAreaRef}
                                    placeholder="Ingrese texto"
                                />

                                <div className="flex mb-4">
                                    <div className="w-1/2 pr-3">
                                        <label className="text-gris-700 text-sm" id="encargado-label">Encargado del proyecto</label>
                                        <ComboboxSelect
                                            key="encargado"
                                            onChange={comboboxChange}
                                            options={encargadosPcIslaOptions}
                                            label="encargado"
                                        />
                                        <span className="text-rojo-400 text-sm" hidden={validations.encargado}>Debe seleccionar un encargado.</span>
                                    </div>
                                    <div className="w-1/2">
                                        <label className="text-gris-700 text-sm" id="backup-label">Backup</label> 
                                        <ComboboxSelect 
                                            key="backup"
                                            onChange={comboboxChange}
                                            options={encargadosPcIslaOptions}
                                            label="backup"
                                        />
                                        <span className="text-rojo-400 text-sm" hidden={validations.backup}>Debe seleccionar un backup.</span>
                                        <span className="text-rojo-400 text-sm" hidden={validations.backup2}>El backup debe ser distinto del encargado.</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                        <label className="text-gris-700 text-sm" htmlFor="documento">Oficio recibido</label>
                                        <input
                                            type="file"
                                            id="documento"
                                            name="documento"
                                            accept=".pdf, .PDF"
                                            required
                                            onChange={handleFileChange}
                                            className="block w-full rounded border border-azul-marino-100 bg-clip-padding px-3 py-2 text-gris-800 transition file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid
                                            file:cursor-pointer
                                            file:border-inherit file:bg-gris-800 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gris-400 hover:file:text-gris-800 focus:border-primary focus:text-gris-800 focus:shadow-te-primary focus:outline-none"

                                        />

                                    </div>
                                <div className="flex flex-row">
                                    <div className="sm-sii:w-1/4 w-1/2 pr-3">
                                        <label className="text-gris-700 text-sm" htmlFor="fecha" id="fecha-label">Fecha oficio</label>
                                        <input 
                                            type="date"
                                            id='fecha'
                                            name='fecha'
                                            value={fecha}
                                            onChange={e=>onChange(e)}
                                            required
                                            className="block w-full mb-4 py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded h-9"
                                        />
                                    </div>
                                    <div className="sm-sii:w-3/4 w-1/2 mb-4">
                                        <label className="text-gris-700 text-sm" htmlFor="gabinete" id="ge-label">Número GE</label>
                                        <input 
                                            id='gabinete'
                                            name='gabinete'
                                            value={gabinete}
                                            onChange={e=>onChange(e)}
                                            required
                                            className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded h-9"
                                            placeholder="GE0012345"
                                        />
                                        <span className="text-rojo-400 text-sm" hidden={validations.gabinete}>El número de gabinete debe tener el formato GE0012345.</span>
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
            
            <ModalAgregarInstitucion 
                    active={showModalAgregarInstitucion}
                    closeModal={handleClickAgregar}
                />

        </> 
        )

}

const mapStateToProps = state => ({
    user: state.auth.user,
    institucionesOptions: state.institucion_reducer.institucionesOptions,
    encargadosPcIslaOptions: state.institucion_reducer.encargadosPcIslaOptions,
    proyectosPcIsla: state.institucion_reducer.proyectosPcIsla,
})
export default connect (mapStateToProps, {
    add_proyecto
} )(ModalAgregarProyecto)

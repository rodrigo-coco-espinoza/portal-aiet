import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { edit_query } from "redux/actions/queries/queries"

function ModalEditar({
    active, 
    closeModal,
    query_data,
    edit_query,
    user
    
}) {
    

    const [formData, setFormData] = useState({
        nombre: query_data.nombre,
        texto: query_data.texto,
        id: query_data.id
    })

    const {
        nombre,
        texto,
        id,
    } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

    const textAreaRef = useRef(null)
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
    }, [texto]);
    

    const onSubmit = e => {
        e.preventDefault()
        edit_query(formData)
        closeModal()
        
    }

    const handleCloseModal = () => {
        setFormData({
            ...formData,
            nombre: query_data.nombre,
            texto: query_data.texto
        })
        closeModal()
    }

    if (active) {
        return (
            <>
            <div className="bg-opacity-25 fixed inset-0 z-40 bg-black" onClick={handleCloseModal}>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 -top-20 outline-none focus:outline-none">
                <div className="relative lg:w-full w-5/6 my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gris-100 outline-none focus:outline-none bg-opacity-100" onClick={(e) => e.stopPropagation()}>
                    <form onSubmit={e=>{onSubmit(e)}} className="" action="#" method="POST">
                        <input type="hidden" id="id" name="id" value={id} />
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gris-400 rounded-t">
                            <h3 className="text-2xl font-semibold">
                                Editar query
                            </h3>

                        </div>
                        {/*body*/}
                        <div className="relative px-6 pt-6 flex-auto">
                            <div>
                                <input 
                                id='nombre'
                                name='nombre'
                                value={nombre}
                                onChange={e=>onChange(e)}
                                required
                                className="block w-full mb-4 py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-gris-100 rounded"
                                />

                                <textarea 
                                    id='texto'
                                    name='texto'
                                    value={texto}
                                    onChange={e=>onChange(e)}
                                    required
                                    className="whitespace-pre block w-full mb-4 py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-gris-100 rounded min-h-0 h-auto max-h-[500px]"
                                    rows={texto.split(/\r\n|\r|\n/).length}
                                    ref={textAreaRef}
                                />
                            </div> 
                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-gris-400 rounded-b">
                            <button
                            type="submit"
                            className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150 mr-3">
                                Guardar
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
        </> 
        )
    } else {
        return (
            <></>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})
export default connect (mapStateToProps, {
    edit_query
} )(ModalEditar)

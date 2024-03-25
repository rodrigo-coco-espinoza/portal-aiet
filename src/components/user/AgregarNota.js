import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { add_nota } from "redux/actions/queries/queries"

function AgregarNota({
    idQuery,
    add_nota,
    onAddNota,
}){
    const [formData, setFormData] = useState({
        texto: "",
        idQuery: idQuery
    })
    const {texto} = formData
      

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault()
        const notaData = await add_nota(formData)
        if (onAddNota){
            onAddNota(notaData.nuevaNota)
        }

        setFormData({...formData, texto: ""})
    }

    useEffect(() => {
        setFormData((prevFormData) => ({
            texto: "",
            idQuery: idQuery
        }))
    }, [idQuery])

    return(
        <>
           <form action="#" method="post" onSubmit={e=>{onSubmit(e)}}>
                <input 
                    id="texto" 
                    name="texto" 
                    placeholder="Ingrese nuevo comentario"
                    required
                    value={texto}
                    onChange={e=>onChange(e)}
                    className="block w-full mt-6 mb-2 rounded p-2 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100"
                    />
                <div className="mb-6 flex justify-end">
                    <button
                        type="Submit"
                        className="text-gris-600 hover:text-verde-esmeralda-400 font-bold text-xs outline-none focus:outline-none ease-linear transition-all duration-150">
                        AGREGAR
                    </button>
                </div>
                
           </form>
        </>
    )
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, {
    add_nota
})(AgregarNota)
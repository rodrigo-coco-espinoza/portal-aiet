import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { change_password } from "redux/actions/auth/auth"

function ModalPassword({
    active, 
    closeModal,
    change_password,
    user
    
}) {

    const [formData, setFormData] = useState({
        new_password: "",
        re_new_password: ""
    })

    const {
        new_password,
        re_new_password,
    } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        if (new_password === re_new_password){
            change_password(new_password)
            closeModal()
            setFormData({
                new_password: "",
                re_new_password: ""
            })
        } else {
            console.log("las contraseña no coinciden.")
        }
        
    }
   
    if (active) {
        return (
            <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 -top-20 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gris-200 rounded-t">
                            <h3 className="text-2xl font-semibold text-gris-700">
                                Cambiar contraseña
                            </h3>

                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto max-h-[400px]">
                        
                        <form onSubmit={e=>{onSubmit(e)}} className="" action="#" method="POST">

                               
                                <div>
                                    <input 
                                    id='new_password'
                                    name='new_password'
                                    value={new_password}
                                    type='password'
                                    onChange={e=>onChange(e)}
                                    required
                                    placeholder="Nueva contraseña"
                                    className="block w-full mb-4 py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-naranja-200 rounded"
                                    />

                                <input 
                                    id='re_new_password'
                                    name='re_new_password'
                                    value={re_new_password}
                                    type='password'
                                    onChange={e=>onChange(e)}
                                    required
                                    placeholder="Confirme nueva contraseña"
                                    className="block w-full mb-4 py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-naranja-200 rounded"
                                    />
                                </div>
                                
                                <div>

                                
                                <button
                                    type="submit"
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-naranja-300 py-2 px-4 text-sm font-medium text-white hover:bg-naranja-400 focus:outline-none focus:ring-2 focus:ring-naranja-400 focus:ring-offset-2"
                                >
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    </span>
                                    Actualizar
                                </button>
                                </div>
                            </form>
                        

                            
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-gris-200 rounded-b">
                            <button
                            onClick={closeModal}
                             className="text-rojo-300 hover:text-rojo-400 background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150" type="button">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
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
    change_password
} )(ModalPassword)

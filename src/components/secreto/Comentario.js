
import { useState } from "react"

function Comentario({data, nombreTarea}) {
    const [showModal, setShowModal] = useState(false)

    if (data){
        return(
            <>
                <button type="button" onClick={() => setShowModal(true)}>
                    <div className="mb-1 grid grid-cols-[90px_auto]">
                        <div className="text-gris-700 font-bold">
                            {data[0].fecha}
                        </div>
                        <div className="text-slate-500">
                            {data[0].texto}
                        </div>
                    </div>
                </button>


                {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 -top-20 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-gris-200 rounded-t">
                                        <h3 className="text-2xl font-semibold">
                                            Comentarios <br/>{nombreTarea}
                                        </h3>

                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto max-h-[400px] overflow-y-auto">
                                    {data.map((comentario) => (
                                        <div className="mb-2 grid grid-cols-[90px_auto]">  
                                            <div className="text-gris-700 font-bold">
                                                {data[0].fecha}
                                            </div>
                                            <div className="text-slate-500">
                                                {data[0].texto}
                                            </div>
                                        </div>
                                    ))}

                                    

                                        
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-gris-200 rounded-b">
                                        <button className="text-rojo-400 background-transparent font-bold uppercase px-6 py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)}>
                                            Cerrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </>




    )
    } else {
       return(
        <></>
       )
    }

    
}

export default Comentario
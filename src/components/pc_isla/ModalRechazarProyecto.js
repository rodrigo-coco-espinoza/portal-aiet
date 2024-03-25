function ModalRechazarProyecto({
    active,
    closeModal,
    rechazarProyecto
}) {

    const onClick = e => {
        e.preventDefault();
        rechazarProyecto();
        closeModal();
    };

    if (active) {
        return (
            <>
            <div 
                className="bg-opacity-25 fixed inset-0 z-40 bg-black"
                onClick={e => closeModal()} 
            >
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 -top-20 outline-none focus:outline-none">
                    <div className="relative lg:w-full w-5/6 my-6 mx-auto max-w-3xl">
                        {/* content */}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gris-100 outline-none focus:outline-none bg-opacity-100" onClick={(e) => e.stopPropagation()}>
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gris-400 rounded-t">
                                <h3 className="text-2xl font-semibold">
                                    Rechazar proyecto
                                </h3>
                            </div>
                            {/*body*/}
                            <div className="relative px-6 pb-2 pt-6 flex-auto">
                                ¿Está seguro que desea eliminar este proyecto de la lista de proyectos activos? 
                            </div>

                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-gris-400 rounded-b">
                                <button
                                onClick={onClick}
                                className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150 mr-3">
                                    Eliminar
                                </button>
                            
                                <button
                                onClick={e => closeModal()}
                                className="text-rojo-300 hover:text-rojo-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150" type="button">
                                    Cerrar
                                </button>
                            </div>
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

export default ModalRechazarProyecto;
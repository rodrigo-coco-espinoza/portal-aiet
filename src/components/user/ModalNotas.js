import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { edit_query } from "redux/actions/queries/queries"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { DocumentTextIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";
import ModalEliminarNota from "./ModalEliminarNota";
import Nota from "./Nota";
import AgregarNota from "./AgregarNota"

function ModalNotas({
    active, 
    closeModal,
    notas,
    idQuery,
    queryAuthor,
    user
    
}) {

    const onClick = e => {
        e.preventDefault()
        closeModal()
        
    }

    const handleCloseModal = () => {
        closeModal()
    }

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, notas.length);

    // Slice the notas array to get only the items for the current page
    const notasToShow = notas.slice(startIndex, endIndex);

    const totalPages = Math.ceil(notas.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
        

    
    

        return (
            <>
            {active && (
                <div className="bg-opacity-25 fixed inset-0 z-40 bg-black" onClick={handleCloseModal}>
               <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 -top-20 outline-none focus:outline-none">
                <div className="relative lg:w-full w-5/6 my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gris-100 outline-none focus:outline-none bg-opacity-100" onClick={(e) => e.stopPropagation()}>
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gris-400 rounded-t">
                            <h3 className="text-2xl font-semibold">
                                Notas
                            </h3>

                        </div>
                        {/*body*/}
                        <div className="relative px-6 pb-2 pt-6 flex-auto">
                            {notas && notas.length > 0 ? (notasToShow.map((nota) => (
                                <Nota 
                                    key={nota.id}
                                    nota={nota}
                                    queryAuthor={queryAuthor}
                                />
                                ))) : (
                                    <p>Sin notas.</p>
                                )
                            }
                            {notas.length > 0 && 
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`${currentPage === 1 ? 'bg-gris-400' : 'bg-azul-brillante-400 hover:bg-azul-marino-400'} text-white px-0.5 py-0.5 rounded-md mr-2`}
                                    >
                                        <ChevronLeftIcon className="w-6 h-6"/>
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`${currentPage === totalPages ? 'bg-gris-400' : 'bg-azul-brillante-400 hover:bg-azul-marino-400'} text-white px-0.5 py-0.5 rounded-md`}
                                    >
                                            <ChevronRightIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            }

                            <AgregarNota 
                                idQuery={idQuery}
                            />
                        </div>
                        

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-gris-400 rounded-b">       
                            <button
                                onClick={handleCloseModal}
                                className="text-rojo-300 hover:text-rojo-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150" type="button">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={() => console.log('click')}></div> */}

        
        </div>
            )}
        </> 
        )
    }

const mapStateToProps = state => ({
    user: state.auth.user
})
export default connect (mapStateToProps, {
    
} )(ModalNotas)

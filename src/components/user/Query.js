import { DocumentTextIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import ModalEditar from "./ModalEditar";
import ModalEliminar from "./ModalEliminar";
import ModalNotas from "./ModalNotas";

function Query({query}){

    const [showModalEditar, setShowModalEditar] = useState(false)
    const handleClickEditar = () => {
        setShowModalEditar(false)
    }

    const [showModalEliminar, setShowModalEliminar] = useState(false)
    const handcleClickEliminar = () => {
        setShowModalEliminar(false)
    }

    const [showModalNotas, setShowModalNotas] = useState(false)
    const handleClickNotas = () => {
        setShowModalNotas(false)
    }

    return ( 
        <>

        <div
           // Assuming you have an "id" property in each nota object
          className="flex flex-col my-3 px-2 py-2 rounded-lg shadow-lg bg-white mb-2 grid"
        >
            <div className="text-gris-600 text-xs">{query.author.persona.nombre}
            </div>
            <div className="text-gris-800 flex items-start">
                <span>{query.nombre}</span>
                <div className="ml-auto flex inline-block">
                    <a 
                        className="anchor-editar"
                        onClick={() => setShowModalEditar(true)}>

                        <PencilSquareIcon 
                            className="h-6 w-6 text-gris-600 hover:text-gris-900 inline"
                        />
                    </a>
                    <Tooltip 
                        key="tooltipEditar" 
                        anchorSelect=".anchor-editar" 
                        place="top">
                        Editar
                    </Tooltip>
                    
                    <a 
                        className="anchor-notas"
                        onClick={() => setShowModalNotas(true)}>
                        <DocumentTextIcon 
                            className="h-6 w-6 text-gris-600 hover:text-gris-900 inline"
                        />
                    </a>
                    <Tooltip key="tooltipNotas"   anchorSelect=".anchor-notas" place="top">Notas</Tooltip>
                    
                    <a
                        className="anchor-eliminar"
                        onClick={() => setShowModalEliminar(true)}>                       
                        <XMarkIcon 
                            className="h-7 w-7 text-gris-600 hover:text-rojo-400 inline"
                        />
                    </a>
                    <Tooltip key="tooltipEliminar"  anchorSelect=".anchor-eliminar" place="top">Eliminar</Tooltip>
                </div>
            </div>
        </div>  
        <ModalEditar
            key={`modalEditar_${query.id}`}
            active={showModalEditar}
            closeModal={handleClickEditar}
            query_data={query && query}
        />
        <ModalEliminar 
            key={`modalEliminar_${query.id}`}
            active={showModalEliminar}
            closeModal={handcleClickEliminar}
            id={query.id}
        />
        <ModalNotas
            key={`modalNotas_${query.id}`}
            active={showModalNotas}
            closeModal={handleClickNotas}
            notas={query.notas}
            idQuery={query.id}
        />
        </>
    )
}

export default Query;
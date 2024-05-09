import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";
import ModalEliminarNota from "./ModalEliminarNota";
import { connect } from "react-redux"

function Nota({
    nota,
    user,
    onDeleteNota,
}){

    const [showModalEliminarNota, setShowModalEliminarNota] = useState(false)
    const handcleClickEliminarNota = () => {
        setShowModalEliminarNota(false)
    }
    
    return (
        <>
            <div className="my-3 px-2 py-2 rounded-lg shadow-lg bg-white mb-2">
                <div>
                    {nota.author && (
                        <div className="relative flex items-start">
                            <p className="text-gris-600 text-xs">{nota.author.persona.nombre} el {nota.fecha_creacion}: 
                            </p>
                            {(user && (user.is_buscador_admin || nota.author.id === user.id))  && 
                            <div className="absolute right-0 -top-1">
                                <a  className="anchor-eliminar"
                                    onClick={() => setShowModalEliminarNota(true)}
                                >                       
                                    <XMarkIcon 
                                    className="h-6 w-6 text-gris-600 hover:text-rojo-400 inline"
                                    />
                                </a>
                                <Tooltip anchorSelect=".anchor-eliminar" place="top">Eliminar</Tooltip>
                            </div>
                            }
                        </div>

                    )}
                    <p className="text-gris-900 leading-tight pt-1">{nota.texto}</p>                     
                </div>
                
            </div>
            <ModalEliminarNota
                key={`modalEliminarNota_${nota.id}`}
                active={showModalEliminarNota}
                closeModal={handcleClickEliminarNota}
                id={nota.id}
                onDeleteNota={onDeleteNota}
            />
        </>
)
}

const mapStateToProps = state => ({
    user: state.auth.user,
})

export default connect (mapStateToProps, {
} )(Nota)
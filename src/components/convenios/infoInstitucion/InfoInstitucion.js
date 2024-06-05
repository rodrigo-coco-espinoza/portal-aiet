import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { Tooltip } from "react-tooltip";

function InfoInstitucion({
    data,
    user,
}){

    return(
        <div className="p-4 shadow-lg rounded-xl bg-white w-full mt-6">
            <div className="flex items-end mb-2">
                <p className="font-bold text-xl text-gris-800 w-full">Información de la institución</p>
                { (user && (user.is_convenios_admin || user.is_convenios_editor)) && 
                <div className="ml-auto">
                <a 
                    className="anchor-editar cursor-pointer"
                    //onClick={() => setShowModalAgregarProyecto(true)}
                >      
                    <PencilSquareIcon className="h-6 w-6 text-gris-600 hover:text-verde-esmeralda-400 inline" />
                </a>
                <Tooltip key="tooltipAgregar" anchorSelect=".anchor-editar" place="top">Editar institución</Tooltip>
                </div>
                }
            </div>   

            <div class="flex mt-3">
                <div class="flex-1 text-left">
                    <p className="text-gris-700 text-sm ">Sigla:</p>
                    <p className="text-gris-900 leading-tight pt-0">{data.sigla}</p>

                    <p className="text-gris-700 text-sm mt-2">Nombre:</p>
                    <p className="text-gris-900 leading-tight pt-0">{data.nombre}</p>
            
                    <p className="text-gris-700 text-sm mt-2">Encargado SII:</p>
                    <p className="text-gris-900 leading-tight pt-0">{data.encargadoSII.nombre}</p>

                    <p className="text-gris-700 text-sm mt-2">Backup SII:</p>
                    <p className="text-gris-900 leading-tight pt-0">{data.backupSII.nombre}</p>

                </div>

                <div class="flex-1 text-left ml-5 sm:ml-0">

                    <p className="text-gris-700 text-sm ">RUT:</p>
                    <p className="text-gris-900 leading-tight pt-0">{data.rut}</p>

                    <p className="text-gris-700 text-sm mt-2">Dirección:</p>
                    <p className="text-gris-900 leading-tight pt-0">{data.direccion}</p>

                    <p className="text-gris-700 text-sm mt-2">Tipo de institución:</p>
                    <p className="text-gris-900 leading-tight pt-0">{data.tipoInstitucion}</p>

                    <p className="text-gris-700 text-sm mt-2">Pertence al:</p>
                    <p className="text-gris-900 leading-tight pt-0">{data.pertenencia}</p>




                </div>

            </div>
        </div>
    )
}
export default InfoInstitucion;
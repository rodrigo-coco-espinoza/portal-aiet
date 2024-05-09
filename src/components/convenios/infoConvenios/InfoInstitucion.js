import { Link } from "react-router-dom"

function InfoInstitucion(){
    return(
        <div className="p-4 shadow-lg rounded-xl bg-white w-full">
            <p className="font-bold text-xl">Información de la institución</p>

            <div class="flex">

                <div class="flex-1 text-left">

                    <p className="text-gris-600 text-xs mt-2">Sigla</p>
                    <p className="text-gris-900 leading-tight pt-0">COCHILCO</p>

                    <p className="text-gris-600 text-xs mt-2">Nombre</p>
                    <p className="text-gris-900 leading-tight pt-0">Comisión Chilena del Cobre</p>

                    <p className="text-gris-600 text-xs mt-2">Link repositorio</p>
                    <p className="text-gris-900 leading-tight pt-0"><a href="https://www.google.com">Haga click para acceder al repositorio</a></p> 
            
                    <p className="text-gris-600 text-xs mt-2">Encargado y backup SII</p>
                    <p className="text-gris-900 leading-tight pt-0">Cristian Gutiérrez (Rodrigo Espinoza)</p>

                </div>

                <div class="flex-1 text-left ml-5 sm:ml-0">

                    <p className="text-gris-600 text-xs mt-2">RUT</p>
                    <p className="text-gris-900 leading-tight pt-0">61.706.000-0</p>

                    <p className="text-gris-600 text-xs mt-2">Dirección</p>
                    <p className="text-gris-900 leading-tight pt-0">Agustinas 1161, Santiago</p>

                    <p className="text-gris-600 text-xs mt-2">Tipo de institución</p>
                    <p className="text-gris-900 leading-tight pt-0">Servicio Público</p>

                    <p className="text-gris-600 text-xs mt-2">Pertenece al</p>
                    <p className="text-gris-900 leading-tight pt-0">Ministerio de Minería (MINMINERIA)</p>




                </div>

            </div>
        </div>
    )
}

export default InfoInstitucion
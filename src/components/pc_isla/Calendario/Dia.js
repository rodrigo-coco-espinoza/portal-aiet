import ExtraIcon from "assets/img/ExtraIcon"
import { CheckCircleIcon } from "@heroicons/react/20/solid"

function Dia({ datos, estiloFondo, esUltima = false }) {
    return (
        <div className={`${estiloFondo} ${esUltima ? 'mb-2' : 'mb-1'} h-[50px] flex items-center justify-center relative`}>
            {datos.tipo === 'extra' && (
                <span className="absolute top-0.5 left-0.5">
                    <ExtraIcon />
                </span>
            )}
            {datos.asistencia === 'asistencia_completa' && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 text-green-600">
                    <CheckCircleIcon />
                </span>
            )}
            {datos.asistencia === 'ingreso_sin_salida' && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 text-amarillo-400">
                    <CheckCircleIcon />
                </span>
            )}
            <p className='text-sm p-2 text-gris-800'>
                {datos.institucion ? datos.institucion : ""}
                <br />
                <span className="line-clamp-1">
                    {datos.institucion ? datos.proyecto : ""}
                </span>
            </p>
        </div>
    );
}

export default Dia;
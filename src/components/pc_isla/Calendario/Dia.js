import React from 'react';
import ExtraIcon from "assets/img/ExtraIcon"
import { CheckCircleIcon } from "@heroicons/react/20/solid"


const Dia = ({tipo, asistencia, institucion, proyecto, AM=false, pasado, color, openAsistencia}) => {
    const bgColor = pasado ? 'bg-gris-600' : color;
    return (

        

        <div 
            className={`${bgColor} ${AM ? 'mb-1' : 'mb-2'} h-[50px] flex items-center justify-center relative ${pasado ? "" : "hover:bg-opacity-50 cursor-pointer"}`}
            onClick={() => openAsistencia()}

        >
            {tipo === 'extra' && <span className="absolute top-0.5 left-0.5"><ExtraIcon /></span>}
            {asistencia && <span className="absolute top-0.5 right-0.5 w-4 h-4 text-verde-oscuro-300"><CheckCircleIcon /></span>}
            <p className='text-sm p-2 text-gris-800'>
                {institucion ? institucion : ""}<br/><span className="line-clamp-1">{institucion ? proyecto : ""}</span>
            </p>
        </div>
    );
};


export default Dia;
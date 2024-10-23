import ExtraIcon from "assets/img/ExtraIcon"
import { CheckCircleIcon } from "@heroicons/react/20/solid"

function ColumnaDia({dataDia}) {

    return (
        <>
        {/* Días pasados y feriados */}
       {(dataDia.pasado || dataDia.feriado) && (
            <div className='flex flex-col mr-1 text-center flex-1'>
                {/* Día y fecha */}
                <div className='bg-gris-600 mb-2 h-[50px] flex items-center justify-center'>
                    <p className='font-bold text-gris-800'>
                        {dataDia.dia}<br />{dataDia.fecha}
                    </p>
                </div>
                {/* Juan Fernández */}
                <div>
                    {/* AM */}
                    <div className="bg-gris-600 mb-1 h-[50px] flex items-center justify-center relative">
                        {dataDia['Juan Fernández'].AM.extra && <span className="absolute top-0.5 left-0.5"><ExtraIcon /></span>}
                        {dataDia['Juan Fernández'].AM.asistencia && <span className="absolute top-0.5 right-0.5 w-4 h-4 text-verde-oscuro-300"><CheckCircleIcon /></span>}
                        <p className='text-sm p-2 text-gris-800'>
                            {dataDia['Juan Fernández'].AM.institucion ? dataDia['Juan Fernández'].AM.institucion : ""}<br/><span className="line-clamp-1">{dataDia['Juan Fernández'].AM.institucion ? dataDia['Juan Fernández'].AM.proyecto : ""}</span>
                        </p>
                    </div>
                    {/* PM */}
                    <div className="bg-gris-600 mb-2 h-[50px] flex items-center justify-center relative">
                        {dataDia['Juan Fernández'].PM.extra && <span className="absolute top-0.5 left-0.5"><ExtraIcon /></span>}
                        {dataDia['Juan Fernández'].PM.asistencia && <span className="absolute top-0.5 right-0.5 w-4 h-4 text-verde-oscuro-300"><CheckCircleIcon /></span>}
                        <p className='text-sm p-2 text-gris-800'>
                            {dataDia['Juan Fernández'].PM.institucion ? dataDia['Juan Fernández'].PM.institucion : ""}<br/><span className="line-clamp-1">{dataDia['Juan Fernández'].PM.institucion ? dataDia['Juan Fernández'].PM.proyecto : ""}</span>
                        </p>
                    </div>
                </div>
                {/* Bora Bora */}
                <div>
                    {/* AM */}
                    <div className="bg-gris-600 mb-1 h-[50px] flex items-center justify-center relative">
                        {dataDia['Bora Bora'].AM.extra && <span className="absolute top-0.5 left-0.5"><ExtraIcon /></span>}
                        {dataDia['Bora Bora'].AM.asistencia && <span className="absolute top-0.5 right-0.5 w-4 h-4 text-verde-oscuro-300"><CheckCircleIcon /></span>}
                        <p className='text-sm p-2 text-gris-800'>
                            {dataDia['Bora Bora'].AM.institucion ? dataDia['Bora Bora'].AM.institucion : ""}<br/><span className="line-clamp-1">{dataDia['Bora Bora'].AM.institucion ? dataDia['Bora Bora'].AM.proyecto : ""}</span>
                        </p>
                    </div>
                    {/* PM */}
                    <div className="bg-gris-600 mb-2 h-[50px] flex items-center justify-center relative">
                        {dataDia['Bora Bora'].PM.extra && <span className="absolute top-0.5 left-0.5"><ExtraIcon /></span>}
                        {dataDia['Bora Bora'].PM.asistencia && <span className="absolute top-0.5 right-0.5 w-4 h-4 text-verde-oscuro-300"><CheckCircleIcon /></span>}
                        <p className='text-sm p-2 text-gris-800'>
                            {dataDia['Bora Bora'].PM.institucion ? dataDia['Bora Bora'].PM.institucion : ""}<br/><span className="line-clamp-1">{dataDia['Bora Bora'].PM.institucion ? dataDia['Bora Bora'].PM.proyecto : ""}</span>
                        </p>
                    </div>
                </div>  
                {/* Rapa Nui */}
                <div>
                    {/* AM */}
                    <div className="bg-gris-600 mb-1 h-[50px] flex items-center justify-center p-2 relative">
                        {dataDia['Rapa Nui'].AM.extra && <span className="absolute top-0.5 left-0.5"><ExtraIcon /></span>}
                        {dataDia['Rapa Nui'].AM.asistencia && <span className="absolute top-0.5 right-0.5 w-4 h-4 text-verde-oscuro-300"><CheckCircleIcon /></span>}
                        <p className='text-sm p-2 text-gris-800'>
                            {dataDia['Rapa Nui'].AM.institucion ? dataDia['Rapa Nui'].AM.institucion : ""}<br/><span className="line-clamp-1">{dataDia['Rapa Nui'].AM.institucion ? dataDia['Rapa Nui'].AM.proyecto : ""}</span>
                        </p>
                    </div>
                    {/* PM */}
                    <div className="bg-gris-600 mb-2 h-[50px] flex items-center justify-center p-2 relative">
                        {dataDia['Rapa Nui'].PM.extra && <span className="absolute top-0.5 left-0.5"><ExtraIcon /></span>}
                        {dataDia['Rapa Nui'].PM.asistencia && <span className="absolute top-0.5 right-0.5 w-4 h-4 text-verde-oscuro-300"><CheckCircleIcon /></span>}
                        <p className='text-sm p-2 text-gris-800'>
                            {dataDia['Rapa Nui'].PM.institucion ? dataDia['Rapa Nui'].PM.institucion : ""}<br/><span className="line-clamp-1">{dataDia['Rapa Nui'].PM.institucion ? dataDia['Rapa Nui'].PM.proyecto : ""}</span>
                        </p>
                    </div>
                </div>  
            </div>
       )}

       {/* Días hábiles */}

       {(!dataDia.pasado && !dataDia.feriado) && (
            <div className='flex flex-col mr-1 text-center flex-1'>
                {/* Día y fecha */}
                <div className='bg-azul-marino-400 mb-2 h-[50px] flex items-center justify-center'>
                    <p className='font-bold text-white'>
                        {dataDia.dia}<br />{dataDia.fecha}
                    </p>
                </div>
                {/* Juan Fernádez */}
                <div>
                    {/* AM */}
                    <div className="bg-verde-esmeralda-100 mb-1 h-[50px] flex items-center justify-center relative">
                        {dataDia['Juan Fernández'].AM.extra && <span className="absolute top-0.5 left-0.5"><ExtraIcon /></span>}
                        {dataDia['Juan Fernández'].AM.asistencia && <span className="absolute top-0.5 right-0.5 w-4 h-4 text-verde-oscuro-300"><CheckCircleIcon /></span>}
                        <p className='text-sm p-2 text-gris-800'>
                            {dataDia['Juan Fernández'].AM.institucion ? dataDia['Juan Fernández'].AM.institucion : ""}<br/><span className="line-clamp-1">{dataDia['Juan Fernández'].AM.institucion ? dataDia['Juan Fernández'].AM.proyecto : ""}</span>
                        </p>
                    </div>
                    {/* PM */}
                    <div className="bg-verde-esmeralda-100 mb-2 h-[50px] flex items-center justify-center relative">
                        {dataDia['Juan Fernández'].PM.extra && <span className="absolute top-0.5 left-0.5"><ExtraIcon /></span>}
                        {dataDia['Juan Fernández'].PM.asistencia && <span className="absolute top-0.5 right-0.5 w-4 h-4 text-verde-oscuro-300"><CheckCircleIcon /></span>}
                        <p className='text-sm p-2 text-gris-800'>
                            {dataDia['Juan Fernández'].PM.institucion ? dataDia['Juan Fernández'].PM.institucion : ""}<br/><span className="line-clamp-1">{dataDia['Juan Fernández'].PM.institucion ? dataDia['Juan Fernández'].PM.proyecto : ""}</span>
                        </p>
                    </div>
                </div>
                {/* Bora Bora */}
                <div>
                    {/* AM */}
                    <div className="bg-azul-brillante-100 mb-1 h-[50px] flex items-center justify-center relative">
                        {dataDia['Bora Bora'].AM.extra && <span className="absolute top-0.5 left-0.5"><ExtraIcon /></span>}
                        {dataDia['Bora Bora'].AM.asistencia && <span className="absolute top-0.5 right-0.5 w-4 h-4 text-verde-oscuro-300"><CheckCircleIcon /></span>}
                        <p className='text-sm p-2 text-gris-800'>
                            {dataDia['Bora Bora'].AM.institucion ? dataDia['Bora Bora'].AM.institucion : ""}<br/><span className="line-clamp-1">{dataDia['Bora Bora'].AM.institucion ? dataDia['Bora Bora'].AM.proyecto : ""}</span>
                        </p>
                    </div>
                    {/* PM */}
                    <div className="bg-azul-brillante-100 mb-2 h-[50px] flex items-center justify-center relative">
                        {dataDia['Bora Bora'].PM.extra && <span className="absolute top-0.5 left-0.5"><ExtraIcon /></span>}
                        {dataDia['Bora Bora'].PM.asistencia && <span className="absolute top-0.5 right-0.5 w-4 h-4 text-verde-oscuro-300"><CheckCircleIcon /></span>}
                        <p className='text-sm p-2 text-gris-800'>
                            {dataDia['Bora Bora'].PM.institucion ? dataDia['Bora Bora'].PM.institucion : ""}<br/><span className="line-clamp-1">{dataDia['Bora Bora'].PM.institucion ? dataDia['Bora Bora'].PM.proyecto : ""}</span>
                        </p>
                    </div>
                </div>  
                {/* Rapa Nui */}
                <div>
                    {/* AM */}
                    <div className="bg-verde-oscuro-100 mb-1 h-[50px] flex items-center justify-center p-2 relative">
                        {dataDia['Rapa Nui'].AM.extra && <span className="absolute top-0.5 left-0.5"><ExtraIcon /></span>}
                        {dataDia['Rapa Nui'].AM.asistencia && <span className="absolute top-0.5 right-0.5 w-4 h-4 text-verde-oscuro-300"><CheckCircleIcon /></span>}
                        <p className='text-sm p-2 text-gris-800'>
                            
                            {dataDia['Rapa Nui'].AM.institucion ? dataDia['Rapa Nui'].AM.institucion : ""}<br/><span className="line-clamp-1">{dataDia['Rapa Nui'].AM.institucion ? dataDia['Rapa Nui'].AM.proyecto : ""}</span>
                        </p>
                    </div>
                    {/* PM */}
                    <div className="bg-verde-oscuro-100 mb-2 h-[50px] flex items-center justify-center p-2 relative">
                        {dataDia['Rapa Nui'].PM.extra && <span className="absolute top-0.5 left-0.5"><ExtraIcon /></span>}
                        {dataDia['Rapa Nui'].PM.asistencia && <span className="absolute top-0.5 right-0.5 w-4 h-4 text-verde-oscuro-300"><CheckCircleIcon /></span>}
                        <p className='text-sm p-2 text-gris-800'>
                            {dataDia['Rapa Nui'].PM.institucion ? dataDia['Rapa Nui'].PM.institucion : ""}<br/><span className="line-clamp-1">{dataDia['Rapa Nui'].PM.institucion ? dataDia['Rapa Nui'].PM.proyecto : ""}</span>
                        </p>
                    </div>
                </div>  
            </div>
       )}
       </> 

        
    )

}

export default ColumnaDia
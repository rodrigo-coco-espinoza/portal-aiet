import Comentario from "./Comentario"

function Tarea({data}){
    return(
        <>
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-gris-500 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-naranja-sii after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                {/* PlAZO */}
                <time className="sm:absolute left-6 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-16 h-6 mb-3 sm:mb-0 text-verde-oscuro-400 bg-verde-esmeralda-300 rounded-full">
                    {data.plazo}
                </time>
                {/* TAREA  */}
                <div className="text-xl font-bold text-slate-900">
                    {data.nombreTarea}
                </div>
            </div>
            {/* BITÁCORA */}
            {data.comentarios.map((comentario) => (
                <Comentario 
                    data={comentario}
                />
            ))}



        </>
    )
}

export default Tarea
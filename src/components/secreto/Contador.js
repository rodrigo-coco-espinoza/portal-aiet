function Contador({duracionTarea, plazoTarea, idTarea, duracionAcumulada, plazoAcumulado }){
    let colorPlazo = ""
    if (!duracionTarea){
        colorPlazo = "bg-gris-500 text-gris-700"
    } else if (duracionTarea > plazoTarea){
        colorPlazo = "bg-rosa-300 text-rojo-400"
    } else {
        colorPlazo = "bg-verde-esmeralda-300 text-verde-oscuro-400"
    }


    return(
        <div className="group flex">
        <time data-tooltip-target={`Contador_${idTarea}`} className={`sm:absolute -left-24 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-16 h-6 mb-3 sm:mb-0 rounded-full ${colorPlazo}`}>
        {duracionTarea}/{plazoTarea}
        </time>
        {duracionTarea !== null && (
            <span className="font-semibold absolute text-center rounded bg-gris-600 p-2 text-xs text-white hidden group-hover:block w-[120px] sm:-left-32 -top-12 -left-1">
                Días acumulados: <span className={`${ duracionAcumulada > plazoAcumulado ? "text-rojo-400" : "text-verde-oscuro-400"}`}>{duracionAcumulada}</span>/{plazoAcumulado}
            </span>
        )}
        </div>

            

        
    )
}

export default Contador
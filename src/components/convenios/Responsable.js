function Responsable({data, plazo, duracionTarea, idTarea}){
    
    let colorResponsable = ""
    if (!duracionTarea){
        colorResponsable = "bg-gris-500 text-gris-700"
    } else if (data.duracion > plazo){
        colorResponsable = "bg-rosa-200 text-rojo-300"
    } else {
        colorResponsable = "bg-verde-esmeralda-200 text-verde-oscuro-300"
    }

    return(

    <div className="group relative flex justify-center">
    <span data-tooltip-target={`${data.area}_${idTarea}`} className={`text-sm font-medium mr-0 px-2.5 py-0 rounded ml-2 ${colorResponsable}`}>{data.area}</span>
    {data.duracion !== null && (
        <span className="absolute text-center rounded bg-gris-600 p-2 text-xs text-white -top-9 hidden group-hover:block w-[105px]">{data.duracion} días hábiles</span>
    )}
    </div>
        
    )
}

export default Responsable


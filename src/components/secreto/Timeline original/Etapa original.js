import Tarea from "./Tarea"


function Etapa({data}) {
    return(
        <div className="relative pl-8 sm:pl-32 py-6 group">
            {/* ETAPA */}
            <div className="italic font-medium text-2xl text-azul-brillante-400 mb-1 sm:mb-0">
                {data.etapa}
            </div>           
            {data.tareas.map((tarea) => (
                <Tarea
                    data={tarea}
                />
            ))}
        </div>
    )
}

export default Etapa
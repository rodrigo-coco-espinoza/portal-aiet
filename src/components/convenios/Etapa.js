import Tarea from "./Tarea"


function Etapa({data}) {
    return(
        <div>
            {/* ETAPA */}
            <div className="italic font-medium text-2xl text-azul-brillante-400 mb-1 sm:mb-1 ml-7 mt-8">
                {data.etapa}
            </div>           
            {data.tareas.map((tarea) => (
                <Tarea
                    key={tarea.id}
                    data={tarea}
                />
            ))}
        </div>
    )
}

export default Etapa
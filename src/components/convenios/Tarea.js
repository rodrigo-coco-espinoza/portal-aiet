import Comentario from './Comentario.js'
import Contador from './Contador.js'
import EnCurso from './EnCurso.js'
import Responsable from './Responsable.js'

function Tarea({data}) {

    /* Primera tarea */
    if (data.nombreTarea === "Inicio del proceso"){
        return(
            <ol className="relative border-l-4 border-gris-300">                  
            <li className="pb-6 ml-6">
                {/* Círculo */}           
                <span className="absolute flex items-center justify-center w-4 h-4 rounded-full -left-2.5 top-1 ring-4 ring-gris-300 bg-naranja-sii"/>

                <h3 className="flex items-center mb-1 text-lg font-semibold text-gris-800">
                    {data.nombreTarea}
                    {data.enCurso ? <EnCurso /> : null}
                </h3>

                { /* Comentarios */}
                <Comentario 
                    data={data.comentarios}
                    nombreTarea={data.nombreTarea}
                />

                
            </li>      
        </ol> 
        )
    }


    /* Otras tareas */
    return(
        <ol className="relative border-l-4 border-gris-300">                  
            <li className="pb-6 ml-6">
                {/* Círculo */}           
                <span className={`absolute flex items-center justify-center w-4 h-4 rounded-full -left-2.5 top-1 ring-4 ring-gris-300 ${data.duracion ? "bg-naranja-sii" : "bg-gris-500"}`}/>
                
                {/* Plazo tarea */}
                <Contador
                    idTarea={data.id}  
                    duracionTarea={data.duracion}
                    plazoTarea={data.plazo}
                    duracionAcumulada={data.duracionAcumulada}
                    plazoAcumulado={data.plazoAcumulado}
                />

                <h3 className={`flex items-center mb-1 text-lg font-semibold ${data.duracion ? "text-gris-800" : "text-gris-500"}`}>
                    {data.nombreTarea}
                    {data.enCurso ? <EnCurso /> : null}

                    {data.responsables.map((responsable) => (
                        <Responsable
                            idTarea={data.id} 
                            data={responsable}
                            plazo={data.plazo}
                            duracionTarea={data.duracion}
                        />
                    ))}
                </h3>


                { /* Comentarios */}
                <Comentario 
                    data={data.comentarios}
                    nombreTarea={data.nombreTarea}
                />


                
            </li>      
        </ol>
    )
}

export default Tarea
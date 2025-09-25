import { connect } from "react-redux";
import ProyectoFinalizadoCard from "./ProyectoFinalizadoCard";
import { get_all_proyectos_finalizados } from "redux/actions/pc_isla/pc_isla";

function ProyectosFinalizados({
    proyectosPcIslaFinalizados,
    get_all_proyectos_finalizados
}){
    return(
        <div className="">
            <div className="w-full font-bold text-gris-700 text-4xl border-b-2 border-gris-500  cursor-default mt-16 mb-8">
                Proyectos finalizados
            </div>
            <div className="flex flex-wrap -mx-4">
                {proyectosPcIslaFinalizados.map((proyecto) => (
                    <div key={`div_finalizado_${proyecto.id}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-4">
                    <ProyectoFinalizadoCard
                        key={`proyecto_finalizado_${proyecto.id}`}
                        data={proyecto}
                    />
                    </div>
                ))}
            </div>
            {/* Botón cargar todos los proyectos finalizados */}
            <div className="flex justify-center mt-8">
                <button 
                    onClick={get_all_proyectos_finalizados}
                    className="bg-azul-brillante-400 text-white font-semibold py-2 px-4 rounded hover:bg-azul-brillante-300 transition duration-300">
                    Cargar más proyectos finalizados
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = state =>({
    proyectosPcIslaFinalizados: state.institucion_reducer.proyectosPcIslaFinalizados
})

export default connect(mapStateToProps, {
    get_all_proyectos_finalizados
})(ProyectosFinalizados)
import { connect } from "react-redux";
import ProyectoFinalizadoCard from "./ProyectoFinalizadoCard";

function ProyectosFinalizados({
    proyectosPcIslaFinalizados
}){
    return(
        <div className="">
            <div className="w-full font-bold text-gris-700 text-4xl border-b-2 border-gris-500  cursor-default mt-16 mb-8">
                Proyectos finalizados últimos 2 meses
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
        </div>
    )
}

const mapStateToProps = state =>({
    proyectosPcIslaFinalizados: state.institucion_reducer.proyectosPcIslaFinalizados
})

export default connect(mapStateToProps, {
})(ProyectosFinalizados)
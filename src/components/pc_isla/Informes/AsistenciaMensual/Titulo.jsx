function Titulo ({
    nombre,
    id,
    mes,
    sigla
}) {

    return (
        <div>
            <p className="text-xl font-bold text-gris-700">Informe de asistencia mensual {mes}</p>
            <p className='text-4xl font-bold text-gris-800'><span className="text-3xl">{sigla}</span> - {nombre} ({id})</p>
        </div>
    );
}

export default Titulo;
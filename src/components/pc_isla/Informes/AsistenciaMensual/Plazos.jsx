function Plazos ({
    fecha_inicio,
    fecha_termino,
    extendido,
    pronto_a_terminar
}) {

    return (
        <div id="data-proyecto" className='mt-5 mb-[20px] pb-[15px]'>
            <p className="text-gris-800 text-xl">Fecha de inicio del proyecto: {fecha_inicio}</p>
            <p className="text-gris-800 text-xl">Fecha de término del proyecto: {fecha_termino} {extendido && '(plazo extendido)'}</p>
            {pronto_a_terminar &&
                <p className="text-rosa-400  font-bold">Proyecto próximo a terminar. {!extendido && <span>Recuerde que, en caso de ser necesario, debe solicitar con anticipación la extensión del plazo.</span>}</p>

            }
        </div>
    );
}

export default Plazos;
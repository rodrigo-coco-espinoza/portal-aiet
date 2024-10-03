function TablaJornadasExtra({data}) {
    return (
        <div>
            <div className='flex flex-row bg-azul-marino-400 text-white font-bold'>
                <span className='ps-1mr-2 w-[100px]'>Fecha</span>
                <span className='mr-2 w-[80px]'>Ingreso</span>
                <span className='mr-2 w-[80px]'>Salida</span>
                <span className=''>Asistentes</span>
            </div>

            {data.map((infoExtra, index) => (
                <div className={`flex flex-row border-solid border-b border-gris-500 pt-1 ${index % 2 !== 0 ? 'bg-gris-200' : ''}`} key={`tabla_jornadas_extra_${index}`}>
                    <span className='ps-1 mr-2 w-[100px]'>{infoExtra.fecha}</span>
                    <span className='mr-2 w-[80px]'>{infoExtra.ingreso}</span>
                    <span className='mr-2 w-[80px]'>{infoExtra.salida}</span>
                    <span className='mr-2'>{infoExtra.asistentes}</span>
                </div>
            ))}
        </div>
    );
};

export default TablaJornadasExtra;
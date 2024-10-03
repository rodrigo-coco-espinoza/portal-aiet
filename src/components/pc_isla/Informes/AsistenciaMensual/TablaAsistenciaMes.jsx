function TablaAsistenciaMes({
    data
}) {
  return (
    <>
    <div className='flex flex-row bg-azul-marino-400 text-white font-bold'>
        <span className='ps-1 mr-2 w-[100px]'>Fecha</span>
        <span className='mr-2 w-[80px]'>Ingreso</span>
        <span className='mr-2 w-[80px]'>Salida</span>
        <span className=''>Asistentes</span>
    </div>

    {data.map((infoAsistencia, index) => (
        <div className={`flex flex-row border-solid border-b border-gris-500 pt-1 ${index % 2 !== 0 ? 'bg-gris-200' : ''}`} key={`tabla_asistencia_${index}`}>
            <span className='ps-1 mr-2 w-[100px]'>{infoAsistencia.fecha}</span>
            <span className='mr-2 w-[80px]'>{infoAsistencia.ingreso}</span>
            <span className='mr-2 w-[80px]'>{infoAsistencia.salida}</span>
            <span className='mr-2'>{infoAsistencia.asistentes}</span>
        </div>
    ))} 
    </>
  );
};

export default TablaAsistenciaMes;
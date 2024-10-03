function TablaAsistenciaTotal({ data }) {
  return (
    <>
    <div className='flex flex-row bg-azul-marino-400 text-white font-bold'>
        <span className='ps-1 mr-2 w-[100px]'>Mes</span>
        <span className='mr-2 w-[120px]'>Asistencia</span>
        <span className='mr-2 w-[120px]'>Horas de uso</span>
        <span className=''>Uso fuera de horario</span>
    </div>

    {data.map((infoMes, index) => (
        <div className={`flex flex-row border-solid border-b border-gris-500 pt-1 ${index % 2 !== 0 ? 'bg-gris-300' : ''}`}  key={`tabla_asistencia_${index}`}>
            <span className='ps-1 mr-2 w-[100px]'>{infoMes.mes}</span>
            <span className='mr-2 w-[120px]'>{infoMes.asistencia} / {infoMes.jornadasAsignadas} ({infoMes.porcentajeAsistencia})</span>
            <span className='mr-2 w-[120px]'>{infoMes.horasUtilizadas} / {infoMes.horasAsignadas}</span>
            <span className='mr-2'>{infoMes.horasExtra}</span>
        </div>
    ))} 
    </>
  );
}

export default TablaAsistenciaTotal;
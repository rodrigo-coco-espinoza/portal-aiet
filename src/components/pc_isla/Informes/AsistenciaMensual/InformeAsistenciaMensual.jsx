import React, { forwardRef } from 'react';

const InformeAsistenciaMensual = forwardRef(({content}, ref) => {

    const {
        id,
        nombre,
        fecha_inicio,
        fecha_termino,
        extendido,
        pronto_a_terminar,
        data_mes,
        data_total
    } = content.data_informe;


    return (
    <div ref={ref} className="">
        <div className='a4 pt-[40px] px-[40px]'>
            <p className="text-xl">Informe de asistencia mensual {content.mes}</p>
            <p className='text-2xl font-bold border-solid border-b-4 border-gris-700'>{nombre} ({id})</p>

            <div id="data-proyecto" className='mt-5 mb-[50px]'>
                <p>Fecha de inicio del proyecto: 01-02-2024</p>
                <p>Fecha de término del proyecto: 01-08-2024 {extendido && '(plazo extendido)'}</p>
                {pronto_a_terminar &&
                    <p>Proyecto próximo a terminar. {!content.extendido && <span>Recuerde solicitar extensión del plazo con anticipación.</span>} </p>

                }
            </div>

            <div id="estadisticas-mes" className='mb-[60px] flex flex-row'>
                <div className='w-1/3 text-center flex flex-col mr-4'>
                    <span className='font-bold text-2xl'>Asistencia del mes</span>
                    <span className='text-3xl'>{data_mes.estadisticasMes.porcentajeAsistenciaMes}</span>
                </div>

                <div className='w-1/3 text-center flex flex-col mr-4'>
                    <span className='font-bold text-2xl'>Uso de horas asignadas</span>
                    <span className='text-3xl'>{data_mes.estadisticasMes.usoHorasAsignadasMes}</span>
                </div>

                <div className='w-1/3 text-center flex flex-col mr-4'>
                    <span className='font-bold text-2xl'>Uso fuera de horario</span>
                    <span className='text-3xl'>{data_mes.estadisticasMes.horasExtraMes} horas</span>
                </div>

            </div>

            <div id="asistencia-mes" className='mb-[70px]'>
                <p className='font-bold text-xl mb-[10px]'>Asistencia Enero</p>
                <div className='flex flex-row'>
                    <span className='mr-2 w-[100px]'>Fecha</span>
                    <span className='mr-2 w-[80px]'>Ingreso</span>
                    <span className='mr-2 w-[80px]'>Salida</span>
                    <span className=''>Asistentes</span>
                </div>

                {data_mes.asignadas.map((infoAsistencia, index) => (
                    <div className='flex flex-row border-solid border-b border-gris-400' key={`tabla_asistencia_${index}`}>
                        <span className='mr-2 w-[100px]'>{infoAsistencia.fecha}</span>
                        <span className='mr-2 w-[80px]'>{infoAsistencia.ingreso}</span>
                        <span className='mr-2 w-[80px]'>{infoAsistencia.salida}</span>
                        <span className='mr-2'>{infoAsistencia.asistentes}</span>
                    </div>
                ))}               
            </div>     

            <div id="jornadas-extra-mes" className='mt-8'>
                <p className='font-bold text-xl mb-[10px]'>Jornadas extras Enero</p>
                {data_mes.extras.length !== 0 ?

                
                <div>

                    <div className='flex flex-row'>
                        <span className='mr-2 w-[100px]'>Fecha</span>
                        <span className='mr-2 w-[80px]'>Ingreso</span>
                        <span className='mr-2 w-[80px]'>Salida</span>
                        <span className=''>Asistentes</span>
                    </div>

                    {data_mes.extras.map((infoExtra, index) => (
                        <div className='flex flex-row border-solid border-b border-gris-400' key={`tabla_jornadas_extra_${index}`}>
                            <span className='mr-2 w-[100px]'>{infoExtra.fecha}</span>
                            <span className='mr-2 w-[80px]'>{infoExtra.ingreso}</span>
                            <span className='mr-2 w-[80px]'>{infoExtra.salida}</span>
                            <span className='mr-2'>{infoExtra.asistentes}</span>
                        </div>
                    ))}
                </div>
                :
                <p>No hay jornadas extras en este mes.</p>
                }
            </div>
        </div>

        <div className='a4 mt-10 pt-[45px] px-[40px] flex flex-col justify-between'>

            <div id="asistencia-total" className='mb-[70px]'>
                <h1 className="text-2xl font-bold mb-[10px]">Asistencia total del proyecto</h1>
                <div className='flex flex-row'>
                    <span className='mr-2 w-[100px]'>Mes</span>
                    <span className='mr-2 w-[120px]'>Asistencia</span>
                    <span className='mr-2 w-[120px]'>Horas de uso</span>
                    <span className=''>Uso fuera de horario</span>
                </div>

                {data_total.asistenciaMensual.map((infoMes, index) => (
                    <div className='flex flex-row border-solid border-b border-gris-400' key={`tabla_asistencia_${index}`}>
                        <span className='mr-2 w-[100px]'>{infoMes.mes}</span>
                        <span className='mr-2 w-[120px]'>{infoMes.asistencia} / {infoMes.jornadasAsignadas} ({infoMes.porcentajeAsistencia})</span>
                        <span className='mr-2 w-[120px]'>{infoMes.horasUtilizadas} / {infoMes.horasAsignadas}</span>
                        <span className='mr-2'>{infoMes.horasExtra}</span>
                    </div>

                ))}   
            </div>

            <div id="estadisticas-total" className='flex flex-row mb-[300px]'>
                <div className='w-1/3 text-center flex flex-col mr-4'>
                    <span className='font-bold text-2xl'>Asistencia del proyecto</span>
                    <span className='text-3xl'>{data_total.estadisticasTotal.porcentajeAsistenciaTotal}</span>
                </div>

                <div className='w-1/3 text-center flex flex-col mr-4'>
                    <span className='font-bold text-2xl'>Uso de horas asignadas</span>
                    <span className='text-3xl'>{data_total.estadisticasTotal.usoHorasAsignadasTotal}</span>
                </div>

                <div className='w-1/3 text-center flex flex-col mr-4'>
                    <span className='font-bold text-2xl'>Uso fuera de horario</span>
                    <span className='text-3xl'>{data_total.estadisticasTotal.horasExtraTotal} horas</span>
                </div>

            </div>

            <div id="notas" className='mt-auto mb-[70px]'>
            <h1 className="text-xl font-bold">Notas</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

        </div>
        
        
    </div>
    );
});
export default InformeAsistenciaMensual;
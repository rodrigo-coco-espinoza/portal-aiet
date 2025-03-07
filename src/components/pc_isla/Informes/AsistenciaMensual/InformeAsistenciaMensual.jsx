import React, { forwardRef } from 'react';
import TablaAsistenciaMes from './TablaAsistenciaMes';
import TablaAsistenciaTotal from './TablaAsistenciaTotal';
import TablaJornadasExtra from './TablaJornadasExtra';
import EstadisticasAsistencia from './EstadisticasAsistencia';
import Plazos from './Plazos';
import Titulo from './Titulo';
import NotasInforme from './NotasInforme';

const InformeAsistenciaMensual = forwardRef(({content}, ref) => {

    const {
        id,
        nombre,
        estado,
        formatted_fecha_inicio,
        formatted_fecha_termino,
        extendido,
        pronto_a_terminar,
        data_mes,
        data_total
    } = content.data_informe;


    return (
    <div ref={ref} className="">
        {/* Primera hoja */}
        <div className='a4'>
        
            <div className='bg-gris-100'>
                <div className='pt-[40px] px-[40px]'>
                    <Titulo
                        nombre={nombre}
                        sigla={content.sigla}
                        id={id}
                        mes={content.mes}
                    />

                    <Plazos
                        estado={estado}
                        fecha_inicio={formatted_fecha_inicio}
                        fecha_termino={formatted_fecha_termino}
                        extendido={extendido}
                        pronto_a_terminar={pronto_a_terminar}
                    />
                </div>
            </div>

            <div className='px-[40px]'>
                <p className='font-bold text-3xl mb-[10px] text-gris-800'>I. Información asistencia mes de {content.mes}</p>

                <div id="estadisticas-mes" className='mb-[30px] flex flex-row'>
                    <EstadisticasAsistencia
                        porcentajeAsistencia={data_mes.estadisticasMes.porcentajeAsistenciaMes}
                        horasAsignadas={data_mes.estadisticasMes.usoHorasAsignadasMes} 
                        horasExtras={data_mes.estadisticasMes.horasExtraMes}
                    />
                </div>

                <div id="asistencia-mes" className='mb-[70px]'>
                    <p className='font-bold text-2xl mb-[10px] text-gris-800'>a. Detalle asistencia del mes</p>
                    <TablaAsistenciaMes
                        data={data_mes.asignadas.legnth > 18 ?  data_mes.asignadas : data_mes.asignadas.slice(0, 18)} 
                    />                                        
                </div>     
                
                {data_mes.asignadas.length <= 15 && data_mes.extras.length <= 5 &&

                <div id="jornadas-extra-mes" className='mt-8'>
                    <p className='font-bold text-2xl mb-[10px] text-gris-800'>b. Jornadas extras del mes</p>
                    {data_mes.extras.length !== 0 ?              
                    <TablaJornadasExtra
                        data={data_mes.extras}
                    />
                :
                    <p>No hay jornadas extras en este mes.</p>
                    }
                </div>       
                }          
            </div>

        </div>

        {/* Segunda hoja */}
        <div className='a4 mt-10 '>
            {data_mes.asignadas.length > 18 &&
                <div id="asistencia-mes-cont" className='px-[40px] pt-[40px]'>
                    <p className='font-bold text-2xl mb-[10px] text-gris-800'>a. Detalle asistencia del mes (continuación)</p>
                    <TablaAsistenciaMes
                        data={data_mes.asignadas.slice(18, data_mes.asignadas.length)} 
                    />                                        
                </div>   
            }



            <div className='flex flex-col justify-between'>
                {( (data_mes.asignadas.length > 15) || (data_mes.asignadas.legnth <= 15 && data_mes.extras.legnth > 5) ) &&
                    <div id="jornadas-extra-mes" className='mb-10 pt-[45px] px-[40px]'>
                        <p className='font-bold text-2xl mb-[10px] text-gris-800'>b. Jornadas extras del mes</p>
                        {data_mes.extras.length !== 0 ?
                        <TablaJornadasExtra
                            data={data_mes.extras}
                        />
                        :
                        <p>No hay jornadas extras en este mes.</p>
                        }
                    </div>
                }
                
                <div className='bg-gris-100'>
                    <div className='px-[40px] pt-[45px]'>
                        <p className='font-bold text-3xl mb-[10px] text-gris-800'>II. Información asistencia total del proyecto</p>
                        <div id="estadisticas-total" className='flex flex-row mb-[70px]'>
                            <EstadisticasAsistencia 
                                porcentajeAsistencia={data_total.estadisticasTotal.porcentajeAsistenciaTotal}
                                horasAsignadas={data_total.estadisticasTotal.usoHorasAsignadasTotal}
                                horasExtras={data_total.estadisticasTotal.horasExtraTotal}
                                crossFill='#F5F5F5'
                            />
                        </div>

                        <div id="asistencia-total" className='mb-[250px]'>
                            <h1 className="text-2xl font-bold mb-[10px] text-gris-800">a. Detalle asistencia total</h1>
                            <TablaAsistenciaTotal
                                data={data_total.asistenciaMensual}
                            />
                        </div>
                    </div>
                </div>
                <div id="notas" className='mt-auto pt-[25px] pb-[25px] px-[40px]'>
                    <NotasInforme />
                </div>

            </div>
        </div>
        
        
    </div>
    );
});
export default InformeAsistenciaMensual;
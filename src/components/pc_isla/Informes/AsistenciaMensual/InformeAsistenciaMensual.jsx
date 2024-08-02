import React, { forwardRef } from 'react';

const InformeAsistenciaMensual = forwardRef(({content}, ref) => (
    <div ref={ref} className="">
        <div className='a4 pt-[40px] px-[40px]'>
            <p className="text-xl">Informe de asistencia mensual Enero {content.mes}</p>
            <p className='text-2xl font-bold border-solid border-b-4 border-gris-700'>Nombre del proyecto (76)</p>

            <div id="data-proyecto" className='mt-5 mb-[50px]'>
                <p>Fecha de inicio del proyecto: 01-02-2024</p>
                <p>Fecha de término del proyecto: 01-08-2024 (plazo extendido)</p>
                <p>Proyecto próximo a terminar, recuerde solicitar su extensión.</p>

            </div>

            <div id="estadisticas-mes" className='mb-[60px] flex flex-row'>
                <div className='w-1/3 text-center flex flex-col mr-4'>
                    <span className='font-bold text-2xl'>Asistencia del mes</span>
                    <span className='text-3xl'>85%</span>
                </div>

                <div className='w-1/3 text-center flex flex-col mr-4'>
                    <span className='font-bold text-2xl'>Uso de horas asignadas</span>
                    <span className='text-3xl'>75 / 80</span>
                </div>

                <div className='w-1/3 text-center flex flex-col mr-4'>
                    <span className='font-bold text-2xl'>Uso fuera de horario</span>
                    <span className='text-3xl'>25.3 horas</span>
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

                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>01-02-2024</span>
                    <span className='mr-2 w-[80px]'>09:54</span>
                    <span className='mr-2 w-[80px]'>12:15</span>
                    <span className='mr-2'>R. Espinoza, C. Gutiérrez</span>
                </div>
                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>01-02-2024</span>
                    <span className='mr-2 w-[80px]'>09:54</span>
                    <span className='mr-2 w-[80px]'>12:15</span>
                    <span className='mr-2'>R. Espinoza, C. Gutiérrez</span>
                </div>
                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>01-02-2024</span>
                    <span className='mr-2 w-[80px]'>09:54</span>
                    <span className='mr-2 w-[80px]'>12:15</span>
                    <span className='mr-2'>R. Espinoza, C. Gutiérrez</span>
                </div>
                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>01-02-2024</span>
                    <span className='mr-2 w-[80px]'>09:54</span>
                    <span className='mr-2 w-[80px]'>12:15</span>
                    <span className='mr-2'>R. Espinoza, C. Gutiérrez</span>
                </div>
                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>01-02-2024</span>
                    <span className='mr-2 w-[80px]'>09:54</span>
                    <span className='mr-2 w-[80px]'>12:15</span>
                    <span className='mr-2'>R. Espinoza, C. Gutiérrez</span>
                </div>
                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>01-02-2024</span>
                    <span className='mr-2 w-[80px]'>09:54</span>
                    <span className='mr-2 w-[80px]'>12:15</span>
                    <span className='mr-2'>R. Espinoza, C. Gutiérrez</span>
                </div>
                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>01-02-2024</span>
                    <span className='mr-2 w-[80px]'>09:54</span>
                    <span className='mr-2 w-[80px]'>12:15</span>
                    <span className='mr-2'>R. Espinoza, C. Gutiérrez</span>
                </div>
                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>01-02-2024</span>
                    <span className='mr-2 w-[80px]'>09:54</span>
                    <span className='mr-2 w-[80px]'>12:15</span>
                    <span className='mr-2'>R. Espinoza, C. Gutiérrez</span>
                </div>
                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>01-02-2024</span>
                    <span className='mr-2 w-[80px]'>09:54</span>
                    <span className='mr-2 w-[80px]'>12:15</span>
                    <span className='mr-2'>R. Espinoza, C. Gutiérrez</span>
                </div>                
            </div>

            

            <div id="jornadas-extra-mes" className='mt-8'>
                <p className='font-bold text-xl mb-[10px]'>Jornadas extras Enero</p>
                <div className='flex flex-row'>
                    <span className='mr-2 w-[100px]'>Fecha</span>
                    <span className='mr-2 w-[80px]'>Ingreso</span>
                    <span className='mr-2 w-[80px]'>Salida</span>
                    <span className=''>Asistentes</span>
                </div>

                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>01-02-2024</span>
                    <span className='mr-2 w-[80px]'>09:54</span>
                    <span className='mr-2 w-[80px]'>12:15</span>
                    <span className='mr-2'>R. Espinoza, C. Gutiérrez</span>
                </div>
                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>01-02-2024</span>
                    <span className='mr-2 w-[80px]'>09:54</span>
                    <span className='mr-2 w-[80px]'>12:15</span>
                    <span className='mr-2'>R. Espinoza, C. Gutiérrez</span>
                </div>
                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>01-02-2024</span>
                    <span className='mr-2 w-[80px]'>09:54</span>
                    <span className='mr-2 w-[80px]'>12:15</span>
                    <span className='mr-2'>R. Espinoza, C. Gutiérrez</span>
                </div>
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

                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>Diciembre</span>
                    <span className='mr-2 w-[120px]'>30 / 35 (80%)</span>
                    <span className='mr-2 w-[120px]'>105 / 110</span>
                    <span className='mr-2'>00:58</span>
                </div>
                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>Enero</span>
                    <span className='mr-2 w-[120px]'>8 / 12 (66%)</span>
                    <span className='mr-2 w-[120px]'>20 / 30</span>
                    <span className='mr-2'>00:32</span>
                </div>
                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>Febrero</span>
                    <span className='mr-2 w-[120px]'>8 / 12 (66%)</span>
                    <span className='mr-2 w-[120px]'>20 / 30</span>
                    <span className='mr-2'>00:32</span>
                </div>
                <div className='flex flex-row border-solid border-b border-gris-400'>
                    <span className='mr-2 w-[100px]'>Marzo</span>
                    <span className='mr-2 w-[120px]'>30 / 30 (100%)</span>
                    <span className='mr-2 w-[120px]'>74.8 / 75</span>
                    <span className='mr-2'>01:38</span>
                </div>
            

            </div>

            <div id="estadisticas-total" className='flex flex-row mb-[300px]'>
                <div className='w-1/3 text-center flex flex-col mr-4'>
                    <span className='font-bold text-2xl'>Asistencia del proyecto</span>
                    <span className='text-3xl'>85%</span>
                </div>

                <div className='w-1/3 text-center flex flex-col mr-4'>
                    <span className='font-bold text-2xl'>Uso de horas asignadas</span>
                    <span className='text-3xl'>75 / 80</span>
                </div>

                <div className='w-1/3 text-center flex flex-col mr-4'>
                    <span className='font-bold text-2xl'>Uso fuera de horario</span>
                    <span className='text-3xl'>25.3 horas</span>
                </div>

            </div>

            <div id="notas" className='mt-auto mb-[70px]'>
            <h1 className="text-xl font-bold">Notas</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

        </div>
        
        
    </div>
));

export default InformeAsistenciaMensual;
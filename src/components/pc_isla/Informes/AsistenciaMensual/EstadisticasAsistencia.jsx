import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function EstadisticasAsistencia({
    porcentajeAsistencia,
    horasAsignadas,
    horasExtras,
    crossFill = 'white'
}) {

    const porcentajeHorasUsadas = (horasAsignadas / horasExtras) * 100;

    return (
        <>

        <div className='w-1/3 text-center flex flex-col mr-4'>
            <span className='font-bold text-lg text-gris-800'>Asistencia</span>
            <div className='mx-auto w-[100px] h-[100px]'>
                <CircularProgressbar
                    value={porcentajeAsistencia}
                    text={`${porcentajeAsistencia}%`}
                    styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 0.25,

                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',

                        // Text size
                        textSize: '30px',

                        // Colors
                        pathColor: `rgba(0, 100, 160, ${horasAsignadas / 100})`,
                        textColor: '#333333',
                        trailColor: '#EEEEEE',
                        backgroundColor: '#B5DBF2',
                    })}
                >         
                </CircularProgressbar> 
            </div>


            {/* <div className='relative border-2 border-azul-brillante-200 rounded overflow-hidden h-[100px] flex items-center justify-center' style={{ background: 'repeating-linear-gradient(45deg, #f3f4f6 0, #f3f4f6 10px, #e5e7eb 10px, #e5e7eb 20px)'}}>
                <div className='absolute top-0 left-0 h-full bg-celeste-300 z-0' style={{ width: porcentajeAsistencia }}></div>
                <span className='text-3xl text-gris-900 relative z-10'>{porcentajeAsistencia}</span>
            </div> */}
        </div>

        <div className='w-1/3 text-center flex flex-col mr-4 relative'>
            <span className='font-bold text-lg text-gris-800'>Uso de horas asignadas</span>
            <div className='mx-auto w-[100px] h-[100px]'>
                <CircularProgressbar
                    value={horasAsignadas}
                    text={`${horasAsignadas}%`}
                    styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 0.25,

                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',

                        // Text size
                        textSize: '30px',

                        // Colors
                        pathColor: `rgba(230, 80, 10, ${horasAsignadas / 100})`,
                        textColor: '#333333',
                        trailColor: '#EEEEEE',
                        backgroundColor: '#B5DBF2',
                    })}
                >         
                </CircularProgressbar> 
            </div>
        </div>

        <div className='w-1/3 text-center flex flex-col mr-4 relative'>    
            <span className='font-bold text-lg text-gris-800 z-10'>Uso fuera de horario</span>
            <div className='relative h-[100px] flex items-center justify-center'>
                <span className='text-3xl text-gris-900 z-10'>{horasExtras}</span>
                <span className='absolute z-0 right-5'>
                    <svg
                        width="90"
                        height="90"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="12" cy="12" r="10" stroke="#D1D1D1" stroke-width="2" fill="none" />
                        <line x1="12" y1="12" x2="12" y2="5" stroke="#D1D1D1" stroke-width="2" />
                        <line x1="12" y1="12" x2="19" y2="12" stroke="#D1D1D1" stroke-width="2" />
                        <rect x="16" y="16" width="8" height="8" fill={crossFill} />
                        <line x1="20" y1="17" x2="20" y2="23" stroke="#D1D1D1" stroke-width="2" />
                        <line x1="17" y1="20" x2="23" y2="20" stroke="#D1D1D1" stroke-width="2" />
                    </svg>
                </span>
            </div>
        </div>


        </>

    );
};

export default EstadisticasAsistencia;
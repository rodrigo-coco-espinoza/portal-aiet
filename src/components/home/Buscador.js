import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'

function Buscador(){

    return (

        <section className='flex md:flex-row flex-col-reverse sm:py-16 py-6'>
        
            {/* Contenido lado izquierdo */}
            <div className='flex-1 flex flex justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative'>
                <TypeAnimation
                    style={{ 
                        whiteSpace: 'pre-line', 
                        height: '280px', 
                        display: 'block',
                        fontSize: '1.5em'
                        }}
                    sequence={[
                        `SELECT\n \u00A0 \u00A0 \u00A0 COUNT(Contribuyentes),
                        \u00A0 \u00A0 \u00A0 Tipo Contribuyente,
                        \u00A0 \u00A0 \u00A0 SUM(Ingresos)
                        FROM
                        \u00A0 \u00A0 \u00A0 Base Datos
                        WHERE
                        \u00A0 \u00A0 \u00A0 Ingresos > 0`,
                        1000,
                        '',
                    ]}
                    repeat={Infinity}
                />
            </div>
            {/* Contenido lado derecho */}
            <div className='flex-1  justify-center items-start flex-col'>
                <h2 className='font-semibold xs:text-[48px] text-azul-brillante-400 text-[44px] xs:leading-[76.8px] leading-[66.8px] w-full'>Buscador de queries</h2>
                <p className='text-azul-marino-300 text-[18px] leading-[30.8px] mt-5 max-w-[470px] mb-5'>Esta herramienta permite acceder al repositorio de consultas SQL para la extracción de datos.</p>
                <Link to="/busqueda">
                    <button className="bg-azul-cobalto-400 hover:bg-naranja-400 text-white font-bold py-2 px-4 rounded">
                    Ingresar al buscador
                    </button>                       
                </Link>
            </div>
        </section>



    )
}


export default Buscador

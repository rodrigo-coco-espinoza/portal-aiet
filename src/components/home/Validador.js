import { Link } from 'react-router-dom'
import data_validation from 'assets/img/data_validation.png'

function Validador(){

    return (
        <section className='flex md:flex-row flex-col sm:py-16 py-6'>
            {/* Contenido lado izquierdo */}
            <div className='flex-1 flex-col flex justify-center items-start '>
                <h2 className='font-semibold xs:text-[48px] text-azul-brillante-400 text-[44px] xs:leading-[76.8px] leading-[66.8px] w-full'>Validador de archivos</h2>
                <p className='text-azul-marino-300 text-[18px] leading-[30.8px] mt-5 max-w-[470px]'>Esta herramienta permite acceder al repositorio de consultas SQL para la extracción de datos.
                </p>
                <Link to="/validador">
                    <button class="mt-5 bg-azul-cobalto-400 hover:bg-naranja-400 text-white font-bold py-2 px-4 rounded">
                    Ir al validador
                    </button>                       
                </Link>
                
            </div>
            {/* Contenido lado derecho */}
            <div className='flex-col flex-1 flex justify-center items-center md:ml-10 ml-0 md:mt-0 mt-10 relative`'>
            <img src={data_validation} alt="Imagen validación de datos" className='realtive z-[5] md:-ml-8 max-h-[440px]' />
            </div>
        </section>


    )
}


export default Validador

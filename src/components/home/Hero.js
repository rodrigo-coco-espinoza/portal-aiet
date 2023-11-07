import data_analysis from 'assets/img/data_analysis.jpg'

function Hero(){

    return (
        <main className="flex md:flex-row flex-col sm:py-16 py-6 mb-10">
            <div className="flex-1 basis-1/5 flex justify-center items-start flex-col xl:px-0 sm:px-16 px-6">
                <div className="flex flex-row justify-between items-center w-full">
                    <h1 className="flex-1 font-semibold">
                        <span className="text-gris-800 text-[42px]">Portal de <br /></span>
                        <span className="text-azul-brillante-400 text-[52px] leading-[60px]">procesamiento de la información</span>
                    </h1>
                </div>
                <p className="font-normal text-azul-marino-300 text-[18px] leading-[30.8px] max-w-[470px] mt-5">Aplicación web de uso interno para la extracción y validación de datos solicitados por instituciones del estado por convenio u oficio.</p>
            </div>

            <div className="flex-1 flex md:my-0 my-10 relative">
                <img src={data_analysis} alt="Imagen análisis de datos" className=' realtive z-[5] md:-ml-8' />
            </div>
        </main>
    )
}


export default Hero
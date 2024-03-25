function ColumnaDia({dataDia}) {

    return (
        <div className='flex flex-col mr-1 text-center flex-1'>
            <div className='bg-azul-marino-400 mb-2 h-[40px] flex items-center justify-center'>
            <p className='font-bold text-white'>{dataDia.dia}</p>
            </div>
            <div>
            <div className="bg-verde-esmeralda-100 mb-1 h-[45px] flex items-center justify-center">
                <p className='text-sm p-2'>{dataDia.juanFernandez.AM}</p>
            </div>
            <div className="bg-verde-esmeralda-100 mb-2 h-[45px] flex items-center justify-center">
                <p className="text-sm p-2">{dataDia.juanFernandez.PM}</p>
            </div>
            </div>

            <div>
            <div className="bg-azul-brillante-100 mb-1 h-[45px] flex items-center justify-center">
                <p className="text-sm p-2">{dataDia.boraBora.AM}</p>
            </div>
            <div className="bg-azul-brillante-100 mb-2 h-[45px] flex items-center justify-center">
                <p className="text-sm p-2">{dataDia.boraBora.PM}</p>
            </div>
            </div>  

            <div>
            <div className="bg-verde-oscuro-100 mb-1 h-[45px] flex items-center justify-center p-2">
                <p className="text-sm p-2">{dataDia.rapaNui.AM}</p>
            </div>
            <div className="bg-verde-oscuro-100 mb-2 h-[45px] flex items-center justify-center p-2">
                <p className="text-sm p-2">{dataDia.rapaNui.AM}</p>
            </div>
            </div>  
        </div>
    )

}

export default ColumnaDia
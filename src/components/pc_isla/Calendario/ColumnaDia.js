import Dia from './Dia'

function ColumnaDia({dataDia}) {

    return (
        <>
        {/* Días pasados y feriados */}
       {(dataDia.pasado || dataDia.feriado) && (
            <div className='flex flex-col mr-1 text-center flex-1'>
                {/* Día y fecha */}
                <div className='bg-gris-600 mb-2 h-[50px] flex items-center justify-center'>
                    <p className='font-bold text-gris-800'>
                        {dataDia.dia}<br />{dataDia.fecha}
                    </p>
                </div>
                {/* Juan Fernández */}
                <div>
                    {/* AM */}
                    <Dia 
                        datos={dataDia['Juan Fernández'].AM} 
                        estiloFondo="bg-gris-600"
                    />
                    {/* PM */}
                    <Dia 
                        datos={dataDia['Juan Fernández'].PM} 
                        estiloFondo="bg-gris-600"
                        esUltima={true}
                    />
                </div>
                {/* Bora Bora */}
                <div>
                    {/* AM */}
                    <Dia 
                        datos={dataDia['Bora Bora'].AM} 
                        estiloFondo="bg-gris-600"
                    />
                    {/* PM */}
                    <Dia 
                        datos={dataDia['Bora Bora'].PM} 
                        estiloFondo="bg-gris-600"
                        esUltima={true}
                    />
                </div>  
                {/* Rapa Nui */}
                <div>
                    {/* AM */}
                    <Dia 
                        datos={dataDia['Rapa Nui'].AM} 
                        estiloFondo="bg-gris-600"
                    />
                    {/* PM */}
                    <Dia 
                        datos={dataDia['Rapa Nui'].PM} 
                        estiloFondo="bg-gris-600"
                        esUltima={true}
                    />
                </div>  
            </div>
       )}

       {/* Días hábiles */}

       {(!dataDia.pasado && !dataDia.feriado) && (
            <div className='flex flex-col mr-1 text-center flex-1'>
                {/* Día y fecha */}
                <div className='bg-azul-marino-400 mb-2 h-[50px] flex items-center justify-center'>
                    <p className='font-bold text-white'>
                        {dataDia.dia}<br />{dataDia.fecha}
                    </p>
                </div>
                {/* Juan Fernández */}
                <div>
                    {/* AM */}
                    <Dia 
                        datos={dataDia['Juan Fernández'].AM} 
                        estiloFondo="bg-verde-esmeralda-100"
                    />
                    {/* PM */}
                    <Dia 
                        datos={dataDia['Juan Fernández'].PM} 
                        estiloFondo="bg-verde-esmeralda-100"
                        esUltima={true}
                    />
                </div>
                {/* Bora Bora */}
                <div>
                    {/* AM */}
                    <Dia 
                        datos={dataDia['Bora Bora'].AM} 
                        estiloFondo="bg-azul-brillante-100"
                    />
                    {/* PM */}
                    <Dia 
                        datos={dataDia['Bora Bora'].PM} 
                        estiloFondo="bg-azul-brillante-100"
                        esUltima={true}
                    />
                </div>  
                {/* Rapa Nui */}
                <div>
                    {/* AM */}
                    <Dia 
                        datos={dataDia['Rapa Nui'].AM} 
                        estiloFondo="bg-verde-oscuro-100"
                    />
                    {/* PM */}
                    <Dia 
                        datos={dataDia['Rapa Nui'].PM} 
                        estiloFondo="bg-verde-oscuro-100"
                        esUltima={true}
                    />
                </div>  
            </div>
       )}
       </> 

        
    )

}

export default ColumnaDia
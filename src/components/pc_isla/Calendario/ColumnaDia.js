import ExtraIcon from "assets/img/ExtraIcon"
import { CheckCircleIcon } from "@heroicons/react/20/solid"
import Dia from "./Dia"

function ColumnaDia({dataDia, openAsistencia}) {

    return (
        <>
        <div className='flex flex-col mr-1 text-center flex-1'>
            {/* Día y fecha */}
            <div className={`${dataDia.pasado || dataDia.feriado ? 'bg-gris-600 text-gris-800' : 'bg-azul-marino-400 text-white'} mb-2 h-[50px] flex items-center justify-center font-bold`}>
                <p className=''>
                    {dataDia.dia}<br />{dataDia.fecha}
                </p>
            </div>

            {/* Juan Fernández */}
            <div>
                {/* AM */}
                <Dia
                    openAsistencia={openAsistencia}
                    key="JuanFernandezAM"
                    pasado={dataDia.pasado || dataDia.feriado}
                    color="bg-verde-esmeralda-100"
                    AM = {true}
                    tipo={dataDia['Juan Fernández'].AM.tipo}
                    asistencia={dataDia['Juan Fernández'].AM.asistencia}
                    institucion={dataDia['Juan Fernández'].AM.institucion}
                    proyecto={dataDia['Juan Fernández'].AM.proyecto}
                />
                {/* PM */}
                <Dia
                    openAsistencia={openAsistencia} 
                    key="JuanFernandezPM"
                    pasado={dataDia.pasado || dataDia.feriado}
                    color="bg-verde-esmeralda-100"
                    tipo={dataDia['Juan Fernández'].PM.tipo}
                    asistencia={dataDia['Juan Fernández'].PM.asistencia}
                    institucion={dataDia['Juan Fernández'].PM.institucion}
                    proyecto={dataDia['Juan Fernández'].PM.proyecto}
                /> 
            </div>

            {/* Bora Bora */}
            <div>
                {/* AM */}
                <Dia
                    openAsistencia={openAsistencia}
                    key="BoraBoraAM"
                    pasado={dataDia.pasado || dataDia.feriado}
                    color="bg-azul-brillante-100"
                    AM = {true}
                    tipo={dataDia['Bora Bora'].AM.tipo}
                    asistencia={dataDia['Bora Bora'].AM.asistencia}
                    institucion={dataDia['Bora Bora'].AM.institucion}
                    proyecto={dataDia['Bora Bora'].AM.proyecto}
                />
                {/* PM */}
                <Dia
                    openAsistencia={openAsistencia} 
                    key="BoraBoraPM"
                    pasado={dataDia.pasado || dataDia.feriado}
                    color="bg-azul-brillante-100"
                    tipo={dataDia['Bora Bora'].PM.tipo}
                    asistencia={dataDia['Bora Bora'].PM.asistencia}
                    institucion={dataDia['Bora Bora'].PM.institucion}
                    proyecto={dataDia['Bora Bora'].PM.proyecto}
                />
            </div>

            {/* Rapa Nui */}
            <div>
                {/* AM */}
                <Dia
                    openAsistencia={openAsistencia}
                    key="RapaNuiAM"
                    pasado={dataDia.pasado || dataDia.feriado}
                    color="bg-verde-oscuro-100"
                    AM = {true}
                    tipo={dataDia['Rapa Nui'].AM.tipo}
                    asistencia={dataDia['Rapa Nui'].AM.asistencia}
                    institucion={dataDia['Rapa Nui'].AM.institucion}
                    proyecto={dataDia['Rapa Nui'].AM.proyecto}
                />
                {/* PM */}
                <Dia
                    openAsistencia={openAsistencia} 
                    key="RapaNuiPM"
                    pasado={dataDia.pasado || dataDia.feriado}
                    color="bg-verde-oscuro-100"
                    tipo={dataDia['Rapa Nui'].PM.tipo}
                    asistencia={dataDia['Rapa Nui'].PM.asistencia}
                    institucion={dataDia['Rapa Nui'].PM.institucion}
                    proyecto={dataDia['Rapa Nui'].PM.proyecto}
                />
            </div>
        </div>
        </> 

        
    )

}

export default ColumnaDia
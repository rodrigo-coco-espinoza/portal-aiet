import { useEffect, useState } from "react";

const TablaAsistencia = ({
    asistencias
}) => {

    useEffect(() => {
        // Event listener for window resize
        const handleResize = () => {
            changeTable();
        }
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [miniTable, setMiniTable] = useState(calcularTabla);
    function calcularTabla(){
        if (window.innerWidth <= 780) {
            return true;
        } else {
            return false;
        }
    };
    function changeTable() {
        setMiniTable(calcularTabla);
    }




    return(
        <div className="mt-1">
        { miniTable ?
            <>
            <div className="flex flex-row">
                <label className="text-gris-700 text-sm w-[100px] mr-2">Jornada</label>
                <label className="text-gris-700 text-sm w-[90px] mr-2">Fecha</label>
                <label className="text-gris-700 text-sm w-[60px] mr-2">Ingreso</label>
                <label className="text-gris-700 text-sm w-[60px] mr-2">Salida</label>
                <label className="text-gris-700 text-sm">Motivo</label>
            </div>
            <div className="flex flex-row">
                <p className="sm-sii:text-base text-sm text-gris-900 w-[100px] mr-2">Miércoles AM</p>
                <p className="sm-sii:text-base text-sm w-[90px] mr-2">12-04-2024</p>
                <p className="sm-sii:text-base text-sm w-[60px] mr-2">09:58</p>
                <p className="sm-sii:text-base text-sm w-[60px] mr-2">11:23</p>
                <p className="sm-sii:text-base text-sm">Proceso ejecutándose (jornada extra)</p>                                                
            </div>
        </>
        :
        <>
        <div className="flex flex-row">
            <label className="text-gris-700 text-sm w-[100px] mr-2">Jornada</label>
            <label className="text-gris-700 text-sm w-[90px] mr-2">Fecha</label>
            <label className="text-gris-700 text-sm w-[60px] mr-2">Ingreso</label>
            <label className="text-gris-700 text-sm w-[60px] mr-2">Salida</label>
            <label className="text-gris-700 text-sm">Motivo</label>
        </div>
        {asistencias.map((asistencia, index) => (
            <div key={`tabla_larga_${index}`}>

                <div className="flex flex-row ">
                    <p className="sm-sii:text-base text-sm text-gris-900 w-[100px] mr-2">{asistencia.jornada}</p>
                    <p className="sm-sii:text-base text-sm w-[90px] mr-2">{asistencia.fecha}</p>
                    <p className="sm-sii:text-base text-sm w-[60px] mr-2">{asistencia.ingreso ? asistencia.ingreso : ""}</p>
                    <p className="sm-sii:text-base text-sm w-[60px] mr-2">{asistencia.salida ? asistencia.salida : ""}</p>
                    <p className="sm-sii:text-base text-sm">{asistencia.salida ? asistencia.motivo : ""} {asistencia.extra ? '(jornada extra)' : ""}</p>                                                
                </div>
            </div> 
        ))
        }
        </>
        }
    </div>

    );
}

export default TablaAsistencia;
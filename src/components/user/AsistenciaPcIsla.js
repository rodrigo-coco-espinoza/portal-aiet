import { connect } from "react-redux";
import AsistenciaCard from "./AsistenciaCard";
import { get_asistencias } from "redux/actions/pc_isla/pc_isla";
import { useEffect, useState } from "react";
import { Alert } from "@material-tailwind/react";

function AsistenciaPcIsla({
    asistencias,
    user,
    get_asistencias
}) {

    useEffect(() => {
      if (user.is_pc_isla_investigador){
        get_asistencias();
      }
    }, [])

    // Alert
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const showAlert = (message) => {
        setAlertMessage(message);
        setOpenAlert(true);
    };


    return (
        <div className="flex flex-col mt-8">
            <Alert 
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                onClick={(e) => e.stopPropagation()}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 }
                }}
                className="relative max-w-[28rem] sm-sii:max-w-[40rem] transform -top-3 z-50 bg-verde-esmeralda-300 mx-auto"
            >
                {alertMessage}
            </Alert>


            <span className="w-full mt-6 text-2xl font-bold tracking-tight text-gris-700 border-b-2 border-gris-500 cursor-default ">
                Registrar asistencia
            </span>
            <div className="flex flex-wrap -mx-4 mt-5">
                {asistencias.map((asistencia) => (
                    <div key={`div_${asistencia.id}`} className="w-full sm-sii:w-1/2 md-sii:w-1/3 px-4 mb-4">
                        <AsistenciaCard 
                            key={asistencia.id}
                            data={asistencia} 
                            showAlert={showAlert}                        
                        />
                    </div>
                ))

                }

            </div>

        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
    asistencias: state.institucion_reducer.asistencias
});
export default connect (mapStateToProps, {
    get_asistencias
})(AsistenciaPcIsla);
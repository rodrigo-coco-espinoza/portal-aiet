import { connect } from "react-redux";
import SolicitudProyecto from "./SolicitudProyecto";
import RespuestaSII from "./RespuestaSII";
import ProtocoloUso from "./ProtocoloUso";
import RegistroAsistencia from "./RegistroAsistencia";
import Extracciones from "../DetalleProyecto/Extracciones";
import { EstadisticasUso } from "../DetalleProyecto";

function ModalDetalleProyectoFinalizado({
  active,
  closeModal,
  proyecto,
  user,
}) {
  return (
    <>
      {active && (
        <div className="bg-opacity-25 fixed inset-0 z-40 bg-black">
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 sm-sii:-top-20 outline-none focus:outline-none">
            <div className="relative sm-sii:w-full w-5/6 my-6 mx-auto max-w-3xl">
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gris-100 outline-none focus:outline-none bg-opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                {/*header*/}
                <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-gris-600 rounded-t">
                  <h3 className="text-normal font-semibold cursor-default text-gris-700">
                    Detalle del proyecto
                  </h3>
                  <p className="text-xl font-semibold leading-tight text-gris-800 cursor-default">
                    {proyecto.institucion_sigla} ({proyecto.id}):{" "}
                    {proyecto.nombre}
                  </p>
                </div>

                {/*body*/}
                <div className="relative flex-auto overflow-y-auto max-h-[60vh]">
                  <div>
                    {/* Solicitud de proyecto */}
                    <SolicitudProyecto proyecto={proyecto} />
                    {/* Respuesta SII */}
                    <RespuestaSII proyecto={proyecto} />

                    {/* Protocolo de uso */}
                    <ProtocoloUso proyecto={proyecto} />

                    {/* Registro de asistencia */}
                    <RegistroAsistencia proyecto={proyecto} />

                    {/* Estadísticas de uso */}
                    <div className="mb-4 px-6 pb-4 pt-2 bg-gris-300">
                    <h1 className="text-xl text-gris-800 cursor-default">
                        Estadísticas de uso
                    </h1>
                    <EstadisticasUso
                        idProyecto={proyecto.id}
                        data={proyecto.estadisticas_uso}
                        user={user}
                    />
                    </div>

                    {/* Extracciones */}                   
                    <div className="mb-4 px-6 pb-4 pt-2">
                      <h1 className="text-xl text-gris-800 cursor-default">
                        Extracciones
                      </h1>
                      <Extracciones 
                        idProyecto={proyecto.id}
                        data={proyecto.extracciones}
                      />
                    </div>
                                          
                    </div>
                  </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gris-400 rounded-b">
                  <button
                    onClick={closeModal}
                    className="text-rojo-300 hover:text-rojo-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(ModalDetalleProyectoFinalizado);

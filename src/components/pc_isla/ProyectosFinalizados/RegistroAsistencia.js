import { TablaAsistencia } from "../DetalleProyecto";

function RegistroAsistencia({
    proyecto
}) {
  return (
        <div className="mb-4 px-6 pb-4 pt-2">
          <h1 className="text-xl text-gris-800 cursor-default">
            Registro de asistencia
          </h1>
          <TablaAsistencia asistencias={proyecto.asistencia} />
        </div>

  );
}

export default RegistroAsistencia;
import { Tooltip } from "react-tooltip";
import { DocumentArrowDownIcon } from "@heroicons/react/20/solid";

function SolicitudProyecto({ proyecto }) {
  return (
    <div className="mb-2 bg-gris-300 px-6 py-4">
      <h1 className="text-xl text-gris-800 cursor-default">
        Solicitud de proyecto
      </h1>
      <div className="mt-1">
        <label className="text-lg text-gris-700 text-sm" id="institucion">
          Institución:
        </label>
        <p className="text-gris-900 cursor-default">
          {proyecto.institucion.nombre}{" "}
        </p>
      </div>
      <div className="mt-1">
        <label className="text-lg text-gris-700 text-sm" id="oficio-solicitud">
          Descripción:
        </label>
        <p className="text-gris-900 text-justify leading-tight cursor-default">
          {proyecto.objetivo}
        </p>
      </div>
      <div className="mt-1">
        <label className="text-lg text-gris-700 text-sm" id="oficio-solicitud">
          Oficio de solicitud de la institución externa:
        </label>
        <p className="text-gris-900 cursor-default">
          Recibido el {proyecto.formatted_fecha_oficio_recibido} (
          {proyecto.gabinete}){" "}
          <a
            href={`${process.env.REACT_APP_API_URL}/api/pc_isla/download_oficio_recibido/${proyecto.id}/`}
            target="_blank"
            className="anchor-descargar-oficio-solicitud"
          >
            <DocumentArrowDownIcon className="h-6 w-6 text-gris-800 inline hover:text-azul-cobalto-400 cursor-pointer" />
          </a>
        </p>
        <Tooltip
          key="descargarOficioSolicitud"
          anchorSelect=".anchor-descargar-oficio-solicitud"
          place="top"
        >
          Descargar documento
        </Tooltip>
      </div>
      {/* Mostar encargados */}
      <div className="mt-1">
        <label className="text-lg text-gris-700 text-sm" id="oficio-solicitud">
          Encargados SII:
        </label>
        <p className="text-gris-900 cursor-default">
          {proyecto.encargado_sii.nombre_completo} (encargado) -{" "}
          {proyecto.backup_sii.nombre_completo} (backup){" "}
        </p>
      </div>
    </div>
  );
}

export default SolicitudProyecto;
import { Tooltip } from "react-tooltip";
import { DocumentArrowDownIcon } from "@heroicons/react/20/solid";

function RespuestaSII({
    proyecto
}) {
return(

        <div className="mb-2 px-6 pb-4 pt-2">
          <h1 className="text-xl text-gris-800 cursor-default">
            Respuesta SII
          </h1>
          <div className="mt-1">
            <label
              className="text-lg text-gris-700 text-sm"
              id="oficio-respuesta"
            >
              Oficio de respuesta de aprobación del proyecto:
            </label>
            <p className="text-gris-900 cursor-default">
              Enviado el{" "}
              {proyecto.formatted_fecha_oficio_respuesta}
              <a
                href={`${process.env.REACT_APP_API_URL}/api/pc_isla/download_oficio_respuesta/${proyecto.id}/`}
                target="_blank"
                className="anchor-descargar-oficio-solicitud"
              >
                <DocumentArrowDownIcon className="h-6 w-6 text-gris-800 inline hover:text-azul-cobalto-400 cursor-pointer ml-1" />
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
        </div>
      );

}

export default RespuestaSII;
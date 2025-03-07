import { Tooltip } from "react-tooltip";
import { DocumentArrowDownIcon } from "@heroicons/react/20/solid";

function ProtocoloUso({ proyecto }) {
  return (
    <div className="mb-2 px-6 pb-4 pt-4 bg-gris-300">
      <h1 className="text-xl text-gris-800 cursor-default">Protocolo de uso</h1>
      <div className="mt-1">
        <label
          className="text-lg text-gris-700 text-sm"
          id="documento-protocolo"
        >
          Archivo protocolo de uso:
        </label>
        <p className="text-gris-900 cursor-default">
          Ver documento
          <a
            href={`${process.env.REACT_APP_API_URL}/api/pc_isla/download_protocolo/${proyecto.id}/`}
            target="_blank"
            className="anchor-descargar-protocolo"
          >
            <DocumentArrowDownIcon className="h-6 w-6 text-gris-800 inline hover:text-azul-cobalto-400 cursor-pointer ml-1" />
          </a>
        </p>
        <Tooltip
          key="descargarProtocolo"
          anchorSelect=".anchor-descargar-protocolo"
          place="top"
        >
          Descargar documento
        </Tooltip>
      </div>
      <div className="mt-1">
        <label className="text-lg text-gris-700 text-sm" id="periodo-proyecto">
          Periodo del proyecto:
        </label>
        <p className="text text-gris-900 cursor-default">
          Del {proyecto.formatted_fecha_inicio} al{" "}
          {proyecto.formatted_fecha_termino}{" "}
          {proyecto.extendido ? "(plazo extendido)" : ""}
        </p>
      </div>
      <div className="mt-1">
        <label className="text-lg text-gris-700 text-sm" id="encargado-ie">
          Encargado del proyecto:
        </label>
        <p className="text text-gris-900 cursor-default">
          {proyecto.encargado.nombre_completo}
        </p>
      </div>
      <div className="mt-1">
        <label className="text-lg text-gris-700 text-sm" id="investigadores">
          Investigador/es del proyecto:
        </label>
        {proyecto.investigadores.map((investigador, index) => (
          <>
            <p
              key={`investigador_${index}`}
              className="text text-gris-900 cursor-default"
            >
              {investigador.nombre_completo}{" "}
            </p>
          </>
        ))}
      </div>
    </div>
  );
}

export default ProtocoloUso;

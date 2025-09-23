import { Tooltip } from "react-tooltip";
import { DocumentArrowDownIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { Alert } from "@material-tailwind/react";
import { useState } from "react";
import { connect } from "react-redux";
import { update_protocolo } from "redux/actions/pc_isla/pc_isla";

function ProtocoloUso({ proyecto, user, update_protocolo }) {
  // Protocolo de uso
  const [showAlertProtocolo, setShowAlertProtocolo] = useState(false);
  const [showActualizarProtocolo, setShowActualizarProtocolo] = useState(false);
  const [actualizarProtocoloData, setActualizarProtocoloData] = useState("");

  const handleActualizarProtocolo = () => {
    setShowActualizarProtocolo(true);
  };

  const cerrarActualizarProtocolo = () => {
    setShowActualizarProtocolo(false);
    setActualizarProtocoloData("");
  };

  const actualizarProtocolo = async () => {
    if (actualizarProtocoloData !== "") {
      const dataToSend = new FormData();
      dataToSend.append("protocolo", actualizarProtocoloData);
      dataToSend.append("proyectoId", proyecto.id);

      await update_protocolo(dataToSend);
      setShowActualizarProtocolo(false);
      setActualizarProtocoloData("");
      setShowAlertProtocolo(true);
    }
  };
  return (
    <div className="mb-2 px-6 pb-4 pt-4 bg-gris-300">
      {/* Alert protocolo actualizado */}
      <Alert
        open={showAlertProtocolo}
        onClose={() => setShowAlertProtocolo(false)}
        onClick={(e) => e.stopPropagation()}
        animate={{
          mount: { y: 5 },
          unmount: { y: 100 },
        }}
        className="relative max-w-[28rem] sm-sii:max-w-[40rem] transform -top-3 z-50 bg-verde-esmeralda-300 mx-auto"
      >
        Se ha actualizado el protocolo de uso.
      </Alert>

      <h1 className="text-xl text-gris-800 cursor-default">Protocolo de uso</h1>
      <div className="mt-1">
        <label
          className="text-lg text-gris-700 text-sm"
          id="documento-protocolo"
        >
          Archivo protocolo de uso:
        </label>
        {/* Mostrar protocolo de uso */}
        <p className={`text-gris-900 cursor-default ${showActualizarProtocolo ? "hidden" : ""}`}>
          Ver documento
          <a
            href={`${process.env.REACT_APP_API_URL}/api/pc_isla/download_protocolo/${proyecto.id}/`}
            target="_blank"
            rel="noreferrer"
            className="anchor-descargar-protocolo"
          >
            <DocumentArrowDownIcon className="h-6 w-6 text-gris-800 inline hover:text-azul-cobalto-400 cursor-pointer ml-1" />
          </a>

          {user &&
            (user.is_pc_isla_admin || user.is_pc_isla_editor) && (
              <button className="anchor-actualizar-protocolo bg-transparent border-none p-0 cursor-pointer">
                <ArrowPathIcon
                  onClick={handleActualizarProtocolo}
                  className="h-6 w-6 text-gris-800 hover:text-azul-cobalto-400 inline cursor-pointer ml-1"
                />
              </button>
            )}
        </p>
        <Tooltip
          key="descargarProtocolo"
          anchorSelect=".anchor-descargar-protocolo"
          place="top"
        >
          Descargar documento
        </Tooltip>
        <Tooltip
          key="tooltipActualizarProtocolo"
          anchorSelect=".anchor-actualizar-protocolo"
          place="top"
        >
          Actualizar protocolo de uso
        </Tooltip>

        {/* Actualizar protocolo de uso */}
        <div className={`flex flex-col sm-sii:flex-row ${showActualizarProtocolo ? "" : "hidden"}`}>
          <input 
            type='file'
            id='actualizarProtocolo'
            name='actualizarProtocolo'
            accept=".pdf, .PDF"
            required
            onChange={(e) => setActualizarProtocoloData(e.target.files[0])}
            className="block w-full rounded border border-azul-marino-100 bg-clip-padding px-3 py-2 text-gris-800 transition file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:cursor-pointer file:border-inherit file:bg-gris-800 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gris-400 hover:file:text-gris-800 focus:border-primary focus:text-gris-800 focus:shadow-te-primary focus:outline-none"
          />
          <span className="flex items-end justify-end ms-1">
            <button
              onClick={actualizarProtocolo}
              className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400 background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150 mr-3"
            >
              Guardar
            </button>
            <button
              onClick={cerrarActualizarProtocolo}
              className="text-rojo-300 hover:text-rojo-400 background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150"
              type="button"
            >
              Cancelar
            </button>
          </span>
        </div>
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

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  update_protocolo,
})(ProtocoloUso);

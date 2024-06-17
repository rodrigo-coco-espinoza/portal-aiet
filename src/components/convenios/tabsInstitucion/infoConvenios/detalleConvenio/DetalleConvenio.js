import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";

function DetalleConvenio({ user, data, setConvenio }) {

  const handleClickConvenioPadre = (indice) => {
    setConvenio(indice);
  };

  return (
    <div className="p-4 shadow-lg rounded-xl bg-white w-full">
      <div className="flex items-end mb-2">
        <p className="font-bold text-xl text-gris-800 w-full">
          Información del {data.tipo.toLowerCase()}
        </p>
        {user && (user.is_convenios_admin || user.is_convenios_editor) && (
          <div className="ml-auto">
            <a
              className="anchor-editar-convenio cursor-pointer"
              //onClick={() => setShowModalAgregarProyecto(true)}
            >
              <PencilSquareIcon className="h-6 w-6 text-gris-600 hover:text-verde-esmeralda-400 inline" />
            </a>
            <Tooltip
              key="tooltipEditarConvenio"
              anchorSelect=".anchor-editar-convenio"
              place="top"
            >
              Editar información del convenio
            </Tooltip>
          </div>
        )}
      </div>

      <div class="flex mt-3">
        <div class="flex-1 text-left">
          <p className="text-gris-700 text-sm ">Nombre:</p>
          <p className="text-gris-900 leading-tight pt-0">{data.nombre}</p>

          <p className="text-gris-700 text-sm mt-2">Tipo de documento:</p>
          <p className="text-gris-900 leading-tight pt-0">{data.tipo}</p>

          {data.tipo === "Convenio" && data.adendum && (
            <>
              <p className="text-gris-700 text-sm mt-2">
                Adendum del convneio:
              </p>
              <p className="text-gris-900 leading-tight pt-0">{data.tipo}</p>
            </>
          )}

          {data.tipo === "Adendum" && (
            <>
              <p className="text-gris-700 text-sm mt-2">
                Convenio al que pertenece el adendum:
              </p>
              <p className="text-gris-900 leading-tight pt-0">
                <span
                  onClick={(e) => handleClickConvenioPadre(data.convenioPadre.indice)}
                  className="anchor-ver-convenio hover:cursor-pointer"
                >
                  {data.convenioPadre.nombre}
                </span>
              </p>
            </>
          )}

          <p className="text-gris-700 text-sm mt-2">Encargado IE:</p>
          <p className="text-gris-900 leading-tight pt-0">
            {data.encargadoIE.nombre}
          </p>

          <p className="text-gris-700 text-sm mt-2">Backup IE:</p>
          <p className="text-gris-900 leading-tight pt-0">
            {data.backupIE.nombre}
          </p>
        </div>

        <div class="flex-1 text-left ml-5 sm:ml-0">
          <p className="text-gris-700 text-sm">Estado:</p>
          <p className="text-gris-900 leading-tight pt-0">{data.estado}</p>

          <p className="text-gris-700 text-sm mt-2">
            Temas del {data.tipo.toLowerCase()}:
          </p>
          <p className="text-gris-900 leading-tight pt-0">{data.temas}</p>

          <p className="text-gris-700 text-sm mt-2">
            Subdirecciones participantes:
          </p>
          <p className="text-gris-900 leading-tight pt-0">
            {data.subdireccionesInvolucradas}
          </p>

          {data.fechaFirma ? (
            <>
              <p className="text-gris-700 text-sm mt-2">Fecha de firma:</p>
              <p className="text-gris-900 leading-tight pt-0">
                {data.fechaFirma}
              </p>
              <p className="text-gris-700 text-sm mt-2">Resolución:</p>
              <p className="text-gris-900 leading-tight pt-0">
                {data.fechaResolucion ? (
                  <a
                    href={data.linkResolucion}
                    target="_blank"
                    className="anchor-ver-resolucion text-azul-brillante-400 underline hover:text-azul-cobalto-400"
                  >
                    {data.textoResolucion}
                  </a>
                ) : (
                  "Sin resolución"
                )}
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalleConvenio;

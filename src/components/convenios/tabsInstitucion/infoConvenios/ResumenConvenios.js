
import Timeline from "components/convenios/Timeline";
import SortableTable from "./SortableTable";
import DetalleConvenio from "./detalleConvenio/DetalleConvenio";
import { useState } from "react";

function ResumenConvenios({
  data,
  user,
})
{
  const columns = [
    { key: 'indice', title: '#', sortable: false },
    { key: 'nombre', title: 'Nombre', sortable: true },
    { key: 'tipo', title: 'Tipo documento', sortable: true },
    { key: 'estado', title: 'Estado', sortable: true },
    { key: 'textoResolucion', title: 'Resolución', sortable: true },
  ];

  // Convenio seleccionado
  const [convenioSelected, setConvenioSelected] = useState(false);
  const convenioClick = (indiceConvenio) => {
    setConvenioSelected(data[indiceConvenio]);
  };

  return(
    <>
    <div className="p-4 shadow-lg rounded-xl bg-white w-full mb-8">
        <p className="font-bold text-xl mb-2">Resumen de convenios</p>
        <SortableTable 
          data={data} 
          columns={columns} 
          setConvenio={convenioClick}
        />
    </div>

    {convenioSelected && 
    <>
    <DetalleConvenio
      data={convenioSelected} 
      user={user}
      setConvenio={convenioClick}
    />
    <div className="flex-1 basis-1/5 flex justify-center items-start flex-col mt-8">
      <Timeline />
    </div>
    </>
    }


    </>
  )
}

export default ResumenConvenios
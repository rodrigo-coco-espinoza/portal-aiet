import SortableTable from "./SortableTable";

function ResumenConvenios(){
    const columns = [
      { key: 'id', title: '#', sortable: true },
      { key: 'nombre', title: 'Nombre', sortable: true },
      { key: 'tipo', title: 'Tipo documento', sortable: true },
      { key: 'temas', title: 'Temas tratados', sortable: true },
      { key: 'estado', title: 'Estado', sortable: true },
    ];

    const data = [
        { id: 1, 
          nombre: 'Intercambio de información', 
          tipo: "Convenio", 
          temas: "Intercambio batch, Web services, Clave tributaria",
          estado: "En producción"
        },
        { id: 2, 
          nombre: 'Boleta de servicio a terceros', 
          tipo: "Adendum", 
          temas: "Intercambio batch",
          estado: "En producción"
        },
        { id: 3, 
          nombre: 'Mandatarios digitales', 
          tipo: "Adendum", 
          temas: "Mandatarios digitales",
          estado: "En proceso"
        },

      ];
    

    return(
        <div className="p-4 shadow-lg rounded-xl bg-white w-full mb-8">
            <p className="font-bold text-xl">Resumen de convenios</p>
            <SortableTable data={data} columns={columns} />
        </div>
    )
}

export default ResumenConvenios
import SortableTable from "./SortableTable";

function ResumenConvenios(){

    const data = [
        { id: 1, name: 'John Doe', age: 25 },
        { id: 2, name: 'Jane Doe', age: 30 },
        { id: 3, name: 'Bob Smith', age: 22 },
      ];
    
      const columns = [
        { key: 'id', title: 'ID', sortable: true },
        { key: 'name', title: 'Name', sortable: true },
        { key: 'age', title: 'Age', sortable: true },
      ];

    return(
        <div className="p-4 shadow-lg rounded-xl bg-white w-full mb-8">
            <p className="font-bold text-xl">Resumen de convenios</p>
            <SortableTable data={data} columns={columns} />
        </div>
    )
}

export default ResumenConvenios
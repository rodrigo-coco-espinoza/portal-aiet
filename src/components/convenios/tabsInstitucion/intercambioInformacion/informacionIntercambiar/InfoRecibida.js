import { useState } from "react";
import classNames from "classnames";

function InfoRecibida({
    data,
})
{
    const columns = [
        { key: 'indice', title: '#', sortable: false },
        { key: 'nombre', title: 'Nombre', sortable: true },
        { key: 'convenio', title: 'Convenio', sortable: true },
        { key: 'nroArchivos', title: 'Archivos', sortable: true },
        { key: 'periodicidad', title: 'Periodicidad', sortable: true },
      ];

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc'
    });

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
        setSortConfig({key, direction});
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortConfig.key) {
          const aValue = a[sortConfig.key];
          const bValue = b[sortConfig.key];
    
          if (typeof aValue === "string") {
            const comparison = aValue.localeCompare(bValue, undefined, {
              numeric: true,
              sensitivity: "base",
            });
            return sortConfig.direction === "asc" ? comparison : -comparison;
          } else {
            // If not a string, compare directly
            const comparison = aValue - bValue;
            return sortConfig.direction === "asc" ? comparison : -comparison;
          }
        }
        return 0;
    });

    return (
        <>
        <div className="w-full bg-azul-marino-400 p-2 font-medium text-white uppercase tracking-wider text-center mb-0.5">
            Información recibida
        </div>

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-azul-marino-400">
                <thead className="bg-azul-marino-300">
                    <tr>
                        {columns.map((column, index) => (
                        <th
                            key={column.key}
                            onClick={() => handleSort(column.key)}
                            className={`whitespace-nowrap px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider flex-shrink-0 ${
                            column.sortable
                                ? "cursor-pointer hover:text-azul-marino-400"
                                : "cursor-default"
                            } $`}
                        >
                            {column.title}
                            {column.sortable && (
                            <span className="ml-1">
                                {sortConfig.key === column.key && (
                                <svg
                                    className={classNames(
                                    "h-4 w-4 inline",
                                    "text-azul-marino-400 transform transition-transform",
                                    {
                                        "rotate-180": sortConfig.direction === "desc",
                                    }
                                    )}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                                )}
                            </span>
                            )}
                        </th>
                        ))}
                    </tr>
                </thead>
            </table>
        </div>
        

        </>
    );
}

export default InfoRecibida;
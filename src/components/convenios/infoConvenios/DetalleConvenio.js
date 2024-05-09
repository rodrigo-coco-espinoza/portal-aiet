function DetalleConvenio(){
    return(
        <div className="p-4 shadow-lg rounded-xl bg-white w-full">
            <p className="font-bold text-xl">Detalle de convenio</p>
            <ul>
                <li>Nombre</li>
                <li>Tipo (convenio/adendum)</li>
                <li>Tema del convenio (intercambio, clave tributaria, mapas, etc)</li>
                <li>Estado (en proceso, finalizado, cancelado, etc)</li>
                <li>Link repositorio</li>
                <li>N° proyecto / N° GE</li>
                <li>Fecha de firma documento</li>
                <li>Fecha resolución / N° resolución</li>
                <li>Contraparte IE / backup IE</li>
                <li>Subdirecciones involucrads</li>
            </ul>
        </div>
    )
}

export default DetalleConvenio
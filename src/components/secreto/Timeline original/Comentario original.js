function Comentario({data}) {
    return(
        <div className="mb-1 grid grid-cols-[90px_auto]">
                    <div className="text-slate-500 font-bold">
                        {data.fecha}
                    </div>
                    <div className="text-slate-500">
                        {data.texto}
                    </div>
        </div>
    )
}

export default Comentario
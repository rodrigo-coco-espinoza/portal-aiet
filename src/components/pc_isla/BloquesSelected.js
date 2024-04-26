function BloquesSelected({
    bloques
}) {
    return (
        <div className="flex flex-col mt-3 sm-sii:mt-0 sm-sii:ms-12">
            {/* Static row */}
            <div className="flex justify-start items-center text-sm mb-0">
            <div className="w-14 h-6 mr-1">Jornada</div>
            <div className="w-6 h-6 text-center mr-1">L</div>
            <div className="w-6 h-6 text-center mr-1">M</div>
            <div className="w-6 h-6 text-center mr-1">M</div>
            <div className="w-6 h-6 text-center mr-1">J</div>
            <div className="w-6 h-6 text-center mr-1">V</div>
            </div>

            {/* Dynamic content for AM*/}
            <div className="flex justify-start items-center text-sm mb-1">
                <div className="w-14 h-6 mr-1">AM</div>
                {bloques.AM.map((cell, cellIndex) => (
                    <div
                        key={`selected_am_${cellIndex}`}
                        className={`w-6 h-6 text-center mr-1 ${cell ? 'bg-verde-esmeralda-400' : 'bg-gris-600'}`}
                    >
                    </div>
                ))}
            </div>

            {/* Dynamic content for PM*/}
        <div className="flex justify-start items-center text-sm">
            <div className="w-14 h-6 mr-1">PM</div>
            {bloques.PM.map((cell, cellIndex) => (
                <div
                    key={`selected_am_${cellIndex}`}
                    className={`w-6 h-6 text-center mr-1 ${cell ? 'bg-verde-esmeralda-400' : 'bg-gris-600'}`}
                >
                </div>
            ))}
        </div>
        </div>
    )
}

export default BloquesSelected;

import { useEffect, useState } from "react";

function BloquesSelection({
    bloques,
    onChange
}) {  

    const [selectedCheckboxes, setSelectedCheckboxes] = useState({
        am: [],
        pm: []
    });

    useEffect(() => {
        // Reset selected checkboxes when bloques change
        setSelectedCheckboxes({ am: [], pm: [] });
      }, [bloques]);
    

    const handleChange = (e) => {
        const { id, checked } = e.target;
        const[jornada, index] = id.split('_');
        setSelectedCheckboxes(prevState => ({
            ...prevState,
            [jornada]: checked ? [...prevState[jornada], parseInt(index)] : prevState[jornada].filter(i => i !== parseInt(index)) 
        }));
    };

    useEffect(() => {
        onChange(selectedCheckboxes);
    }, [selectedCheckboxes]);

    return (
        <div className="flex flex-col mt-3 sm-sii:mt-0 sm-sii:ms-5">
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
            {bloques.options['am'].map((cell, cellIndex) => (
                <div 
                    key={`am_div_${cellIndex}`} 
                    className={`w-6 h-6 text-center mr-1 ${cell ? 'bg-gris-600' : ''}`}
                >
                    <input 
                        type="checkbox"
                        id={`am_${cellIndex}`} 
                        checked={selectedCheckboxes['am'].includes(cellIndex)}
                        disabled={cell}
                        hidden={cell}
                        onChange={handleChange}
                        className="cursor-pointer w-6 h-6 accent-verde-esmeralda-400 hover:accent-verde-esmeralda-400"
                    />
                </div>
            ))}
        </div>
        {/* Dynamic content for PM*/}
        <div className="flex justify-start items-center text-sm">
            <div className="w-14 h-6 mr-1">PM</div>
            {bloques.options['pm'].map((cell, cellIndex) => (
                <div 
                    key={`pm_div_${cellIndex}`}
                    className={`w-6 h-6 text-center mr-1 ${cell ? 'bg-gris-600' : ''}`}
                >    
                     <input 
                        type="checkbox"
                        id={`pm_${cellIndex}`} 
                        checked={selectedCheckboxes['pm'].includes(cellIndex)}
                        disabled={cell}
                        hidden={cell}
                        onChange={handleChange}
                        className="cursor-pointer w-6 h-6 accent-verde-esmeralda-400 hover:accent-verde-esmeralda-400"
                    />                  
                </div>
            ))}
        </div>
      </div>
    )
}

export default BloquesSelection;
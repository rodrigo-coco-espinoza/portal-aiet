import { useState } from "react";
import { connect } from "react-redux";
import ModalFinalizarProyecto from "./ModalFinalizarProyecto";

function ExtenderFinalizar({
    idProyecto,
    proyectoFinalizado,
}) 
{
    // Form extender proyecto
    const [formData, setFormData] = useState({
        proyectoId: idProyecto,
        documento: "",
        fechaDocumento: "",
    });

    const {
        proyectoId,
        documento,
        fechaDocumento,
    } = formData;

    const handleDocument = e => {
        setFormData({
            ...formData,
            documento: e.target.files[0]
        });
        
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

    // Finalizar proyecto
    const [showModalFinalizar, setShowModalFinalizar] = useState(false);
    const handleFinalizarProyecto = (isFinished) => {
        setShowModalFinalizar(false);
        if (isFinished) {
            proyectoFinalizado();
        }
    }

    return (
        <>
        <form onSubmit={e => {onSubmit(e)}} method="POST" action="#">
            <h1 className="font-bold text-gris-800 cursor-default mt-4">Agregar jornada extra</h1>
            <div className="">
                <label className="text-lg text-gris-700 text-sm">Adjuntar documento:</label>
                <input 
                    type='file'
                    id='documentoExtension'
                    name='documentoExtension'
                    accept='.pdf, .PDF'
                    required
                    onChange={handleDocument}
                    className="block w-full rounded border border-azul-marino-100 bg-clip-padding px-3 py-2 text-gris-800 transition file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:cursor-pointer file:border-inherit file:bg-gris-800 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gris-400 hover:file:text-gris-800 focus:border-primary focus:text-gris-800 focus:shadow-te-primary focus:outline-none"
                />
            </div>
            {/* Fecha documento */}
            <div className="mt-1 sm-sii:w-1/3 w-1/2 pr-3">
                <label className="text-gris-700 text-sm">Fecha documento:</label>
                <input 
                    type="date"
                    if="fechaDocumento"
                    name="fechaDocumento"
                    value={fechaDocumento}
                    onChange={e => setFormData({...formData, fechaDocumento: e.target.value})}
                    required
                    className="block w-full py-2 px-3 text-gris-800 leading-tight focus:outline-none focus:shadow-outline shadow appearance-none border border-azul-marino-100 rounded h-9"

                />
            </div>
            {/* Botón extender */}
            <div className="flex items-center justify-end">
                <button
                type='submit'
                className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150">
                    Extender plazo
                </button>
            </div>          
        </form>
        <h1 className="font-bold text-gris-800 cursor-default mt-4">Finalizar proyecto</h1>
        <div className="flex items-center justify-end">
            <button
            onClick={e => setShowModalFinalizar(true)}
            className="text-verde-esmeralda-300 hover:text-verde-esmeralda-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150">
                Finalizar proyecto
            </button>
        </div>
        <ModalFinalizarProyecto 
            idProyecto={proyectoId}
            closeModal={handleFinalizarProyecto}
            active={showModalFinalizar}
        />
        </>
    );
}

const mapStateToProps = state => ({

});
export default connect(mapStateToProps, {

})(ExtenderFinalizar);
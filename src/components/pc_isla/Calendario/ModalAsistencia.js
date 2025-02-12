import React from 'react';


const ModalAsistencia = ({active, closeModal}) => {


    return (
        <>
          {active && (
            <div className="bg-opacity-25 fixed inset-0 z-40 bg-black">
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 sm-sii:-top-20 outline-none focus:outline-none">
                <div className="relative sm-sii:w-full w-5/6 my-6 mx-auto max-w-3xl">
                  <div
                    className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gris-100 outline-none focus:outline-none bg-opacity-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/*header*/}
                    <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-gris-600 rounded-t">
                      <h3 className="text-normal font-semibold cursor-default text-gris-700">
                        Modificar asistencia
                      </h3>
                    </div>
    
                    {/*body*/}
                    <div className="relative flex-auto overflow-y-auto max-h-[60vh]">
                    </div>
    
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-gris-400 rounded-b">
                      <button
                        onClick={() => closeModal()}
                        className="text-rojo-300 hover:text-rojo-400  background-transparent font-bold uppercase py-0 text-sm outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );
};

export default ModalAsistencia;
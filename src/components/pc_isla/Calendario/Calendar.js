import React, { useEffect, useState } from 'react';
import ColumnaDia from './ColumnaDia';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { connect } from 'react-redux';
import { get_calendario_pc_isla } from 'redux/actions/pc_isla/pc_isla';
import Loading from 'components/formularios/Loading';

const Calendar = ({
  calendario,
  get_calendario_pc_isla
}) => {

  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(calculateItemsPerPage());
  const [currentPage, setCurrentPage] = useState(5);

  useEffect(() => {
    setLoading(true);
    get_calendario_pc_isla()
      .then(() => {
        setLoading(false);
      })
      .catch((errro) => {
        setLoading(false);
      });

    // Event listener for window resize
    const handleResize = () => {
      updateItemsPerPage();
    };
    window.addEventListener('resize', handleResize);
    
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, []);

  useEffect(() => {
    // Encuentra la fecha de hoy en el array calendario

    const today = new Date();
    const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
    const todayIndex = calendario.findIndex(item => item.fecha === formattedToday);
 
    if (todayIndex !== -1) {
      // Calcula el número de página que contiene la fecha de hoy
      const pageNumber = Math.floor(todayIndex / itemsPerPage) + 1;
      setCurrentPage(pageNumber);
    }
  }, [itemsPerPage]);

 
  
  // Calculate items per page based on screen width
  function calculateItemsPerPage() {
    if (window.innerWidth < 600) {
      return 1;
    } else if (window.innerWidth < 650) {
      return 2;
    } else if (window.innerWidth < 750) {
      return 3;
    } else if (window.innerWidth < 950) {
      return 4;
    } else {
      return 5;
    }
  }

  // Update items per page when window is resized
  function updateItemsPerPage() {
    setItemsPerPage(calculateItemsPerPage());
  }
   
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, calendario.length);
  const diasToShow = calendario.slice(startIndex, endIndex);
  const totalPages = Math.ceil(calendario.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  

  return (
    <>
    <h1 className="font-bold text-gris-700 text-4xl mt-10 mb-8 border-b-2 border-gris-500">Calendario de uso de los computadores</h1>
    <div className="flex">
      {/* Columna PCs */}
      <div className='flex flex-col w-[150px] mr-1'>
        <div className='h-[50px] bg-transparent mb-2'></div>
        <div key="JuanFernandez" className="bg-verde-esmeralda-200 mb-2 h-[104px] flex items-center justify-center">
            <p className='font-bold text-gris-800'>Juan Fernández</p>
        </div>
        <div key="BoraBora" className="bg-azul-brillante-200 mb-2 h-[104px] flex items-center justify-center">
            <p className='font-bold text-gris-800'>Bora Bora</p>
        </div>
        <div key="RapaNui" className="bg-verde-oscuro-200 mb-2 h-[104px] flex items-center justify-center">
            <p className='font-bold text-gris-800'>Rapa Nui</p>
        </div>
      </div>

      {/* Columna jornadas */}
      <div className="flex flex-col w-[40px] mr-1">
        <div className='h-[50px] bg-transparent mb-2'></div>
        <div>
          <div className="bg-gris-400 mb-1 h-[50px] flex items-center justify-center">
            <p className='text-gris-800'>AM</p>
          </div>
          <div className="bg-gris-400 mb-2 h-[50px] flex items-center justify-center">
            <p className='text-gris-800'>PM</p>
          </div>
        </div>

        <div>
          <div className="bg-gris-400 mb-1 h-[50px] flex items-center justify-center">
            <p className='text-gris-800'>AM</p>
          </div>
          <div className="bg-gris-400 mb-2 h-[50px] flex items-center justify-center">
            <p className='text-gris-800'>PM</p>
          </div>
        </div>

        <div>
          <div className="bg-gris-400 mb-1 h-[50px] flex items-center justify-center">
            <p className='text-gris-800'>AM</p>
          </div>
          <div className="bg-gris-400 mb-2 h-[50px] flex items-center justify-center">
            <p className='text-gris-800'>PM</p>
          </div>
        </div>   
      </div>

      {/* Columnas días */}
      {calendario && (diasToShow.map((dia_calendario) =>(
        <ColumnaDia
          key={dia_calendario.fecha}
          dataDia={dia_calendario}
        />
      )))}    
    </div>
    {calendario.length > 5 &&
      <div className='flex justify-end mt-4'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${currentPage === 1 ? 'bg-gris-400' : 'bg-azul-brillante-400 hover:bg-azul-marino-400'} text-white px-0.5 py-0.5 rounded-md mr-2`}
        >
          <ChevronLeftIcon className="w-6 h-6"/>
        </button>
        <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${currentPage === totalPages ? 'bg-gris-400' : 'bg-azul-brillante-400 hover:bg-azul-marino-400'} text-white px-0.5 py-0.5 rounded-md`}
      >
          <ChevronRightIcon className="w-6 h-6" />
      </button>
      </div>
    }
    {loading && <Loading message={'Cargando calendario'}/>}
    </>
  );
};

const mapStateToProps = state => ({
  calendario: state.institucion_reducer.calendario
});

export default connect (mapStateToProps, {
  get_calendario_pc_isla
})(Calendar);
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Nota from 'components/user/Nota';
import React, { useState } from 'react';
import { connect } from "react-redux"

function Notas({ 
  notas, 
  queryAuthor,
  queryData,
  onDeleteNota,
  user
}) {

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, notas.length);

  // Slice the notas array to get only the items for the current page
  const notasToShow = notas.slice(startIndex, endIndex);

  const totalPages = Math.ceil(notas.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="mt-8 mb-8">
      <p className="text-lg font-bold text-gris-800">Notas</p>
      
      {notas && notas.length > 0 ? (notasToShow.map((nota) => (
                                <Nota 
                                    key={nota.id}
                                    nota={nota}
                                    queryAuthor={queryAuthor}
                                    onDeleteNota={onDeleteNota}
                                    
                                />
                                ))) : (
                                    <p>Sin notas.</p>
                                )
                            }
      {notas.length > 0 && 
      <div className="flex justify-end mt-4">
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
      
    </div>
  );
}

const mapStateToProps = state => ({
    user: state.auth.user
})
export default connect (mapStateToProps, {
    
} )(Notas)


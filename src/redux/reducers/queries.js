import {
    GET_QUERIES_SUCCESS,
    GET_QUERIES_FAIL,
    GET_COMBOBOX_SUCCES,
    GET_COMBOBOX_FAIL,
    EDIT_QUERY_SUCCESS,
    EDIT_QUERY_FAIL,
    ADD_QUERY_SUCCESS,
    ADD_QUERY_FAIL,
    DELETE_QUERY_FAIL,
    DELETE_QUERY_SUCCESS,
    DELETE_NOTA_FAIL,
    DELETE_NOTA_SUCCESS,
    ADD_NOTA_SUCCESS,
    ADD_NOTA_FAIL,
} from '../actions/queries/types'

const initialState = {
    queries: [],
    options: []
}

export function queries( state=initialState, action ){
    const { type, payload } = action

    switch( type ){
        case GET_QUERIES_SUCCESS:
            return {
                ...state,
                queries: payload.queries
            }
        case GET_QUERIES_FAIL:
            return {
              ...state,
              queries: []  
            }
        case GET_COMBOBOX_SUCCES:
            return {
                ...state,
                options: payload.comboboxOptions
            }
        case GET_COMBOBOX_FAIL:
            return {
                ...state,
                options: []
            }
        case EDIT_QUERY_SUCCESS:
            const {id, nombre, texto} = payload.queryActualizada
            const updatedQueries = state.queries.map(query => {
                if (query.id === id) {
                    // Replace the existing query with the updated one
                    return {
                        ...query,
                        nombre: nombre,
                        texto: texto
                    }
                }
                return query;
            });
        
            return {
                ...state,
                queries: updatedQueries,
            };
        case EDIT_QUERY_FAIL:
            return {...state}
        case ADD_QUERY_SUCCESS:
            return {
                ...state,
                queries: [...state.queries, payload.nuevaQuery]
            }
        case DELETE_QUERY_SUCCESS:
            const queryId = payload.queryEliminada
            const updatedQueriesAfterDelete = state.queries.filter((query) => query.id !== parseInt(queryId))
            return {
                ...state,
                queries: updatedQueriesAfterDelete
            }
        case DELETE_NOTA_SUCCESS:
            const notaId = payload.notaID
            const notaQueryId = payload.queryID
      
            // Buscar la query en el estado
            const queryToUpdate = state.queries.find(query => query.id === notaQueryId);
            // Verificar si se encontró la query
            if (queryToUpdate) {
                // Filtrar las notas de la query para eliminar la que tiene el ID correspondiente
                const updatedNotas = queryToUpdate.notas.filter(nota => nota.id !== parseInt(notaId));
                // Crear una copia actualizada de la query con las notas modificadas
                const updatedQuery = {
                    ...queryToUpdate,
                    notas: updatedNotas,
                };
                // Crear una copia actualizada del estado con la query modificada
                const updatedQueries = state.queries.map(query => (query.id === parseInt(notaQueryId) ? updatedQuery : query));
                return {
                    ...state,
                    queries: updatedQueries,
                };
            } else {
                return state
            }
        
        case ADD_NOTA_SUCCESS:
          const idQuery = payload.idQuery
          const nuevaNota = payload.nuevaNota
        
          const updatedNotasQuery = state.queries.map(query => {
            if (query.id === idQuery){
                return{
                    ...query,
                    notas: [nuevaNota, ...query.notas]
                };
            }

            return query;
          });

          return {
            ...state,
            queries: updatedNotasQuery
          };


        case ADD_NOTA_FAIL:
        case ADD_QUERY_FAIL:
        case DELETE_NOTA_FAIL:
        case DELETE_QUERY_FAIL:
            return {...state}

        default: 
            return state
    }
}


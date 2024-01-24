import { Fragment, useState, useRef } from "react"
import { Combobox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { flushSync } from "react-dom"
import Notas from "./Notas"
import { Tooltip } from "react-tooltip"
import { connect } from "react-redux"
import AgregarNota from "components/user/AgregarNota"


function ComboboxQuery({options, queryData, user, queries, isAuthenticated}){

  const [selected, setSelected] = useState({
    id: 0,
    name: 'Escriba para buscar query'
  })
  const [query, setQuery] = useState('')
  const [queryText, setQueryText] = useState('')
  const [queryNotes, setQueryNotes]  = useState([])
  const [queryAuthor, setQueryAuthor] = useState('')
  const [queryId, setQueryId] = useState('')
  const inputRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false)


  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  const handleChange = (event) => {
    setSelected(event)    
    let selectedQuery = queryData.filter( query => {
      return query.id === event.id
    })

    setQueryText(selectedQuery[0].texto)
    setQueryNotes(selectedQuery[0].notas)  
    setQueryAuthor(selectedQuery[0].author[0].id)
    setQueryId(selectedQuery[0].id)
  }

  const handleClick = (event) => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
   }
  }

  const copyMeOnClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = queryText;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  const handleDeleteNota = (id) => {
    setQueryNotes((prevNotes) => prevNotes.filter((nota) => nota.id !== id));
  }

  const handleAddNota = (newNote) => {
    setQueryNotes((prevNotes) => [newNote, ...prevNotes]) 
  }

  return (
    <div className="mx-42 xl:mx-72 mt-8">
      <div className="top-16">
        <Combobox value={selected} onChange={handleChange} onClick={handleClick}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gris-900 focus:outline-none"
                displayValue={(option) => option.name}
                onChange={(event) => setQuery(event.target.value)}
                ref={inputRef}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gris-600"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {filteredOptions.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gris-700">
                    No se han encontrado queries.
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <Combobox.Option
                      key={option.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-verde-esmeralda-400 text-verde-oscuro-400' : 'text-gris-900'
                        }`
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {option.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-verde-oscuro-400' : 'text-verde-esmeralda-400'
                              }`}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>

      {/* QUERY y BOTÓN COPIAR */}
      <div className={`relative z-0 mt-4 pb-8 px-4 flex justify-left leading-tight text-gris-800 bg-white shadow-lg rounded-lg overflow-auto ${selected.id !== 0 ? "" : "hidden"}`}>

        <p id='queryText' className="whitespace-pre text-xl pt-8 ">{queryText}</p>
        <div>
          <a className="anchor-clipboard absolute pt-2 top-0 right-2" onClick={copyMeOnClipboard}>{iconClipboard()}</a>
          <Tooltip anchorSelect=".anchor-clipboard" place="left">{isCopied ? "¡Copiado!" : "Copiar"}</Tooltip>
        </div>
          
      </div>

      {/* NOTAS */}
      <div className={`${selected.id !== 0 ? "" : "hidden"}`}>
        <Notas
          key="notas_query"
          notas={queryNotes}
          queryAuthor={queryAuthor}
          queryData={queryData}
          onDeleteNota={handleDeleteNota}
        />

        
        {(user && (user.is_staff || queryAuthor === user.id)) &&
        <AgregarNota
          idQuery={queryId}
          onAddNota={handleAddNota}
        />
        }
      </div>

      
      
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  queries: state.queries.queries
})

export default connect (mapStateToProps, {
} )(ComboboxQuery)


function iconClipboard(){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:fill-gris-600">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
</svg>

  )
}
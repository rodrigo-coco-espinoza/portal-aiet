import { Fragment, useState, useRef, useEffect } from "react"
import { Combobox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { Tooltip } from "react-tooltip"
import { connect } from "react-redux"
import { React } from "react"


function ComboboxSelect({options, onChange, label, render=true}){

  const [selected, setSelected] = useState({
    id: -1,
    full_name: 'Escriba para buscar'
  });
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setSelected({
      id: -1,
      full_name: 'Escriba para buscar'
    });
  }, [render]);



  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.full_name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  const handleChange = (event) => {
    setSelected(event)
    onChange(event, label) 
    
  }

  const handleClick = (event) => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
   }
  }

  return (
    <div className="">
      <div className="top-16">
        <Combobox value={selected} onChange={handleChange} onClick={handleClick}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded bg-white text-left shadow focus:shadow-outline  sm:text-sm border border-azul-marino-100 leading-tight">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gris-800 focus:outline-none"
                displayValue={(option) => option.full_name}
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
                    No se ha encontrado la institución.
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
                            {option.full_name}
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
    </div>
  )
}

export default ComboboxSelect

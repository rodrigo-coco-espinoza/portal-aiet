import { useState } from 'react'
import { Tab } from '@headlessui/react'
import DetalleConvenio from './infoConvenios/detalleConvenio/DetalleConvenio'
import Timeline from '../Timeline'
import ResumenConvenios from './infoConvenios/ResumenConvenios'
import IntercambioInformacion from './intercambioInformacion/IntercambioInformacion'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function TabsInstitucion({
  data,
  user,
}) {


  return (
    <div className="w-full py-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-azul-marino-400 p-1">
          <Tab
            key="convenios"
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-md font-medium leading-5 focus:outline-none',
                selected
                  ? 'bg-white text-azul-cobalto-400 shadow'
                  : 'text-azul-cobalto-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            Convenios
          </Tab>

          <Tab
            key="intercambio"
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-md font-medium leading-5 focus:outline-none',
                selected
                  ? 'bg-white text-azul-cobalto-400 shadow'
                  : 'text-azul-cobalto-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            Intercambio de información
          </Tab>

          {/* <Tab
            key="tareas"
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-md font-medium leading-5 focus:outline-none',
                selected
                  ? 'bg-white text-azul-cobalto-400 shadow'
                  : 'text-azul-cobalto-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            Tareas
          </Tab> */}

        </Tab.List>


        <Tab.Panels className="mt-4">
          {/* Información de convenios */}
          <Tab.Panel
            key="conveniosPanel"
          >           
            <ResumenConvenios 
              data={data.convenios}
              user={user}
            />
          </Tab.Panel>

          {/* Intercambio de información */}
          <Tab.Panel
            key="intercambioPanel"
          >
            <IntercambioInformacion 
              data={data.intercambioInformacion}
            />
          </Tab.Panel>

          {/* Tareas */}
          {/* <Tab.Panel
            key="tareasPanel"
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            )}
          >
          </Tab.Panel> */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default TabsInstitucion

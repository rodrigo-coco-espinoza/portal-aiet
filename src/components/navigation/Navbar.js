import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import logo from "assets/img/logo.png"
import { useState, Fragment } from "react"
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import "boxicons"

const solutions = [
    {
      name: 'Insights',
      description: 'Measure actions your users take',
      href: '##',
      icon: IconOne,
    },
    {
      name: 'Automations',
      description: 'Create your own targeted content',
      href: '##',
      icon: IconTwo,
    },
    {
      name: 'Reports',
      description: 'Keep track of your growth',
      href: '##',
      icon: IconThree,
    },
  ]

function Navbar(){


    return(
        <nav data-scroll data-scroll-id="hey" id="navbar" className="bg-azul-marino-400 w-full py-4 top-0 transition duration-300 ease-in-out z-40 fixed shadow-md">
            <div className="px-4 sm:px-6">
                <div className="-ml-4 -mt-2 hidden lg:flex flex-wrap items-center justify-between sm:flex-nowrap md:px-4 px-2">
                    <Link to="/" className="mt-2">
                        <img src={logo} width={140} alt="Logo SII"/>
                    </Link>
                    <div className="ml-4 mt-2 flex-shrink-0">
                        <NavLink to="/busqueda" className="text-gris-300 text-lg inline-flex font-medium leading-6 border-b-2 border-azul-marino-400 hover:border-b-2 hover:border-naranja-400 transition duration-300 ease-in-out mx-4">
                            Buscar queries
                        </NavLink>
                        <NavLink to="/validador" className="text-gris-300 text-lg inline-flex font-medium leading-6 border-b-2 border-azul-marino-400 hover:border-b-2 hover:border-naranja-400 transition duration-300 ease-in-out mx-4">
                            Validar archivos
                        </NavLink>

                        

                    </div>
                </div>

                <div className="-ml-4 -mt-2 lg:hidden flex flex-wrap items-center justify-between sm:flex-nowrap md:px-4 px-2">
                    <Link to="/" className="mt-2">
                        <img src={logo} width={140} alt="Logo SII"/>
                    </Link>
                    <div className="ml-4 mt-2 flex-shrink-0">
                        <Popover className="relative">
                            {({ open }) => (
                            <>
                                <Popover.Button
                                className={` ${open ? '' : 'text-opacity-90'} focus:ring-none focus:outline-none` } >
                                    { open ?
                                        <box-icon 
                                            name='x' 
                                            color="#E0E0E0"
                                            size="lg"      
                                        />
                                        
                                    :
                                        <box-icon 
                                            name='menu' 
                                            color="#E0E0E0"
                                            size="lg"      
                                        />
                                        
                                    }


                  
                                </Popover.Button>
                                <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                                >
                                <Popover.Panel className="absolute -left-16 z-10 mt-3 w-screen w-[202px] -translate-x-1/2 transform">
                                    <div className="overflow-hidden rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid py-3 gap-2  bg-white lg:grid-cols-2">
                                    <Link to="/busqueda" className="text-gris-800 text-lg inline-flex font-medium leading-6 border-b-2 border-white hover:border-b-2 hover:border-naranja-400 transition duration-300 ease-in-out mx-4">
                                        Buscar queries
                                    </Link>
                                    <NavLink to="/validador" className="text-gris-800 text-lg inline-flex font-medium leading-6 border-b-2 border-white hover:border-b-2 hover:border-naranja-400 transition duration-300 ease-in-out mx-4">
                                        Validar archivos
                                    </NavLink>
                                    </div>

                                    </div>
                                </Popover.Panel>
                                </Transition>
                            </>
                            )}
                        </Popover>




                        

                    </div>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProp = state => ({

})

export default connect(mapStateToProp, {

}) (Navbar)


function IconOne() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
          stroke="#FB923C"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
      </svg>
    )
  }
  
  function IconTwo() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
          stroke="#FB923C"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
      </svg>
    )
  }
  
  function IconThree() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
        <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
        <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
        <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
        <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
        <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
      </svg>
    )}
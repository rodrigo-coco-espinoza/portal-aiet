import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import logo from "assets/img/logo.png"
import { useState, Fragment } from "react"
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, UserCircleIcon  } from '@heroicons/react/20/solid'

import "boxicons"

function Navbar(){


    return(
        <nav data-scroll data-scroll-id="hey" id="navbar" className="bg-azul-marino-400 w-full py-4 top-0 transition duration-300 ease-in-out z-40 fixed shadow-md">
            <div className="px-4 sm:px-6">
                <div className="-ml-4 -mt-2 hidden lg:flex flex-wrap items-center justify-between sm:flex-nowrap md:px-4 px-2">
                    <Link to="/" className="mt-2">
                        <img src={logo} width={140} alt="Logo SII"/>
                    </Link>
                    <div className="ml-4 mt-2 flex-shrink-0 flex items-end">
                        <NavLink to="/convenios" className="text-gris-300 text-lg inline-flex font-medium leading-6 border-b-2 border-azul-marino-400 hover:border-b-2 hover:border-naranja-400 transition duration-300 ease-in-out mx-4">
                            Convenios
                        </NavLink>
                        <NavLink to="/busqueda" className="text-gris-300 text-lg inline-flex font-medium leading-6 border-b-2 border-azul-marino-400 hover:border-b-2 hover:border-naranja-400 transition duration-300 ease-in-out mx-4">
                            Buscar queries
                        </NavLink>
                        <NavLink to="/pc_isla" className="text-gris-300 text-lg inline-flex font-medium leading-6 border-b-2 border-azul-marino-400 hover:border-b-2 hover:border-naranja-400 transition duration-300 ease-in-out mx-4">
                            PC Isla
                        </NavLink>
                        <NavLink to="/validador" className="text-gris-300 text-lg inline-flex font-medium leading-6 border-b-2 border-azul-marino-400 hover:border-b-2 hover:border-naranja-400 transition duration-300 ease-in-out mx-4">
                            Validar archivos
                        </NavLink>
                        <NavLink
                          to="/usuarios"
                          className="text-white hover:text-naranja-400 inline-flex"
                          name="userIcon"
                        >
                          <UserCircleIcon className="w-8 h-8 mt-1"/>
                        </NavLink>
                        

                    </div>
                </div>

                <div className="-ml-4 -mt-2 lg:hidden flex flex-wrap items-center justify-between sm:flex-nowrap md:px-4 px-2">
                    <Link to="/" className="mt-2">
                        <img src={logo} width={140} alt="Logo SII"/>
                    </Link>
                    <div className="ml-4 mt-2 flex flex-shrink-0">
                    <NavLink
                        name="userIcon"
                        to="/usuarios"
                        className="text-white hover:text-naranja-400 inline-flex "
                    >
                        <UserCircleIcon className="w-9 h-9 mt-1"/>
                    </NavLink>
                        
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
                                <Popover.Panel className="absolute -left-16 z-10 mt-3 w-[202px] -translate-x-1/2 transform">
                                    <div className="overflow-hidden rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid py-3 gap-2  bg-white lg:grid-cols-2">
                                    <NavLink to="/busqueda" className="text-gris-800 text-lg inline-flex font-medium leading-6 border-b-2 border-white hover:border-b-2 hover:border-naranja-400 transition duration-300 ease-in-out mx-4">
                                        Convenios
                                    </NavLink>
                                    <NavLink to="/busqueda" className="text-gris-800 text-lg inline-flex font-medium leading-6 border-b-2 border-white hover:border-b-2 hover:border-naranja-400 transition duration-300 ease-in-out mx-4">
                                        Buscar queries
                                    </NavLink>
                                    <NavLink to="/pc_isla" className="text-gris-800 text-lg inline-flex font-medium leading-6 border-b-2 border-white hover:border-b-2 hover:border-naranja-400 transition duration-300 ease-in-out mx-4">
                                        PC Isla
                                    </NavLink>
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


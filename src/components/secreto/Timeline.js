import Etapa from "./Etapa"


const data ={
    finalizado: false,  
    etapas: [
        {
            id: 1,
            etapa: "Definición de alcance del convenio",
            tareas: [
                {
                    id: 10,
                    duracion: null,
                    plazo: null,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Inicio del proceso",
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    id: 11,
                    duracion: 10,
                    plazo: 10,
                    duracionAcumulada: 10,
                    plazoAcumulado: 10,
                    enCurso: false,
                    nombreTarea: "Realizar presentaciones de trabajo",
                    responsables: [
                        {
                            area: 'SDF',
                            duracion: 10
                        },
                        {
                            area: "SDJ",
                            duracion: 10
                        },
                        {
                            area:"SDI",
                            duracion: 10
                        },
                        {
                            area: "IE",
                            duracion: 10
                        }
                    ],
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        },
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        },
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        },
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        },
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        },
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        },
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        },
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        },
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        },
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        },
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        },
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        },
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        },
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        },
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        },
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    id: 12,
                    duracion: 17,
                    plazo: 10,
                    duracionAcumulada: 27,
                    plazoAcumulado: 20,
                    enCurso: false,
                    nombreTarea: "Levantamiento de requerimientos",
                    responsables: [
                        {
                            area: 'SDF',
                            duracion: 10
                        },
                        {
                            area: "SDJ",
                            duracion: 6
                        },
                        {
                            area:"SDI",
                            duracion: 17
                        },
                        {
                            area: "IE",
                            duracion: 12
                        }
                    ],
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    id: 13,
                    duracion: 4,
                    plazo: 5,
                    duracionAcumulada: 31,
                    plazoAcumulado: 25,
                    enCurso: false,
                    nombreTarea: "Consolidar requerimientos",
                    responsables: [
                        {
                        area: 'SDGEET',
                        duracion: 4,
                        }
                    ],
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    id: 14,
                    duracion: 15,
                    plazo: 10,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Pronunciamiento SDJ",
                    responsables: [
                        {
                        area: 'SDJ',
                        duracion: 15,
                        }
                    ],
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    id: 15,
                    duracion: 8,
                    plazo: 10,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Modificar requerimientos",
                    responsables: [
                        {
                            area: 'SDF',
                            duracion: 8
                        },
                        {
                            area: "SDJ",
                            duracion: 7
                        },
                        {
                            area:"SDI",
                            duracion: 6
                        },
                        {
                            area: "IE",
                            duracion: 4
                        }
                    ],
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    id: 16,
                    duracion: 10,
                    plazo: 10,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Generar reunión de alcance y acordar ficha",
                    responsables: [
                        {
                            area: 'SDGEET',
                            duracion: 10,
                        }
                    ],
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                }
            ]
        },
        {
            id: 2,
            etapa: "Confección de documento de convenio",
            tareas: [
                {
                    id: 17,
                    duracion: 10,
                    plazo: 15,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Enviar documento de convenio a institución externa",
                    responsables: [{
                        area: '',
                        duracion: 0,
                    }],
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]
                },
                {
                    id: 18,
                    duracion: 10,
                    plazo: 15,
                    duracionAcumulada: 999,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Revisar documeto y enviar a subdirecciones para revisión",
                    responsables: [{
                        area: '',
                        duracion: 0,
                    }],
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    id: 19,
                    duracion: 10,
                    plazo: 2,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Consolidar convenio",
                    responsables: [{
                        area: '',
                        duracion: 0,
                    }],
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    id: 20,
                    duracion: 10,
                    plazo: 10,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Enviar convenio a subdirecciones para revisión",
                    responsables: [{
                        area: '',
                        duracion: 0,
                    }],
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    id: 21,
                    duracion: 10,
                    plazo: 1,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Enviar convenio a institución externa para revisión",
                    responsables: [{
                        area: '',
                        duracion: 0,
                    }],
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    id: 22,
                    duracion: 10,
                    plazo: 10,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Agendar reunión sancionatoria",
                    responsables: [
                        {
                            area: 'SDGEET',
                            duracion: 10,
                        },
                        {
                            area: 'SDF',
                            duracion: 10,
                        },
                        {
                            area: 'SDJ',
                            duracion: 10,
                        },
                        {
                            area: 'SDI',
                            duracion: 10,
                        }
                    ],
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    id: 23,
                    duracion: 3,
                    plazo: 3,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Redactar acta de acuerdo",
                    responsables: [
                        {
                            area: 'SDGEET',
                            duracion: 3,
                        }
                    ],
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                }
            ]
        },
        {
            id: 3,
            etapa: "Gestión de visto bueno y firmas",
            tareas: [
                {
                    id: 24,
                    duracion: 4,
                    plazo: 5,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: true,
                    nombreTarea: "Generar resolución",
                    responsables: [
                        {
                            area: 'SDGEET',
                            duracion: 4,
                        }
                    ],
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]
                },
                {
                    id: 25,
                    duracion: null,
                    plazo: 10,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Revisión y visto bueno de SDJ",
                    responsables: [
                        {
                            area: 'SDJ',
                            duracion: null,
                        }
                    ],
                    comentarios: null
                },
                {
                    id: 26,
                    duracion: null,
                    plazo: 2,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Enviar convenio a visto bueno del gabinete del director",
                    responsables: [
                        {
                            area: 'SDGEET',
                            duracion: null,
                        }
                    ],
                    comentarios: null
                },
                {
                    id: 27,
                    duracion: null,
                    plazo: 5,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Revisar y dar visto bueno del gabinete del director",
                    responsables: [
                        {
                            area: 'GDIR',
                            duracion: null,
                        }
                        
                    ],
                    comentarios: null
                },
                {
                    id: 28,
                    duracion: null,
                    plazo: 5,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Revisar firmas y acordar fecha con institución externa",
                    responsables: [
                        {
                            area: 'SDGEET',
                            duracion: null,
                        },
                        {
                            area: 'IE',
                            duracion: null,
                        }
                    ],
                    comentarios: null
                },
                {
                    id: 29,
                    duracion: null,
                    plazo: 1,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Enviar a firma de director",
                    responsables: [
                        {
                            area: 'GDIR',
                            duracion: null,
                        },
                        {
                            area: 'IE',
                            duracion: null,
                        }
                    ],
                    comentarios: null
                }
            ]
        },
        {
            id: 4,
            etapa: "Generación de resolución",
            tareas: [
                {
                    id: 30,
                    duracion: null,
                    plazo: 3,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Generar ficha y reunir información",
                    responsables: [
                        {
                            area: 'SDGEET',
                            duracion: null,
                        }
                    ],
                    comentarios: null
                },
                {
                    id: 31,
                    duracion: null,
                    plazo: 5,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Validar y publicar resolución de convenio",
                    responsables: [
                        {
                            area: 'GDIR',
                            duracion: null,
                        }
                    ],
                    comentarios: null
                },
                {
                    id: 32,
                    duracion: null,
                    plazo: 1,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Informar resolución y cerrar expediente",
                    responsables: [
                        {
                            area: 'SDGEET',
                            duracion: null,
                        }
                    ],
                    comentarios: null
                },
            ]
        },
        {
            id: 5,
            etapa: "Protocolo Técnico",
            tareas: [
                {
                    id: 33,
                    duracion: null,
                    plazo: 10,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Organizar reunión de coordinación",
                    responsables: [
                        {
                            area: 'SDGEET',
                            duracion: null,
                        },
                        {
                            area: 'SDF',
                            duracion: null,
                        },
                        {
                            area: 'SDI',
                            duracion: null,
                        },
                        {
                            area: 'IE',
                            duracion: null,
                        }
                    ],
                    comentarios: null
                },
                {
                    id: 34,
                    duracion: null,
                    plazo: 5,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Confeccionar/Actualizar protocolo",
                    responsables: [
                        {
                            area: 'SDGEET',
                            duracion: null,
                        }
                    ],
                    comentarios: null
                },
                {
                    id: 35,
                    duracion: null,
                    plazo: 5,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Revisar y validar protocolo",
                    responsables: [
                        {
                            area: 'SDF',
                            duracion: null
                        },
                        {
                            area:"SDI",
                            duracion: null
                        },
                        {
                            area: "IE",
                            duracion: null
                        }
                    ],
                    comentarios: null
                },
                {
                    id: 36,
                    duracion: null,
                    plazo: 5,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Revisar y firmar protocolo por institución externa",
                    responsables: [
                        {
                            area: 'IE',
                            duracion: null,
                        }
                    ],
                    comentarios: null
                },
                {
                    id: 37,
                    duracion: null,
                    plazo: 3,
                    duracionAcumulada: 123,
                    plazoAcumulado: 456,
                    enCurso: false,
                    nombreTarea: "Firmar protocolo técnico",
                    responsables: [
                        {
                            area: 'SDGEET',
                            duracion: null,
                        },            
                    ],
                    comentarios: null
                },
                
            ]
        },
    ]
}
     


function Timeline(){
   
    return (
        <div className="py-20 sm:py-0 shadow-lg rounded-xl bg-white w-full">
        <p className="px-4 pt-4 font-bold text-xl">Proceso de convenio</p>
        <div className="sm:pl-32">
            {data.etapas.map((etapa) => (
                <Etapa
                    key={etapa.id}
                    data={etapa}
                />
            ))}

            {/* Fin del proceso */}
            <ol className="relative border-l-4 border-gris-300">                  
            <li className="pb-0 ml-6">
                {/* Círculo */}           
                <span className={`absolute flex items-center justify-center w-4 h-4 rounded-full -left-2.5 top-2 ring-4 ring-gris-300 ${data.finalizado ? "bg-naranja-sii" : "bg-gris-500"}`}/>

                <h3 className={`flex items-center text-lg font-semibold mb-8 ${data.finalizado ? "text-gris-800" : "text-gris-500"}`}>
                    Fin del proceso
                </h3>

                
            </li>      
        </ol>
        </div>      
        </div>

        
    )
}

export default Timeline






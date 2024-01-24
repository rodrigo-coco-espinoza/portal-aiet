import Etapa from "./Etapa"

const data = [
        {
            etapa: "Definición de alcance del convenio",
            tareas: [
                {
                    duracion: 10,
                    plazo: 10,
                    nombreTarea: "Inicio del proceso",
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    duracion: 10,
                    plazo: 10,
                    nombreTarea: "Realizar presentaciones de trabajo",
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    duracion: 10,
                    plazo: 10,
                    nombreTarea: "Levantamiento de requerimientos",
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    duracion: 10,
                    plazo: 10,
                    nombreTarea: "Consolidar requerimientos",
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    duracion: 10,
                    plazo: 10,
                    nombreTarea: "Pronunciamiento SDJ",
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    duracion: 10,
                    plazo: 10,
                    nombreTarea: "Modificar requerimientos",
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    duracion: 10,
                    plazo: 10,
                    nombreTarea: "Generar reunión de alcance y acordar ficha",
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
            etapa: "Confección de documento de convenio",
            tareas: [
                {
                    duracion: 10,
                    plazo: 10,
                    nombreTarea: "Enviar documento de convenio a institución externa",
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]
                },
                {
                    duracion: 10,
                    plazo: 10,
                    nombreTarea: "Revisar documeto y enviar a subdirecciones para revisión",
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    duracion: 10,
                    plazo: 10,
                    nombreTarea: "Consolidar convenio",
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    duracion: 10,
                    plazo: 10,
                    nombreTarea: "Enviar convenio a subdirecciones para revisión",
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    duracion: 10,
                    plazo: 10,
                    nombreTarea: "Enviar convenio a institución externa para revisión",
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    duracion: 10,
                    plazo: 10,
                    nombreTarea: "Agendar reunión sancionatoria",
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]  
                },
                {
                    duracion: 10,
                    plazo: 10,
                    nombreTarea: "Redactar acta de acuerdo",
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
            etapa: "Gestión de visto bueno y firmas",
            tareas: [
                {
                    duracion: 10,
                    plazo: 10,
                    nombreTarea: "Generar resolución",
                    comentarios: [
                        {
                            fecha: "13-10-2023",
                            texto: "Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus."
                        }
                    ]
                },
                {
                    duracion: null,
                    plazo: 10,
                    nombreTarea: "Revisión y visto bueno de SDJ",
                    comentarios: [
                        {
                            fecha: "13-10-2050",
                            texto: "Fecha estimada comienzo de tarea."
                        }
                    ]
                },
                {
                    duracion: null,
                    plazo: 10,
                    nombreTarea: "Enviar convenio a visto bueno del gabinete del director",
                    comentarios: [
                        {
                            fecha: "13-10-2050",
                            texto: "Fecha estimada comienzo de tarea."
                        }
                    ]
                },
                {
                    duracion: null,
                    plazo: 10,
                    nombreTarea: "Revisar y dar visto bueno del gabinete del director",
                    comentarios: [
                        {
                            fecha: "13-10-2050",
                            texto: "Fecha estimada comienzo de tarea."
                        }
                    ]
                },
                {
                    duracion: null,
                    plazo: 10,
                    nombreTarea: "Revisar firmas y acordar fecha con institución externa",
                    comentarios: [
                        {
                            fecha: "13-10-2050",
                            texto: "Fecha estimada comienzo de tarea."
                        }
                    ]
                },
                {
                    duracion: null,
                    plazo: 10,
                    nombreTarea: "Enviar a firma de director",
                    comentarios: [
                        {
                            fecha: "13-10-2050",
                            texto: "Fecha estimada comienzo de tarea."
                        }
                    ]
                }
            ]
        },
        {
            etapa: "Generación de resolución",
            tareas: [
                {
                    duracion: null,
                    plazo: 10,
                    nombreTarea: "Generar ficha y reunir información",
                    comentarios: [{
                        fecha: "13-10-2050",
                        texto: "Fecha estimada comienzo de tarea."
                    }]
                },
                {
                    duracion: null,
                    plazo: 10,
                    nombreTarea: "Validar y publicar resolución de convenio",
                    comentarios: [{
                        fecha: "13-10-2050",
                        texto: "Fecha estimada comienzo de tarea."
                    }]
                },
                {
                    duracion: null,
                    plazo: 10,
                    nombreTarea: "Informar resolución y cerrar expediente",
                    comentarios: [{
                        fecha: "13-10-2050",
                        texto: "Fecha estimada comienzo de tarea."
                    }]
                },
            ]
        },
        {
            etapa: "Protocolo Técnico",
            tareas: [
                {
                    duracion: null,
                    plazo: 10,
                    nombreTarea: "Organizar reunión de coordinación",
                    comentarios: [{
                        fecha: "13-10-2050",
                        texto: "Fecha estimada comienzo de tarea."
                    }]
                },
                {
                    duracion: null,
                    plazo: 10,
                    nombreTarea: "Confeccionar/Actualizar protocolo",
                    comentarios: [{
                        fecha: "13-10-2050",
                        texto: "Fecha estimada comienzo de tarea."
                    }]
                },
                {
                    duracion: null,
                    plazo: 10,
                    nombreTarea: "Revisar y validar protocolo",
                    comentarios: [{
                        fecha: "13-10-2050",
                        texto: "Fecha estimada comienzo de tarea."
                    }]
                },
                {
                    duracion: null,
                    plazo: 10,
                    nombreTarea: "Revisar y firmar protocolo por institución externa",
                    comentarios: [{
                        fecha: "13-10-2050",
                        texto: "Fecha estimada comienzo de tarea."
                    }]
                },
                {
                    duracion: null,
                    plazo: 10,
                    nombreTarea: "Firmar protocolo técnico",
                    comentarios: [{
                        fecha: "13-10-2050",
                        texto: "Fecha estimada comienzo de tarea."
                    }]
                },
            ]
        },
    ]
     


function Timeline(){
   
    return (
        <div className="py-20 sm:py-0">

            {data.map((etapa) => (
                <Etapa 
                    data={etapa}
                />
            ))}


            <div className="relative pl-8 sm:pl-32 py-6 group">
                {/* ETAPA */}
                <div className="italic font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">
                    Fin del proceso
                </div>
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                    {/* PlAZO */}
                    <time className="sm:absolute left-6 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-16 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                        150/150
                    </time>
                    {/* TAREA  */}
                    <div className="text-xl font-bold text-slate-900">
                    Cerrar expediente
                    </div>
                </div>        
            </div>
                       
        </div>
    )
}

export default Timeline






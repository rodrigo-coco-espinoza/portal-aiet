import InfoInstitucion from "components/convenios/infoInstitucion/InfoInstitucion"
import TabsInstitucion from "components/convenios/tabsInstitucion/TabsInstitucion"
import ComboboxSelect from "components/pc_isla/ComboboxSelect"
import { useState } from "react"
import { connect }  from "react-redux";
import { PlusIcon } from "@heroicons/react/20/solid"
import { Tooltip } from "react-tooltip"


const institucionesOptions = [
    {id: 1, full_name: 'IPS Instituto de Previsión Social'},
    {id: 2, full_name: 'CORFO Corporación de Fomento de la Producción'}
]

const institucionesInfo = [
    {
        id: 1,
        nombre: 'Instituto de Previsión Social',
        sigla: 'IPS',
        encargadoSII: 
        {
            id: 1,
            nombre: 'Rodrigo Espinoza',
            email: 'rodrigo.espinza@sii.cl',
            telefono: null,
            area: 'Área de Informaición y Estadísticas Tributarias',
            cargo: 'Analista',
            institucion: 100,
            subdireccion: 100,
        },
        backupSII: 
        {
            id: 2,
            nombre: 'Cristian Gutiérrez',
            email: 'cristian.gutierrezv@sii.cl',
            telefono: null,
            area: 'Área de Informaición y Estadísticas Tributarias',
            cargo: 'Analista',
            institucion: 100,
            subdireccion: 100,
        },
        rut: '61.979.440-0',
        direccion: 'Huérfanos 886, Santiago',
        tipoInstitucion: 'Servicio Público',
        pertenencia: 'Ministerio del Trabajo y Previsión Social (MINTRAB)',
        convenios: [         
            {
                id: 3,
                indice: 1,
                nombre: 'Proceso Independientes',
                tipo: 'Adendum',
                temas: 'Web Service, Mandatarios digitales',
                estado: 'En proceso',
                nroGabinete: 'GE254026',
                fechaFirma: '03-10-2023',
                documento: '',
                fechaResolucion: null,
                nroResolucion: null,
                linkResolucion: null,
                textoResolucion: null,
                subdireccionesInvolucradas: 'SDI',
                convenioPadre: {
                    nombre: 'Convenio bilateral',
                    indice: 3
                },
                adendum: null,
                encargadoIE: {
                    id: 3,
                    nombre: 'Lorena Espinosa',
                    email: 'lorena.espinosa@ips.cl',
                    telefono: null,
                    area: 'Área de Convenios',
                    cargo: 'Analista',
                    institucion: 1,
                    subdireccion: null,
                },
                backupIE: {
                    id: 4,
                    nombre: 'Manuel Guzmán',
                    email: 'manuel.guzman@ips.cl',
                    telefono: null,
                    area: 'Área de Convenios',
                    cargo: 'Analista',
                    institucion: 1,
                    subdireccion: null,
                },
                
            },
            {
                id: 2,
                indice: 2,
                nombre: 'Entregas semanales',
                tipo: 'Adendum',
                temas: 'Intercambio batch, Clave tributaria',
                estado: 'En producción',
                nroGabinete: 'GE004257',
                fechaFirma: '07-12-2021',
                documento: '',
                fechaResolucion: '24-02-2022',
                nroResolucion: '20',
                linkResolucion: 'https://www.sii.cl/normativa_legislacion/resoluciones/2022/reso20.pdf',      
                textoResolucion: 'N°20 del 24-02-2022',
                subdireccionesInvolucradas: 'SDTI',
                convenioPadre: {
                    nombre: 'Convenio bilateral',
                    indice: 3
                },
                adendum: null,
                encargadoIE: {
                    id: 3,
                    nombre: 'Lorena Espinosa',
                    email: 'lorena.espinosa@ips.cl',
                    telefono: null,
                    area: 'Área de Convenios',
                    cargo: 'Analista',
                    institucion: 1,
                    subdireccion: null,
                },
                backupIE: {
                    id: 4,
                    nombre: 'Manuel Guzmán',
                    email: 'manuel.guzman@ips.cl',
                    telefono: null,
                    area: 'Área de Convenios',
                    cargo: 'Analista',
                    institucion: 1,
                    subdireccion: null,
                },
                
            },
            {
                id: 1,
                indice: 3,
                nombre: 'Convenio bilateral',
                tipo: 'Convenio',
                temas: 'Intercambio batch, Web Service',
                estado: 'En producción',
                nroGabinete: 'GE001234',
                fechaFirma: '22-02-2018',
                documento: '',
                fechaResolucion: '12-04-2018',
                nroResolucion: '38',
                linkResolucion: 'https://www.sii.cl/normativa_legislacion/resoluciones/2018/reso38.pdf',
                textoResolucion: 'N°38 del 12-04-2018',
                subdireccionesInvolucradas: 'SDGEET, SDF, SDTI',
                convenioPadre: null,
                adendum: [],
                encargadoIE: {
                    id: 3,
                    nombre: 'Lorena Espinosa',
                    email: 'lorena.espinosa@ips.cl',
                    telefono: null,
                    area: 'Área de Convenios',
                    cargo: 'Analista',
                    institucion: 1,
                    subdireccion: null,
                },
                backupIE: {
                    id: 4,
                    nombre: 'Manuel Guzmán',
                    email: 'manuel.guzman@ips.cl',
                    telefono: null,
                    area: 'Área de Convenios',
                    cargo: 'Analista',
                    institucion: 1,
                    subdireccion: null,
                },
                
            },
            
        ],
        intercambioInformacion: {
            infoRecibida: [
                
            ]
        },
        tareas: [],
    },
    {
        id: 2,
        nombre: 'Corporación de Fomento de la Producción',
        sigla: 'CORFO',
        encargadoSII: 
        {
            id: 1,
            nombre: 'Fernando Faure',
            email: 'fernando.faure@sii.cl',
            telefono: null,
            area: 'Área de Informaición y Estadísticas Tributarias',
            cargo: 'Analista',
            institucion: 100,
            subdireccion: 100,
        },
        backupSII: 
        {
            id: 2,
            nombre: 'Juan Lipán',
            email: 'juan.lipan@sii.cl',
            telefono: null,
            area: 'Área de Informaición y Estadísticas Tributarias',
            cargo: 'Analista',
            institucion: 100,
            subdireccion: 100,
        },
        rut: '60.706.000-2',
        direccion: 'Moneda 921, Santiago',
        tipoInstitucion: 'Servicio Público',
        pertenencia: 'Ministerio de Economía y Turismo (MINECON)',
        convenios: [],
        intercambioInformacion: [],
        tareas: [],
    },
]

function ConveniosMain({
    user,
}) {

    // Combobox instituciones
    const [institucionSelected, setInstitucionSelected] = useState(false);
    const institucionChange = (e) => {
        const selected = institucionesInfo.find(inst => inst.id === e.id);
        setInstitucionSelected(selected);

    }


    return (
        <>
        <h2 className='font-semibold sm-sii:text-[44px] text-[36px] text-azul-brillante-400 sm-sii:leading-[76.8px] leading-[66.8px] w-full'>Sistema de convenios</h2>
        {/* Select instituciones */}

        <div className="flex items-end mb-2">
            <label className="w-full text-gris-700 text-sm">
                Seleccione institución:
            </label>
            { (user && (user.is_convenios_admin || user.is_convenios_editor)) && 
            <div className="ml-auto">
            <a 
                className="anchor-agregar cursor-pointer"
                //onClick={() => setShowModalAgregarProyecto(true)}
            >      
                <PlusIcon className="h-6 w-6 text-gris-600 hover:text-verde-esmeralda-400 inline" />
            </a>
            <Tooltip key="tooltipAgregar" anchorSelect=".anchor-agregar" place="top">Agregar institución</Tooltip>
            </div>
            }
        </div>
        <ComboboxSelect 
            key='institucion'
            options={institucionesOptions}
            onChange={e => institucionChange(e)}
            label='institucion' 
        />

        {institucionSelected && 
        <>
        {/* Información ed la institución */}
        <div className="flex-col flex items-start mb-8">
            <InfoInstitucion 
                data={institucionSelected}
                user={user}
            />
        </div>

        <div className="flex-col flex items-start mb-8 w-full">
            <TabsInstitucion 
                data={institucionSelected}
                user={user}
            />
        </div>
        </>
        }
        </>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});
export default connect(mapStateToProps, {

})(ConveniosMain);
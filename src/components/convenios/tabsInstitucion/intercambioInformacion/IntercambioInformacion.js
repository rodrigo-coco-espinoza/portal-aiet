import InfoRecibida from "./informacionIntercambiar/InfoRecibida";

function IntercambioInformacion({
    data,
})
{
    console.log(data)
    return (
        <>
        <div className="p-4 shadow-lg rounded-xl bg-white w-full mb-8">
            <p className="font-bold text-xl mb-4">Información a intercambiar</p>

            <InfoRecibida 
                data={data.infoRecibida}
            />
        </div>
        

        </>
    );
}

export default IntercambioInformacion;
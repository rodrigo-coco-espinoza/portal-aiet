function Loading({message}) {
    return (
        <div className="bg-opacity-25 fixed inset-0 z-40 bg-black">
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 -top-20 outline-none focus:outline-none">
                <div className="relative w-full  my-6 mx-auto max-w-[400px]">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gris-100 outline-none focus:outline-none bg-opacity-100">
                        <div className="relative ps-6 pe-8 py-4 flex-auto">
                            {message}. Por favor, espere <span className="typing-dots" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
import AppRoutes from "./components/Routes/Routes.tsx";
import {ModalManagerProvider} from "./components/context/ModalManagerProvider.tsx";



function App() {

    return (

        <>
            <div className=" flex flex-grow  bg-white w-[1440px] h-[2996px] mx-auto">


                <div className="flex-1 bg-white w-[1440px] h-[2996px] ">
                    <ModalManagerProvider>

                        <AppRoutes/>
                    </ModalManagerProvider>

                </div>
            </div>
        </>

    )
}

export default App

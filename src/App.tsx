import AppRoutes from "./components/Routes/Routes.tsx";
import {ModalManagerProvider} from "./components/context/ModalManagerProvider.tsx";
import {SearchProvider} from "./components/context/SearchContext.tsx";


function App() {

    return (

        <>
            <div className=" flex min-h-screen bg-white mx-auto">


                <div className="flex-1 bg-white w-[1440px] h-[2996px] ">
                    <ModalManagerProvider>
                        <SearchProvider>

                            <AppRoutes/>

                        </SearchProvider>
                    </ModalManagerProvider>

                </div>
            </div>
        </>

    )
}

export default App

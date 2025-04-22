
import Search from "../Search.tsx";
import Exit from "./Exit.tsx";


const Header = () => {
    return (
        <header className="w-[1440px] h-[100px] flex md:inline-flex  justify-between items-center ">
            <div  className="flex">

            <Search/>
            <Exit/>

            </div>
        </header>
    );
};

export default Header;
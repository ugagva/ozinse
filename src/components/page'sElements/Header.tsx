
import Search from "../elements/Search.tsx";
import Exit from "./Exit.tsx";


const Header = () => {
    return (
        <header className="flex flex-row w-[1190px] h-[100px] flex justify-between items-end md:inline-flex   ">
            <Search/>
            <Exit/>

        </header>
    );
};

export default Header;

import Nav from "./Nav.tsx";
import Logo from "../elements/Logo.tsx";



const SideBar = () => {
    return (
        <div>
            <aside
                id="sidebar"
                className=" flex flex-col  items-start w-[250px] h-[1024px] text-[#b2b2b2]   mt-[20px]  lg:sticky "
            >
                <Logo/>
                <Nav/>

            </aside>
        </div>
    );
};

export default SideBar;

import Nav from "./Nav.tsx";
import Logo from "../elements/Logo.tsx";



const SideBar = () => {
    return (
        <div>
            <aside
                id="sidebar"
                className="w-[250px] h-[1024px] text-[#b2b2b2]  flex flex-col  items-start  mt-[20px]  lg:sticky "
            >
                <Logo/>
                <Nav/>

            </aside>
        </div>
    );
};

export default SideBar;
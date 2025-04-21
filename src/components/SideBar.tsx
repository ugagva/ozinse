
import Nav from "./Nav.tsx";
import Logo from "./Logo.tsx";


const SideBar = () => {
    return (
        <div>
            <aside
                id="sidebar"
                className="w-[250px] h-[1024px] text-[#b2b2b2]  flex flex-col fixed lg:sticky  h-screen lg:h-auto -translate-x-full target:translate-x-0 lg:translate-x-0 transition-transform peer"
            >
                <Logo/>

                <Nav/>
            </aside>
        </div>
    );
};

export default SideBar;
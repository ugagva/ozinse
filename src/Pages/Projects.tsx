import SideBar from "../components/sidebar'sElements/SideBar.tsx";
import Header from "../components/page'sElements/Header.tsx";
import PageBody from "../components/PageBody.tsx";


const Projects = () => {

    return (
        <div className=" flex flex-grow  bg-white w-[1440px] h-[2996px]">
            <SideBar/>

            <div className="flex-1  ">
                <Header/>
               <PageBody/>
            </div>
        </div>
    );
};

export default Projects;
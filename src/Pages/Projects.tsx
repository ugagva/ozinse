import Header from "../components/Header.tsx";
import SideBar from "../components/SideBar.tsx";
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
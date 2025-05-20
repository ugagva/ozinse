import PageBody from "../components/page'sElements/PageBody.tsx";
import Header from "../components/page'sElements/Header.tsx";
import SideBar from "../components/sidebar'sElements/SideBar.tsx";





const EditPage = () => {
    return (
        <div className=" flex flex-grow  ">
            <SideBar/>
            <div className="flex-1  ">
                <Header/>
                <PageBody
                    value={"Редактировать"}


                />
            </div>
        </div>
    );
};

export default EditPage;
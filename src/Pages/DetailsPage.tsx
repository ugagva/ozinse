import PageBody from "../components/page'sElements/PageBody.tsx";
import Header from "../components/page'sElements/Header.tsx";
import SideBar from "../components/sidebar'sElements/SideBar.tsx";



// type PropsType= {
//     content?: JSX.Element
// }
//
//


const DetailsPage = () => {

 return (


        <div>
            <div className=" flex flex-grow ">
                  <SideBar/>
                <div className="flex-1  ">
                    <Header/>
                    <PageBody value={'Детали'}  />
                </div>
            </div>

        </div>
    );
};

export default DetailsPage;
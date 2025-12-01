import SideBar from "../components/sidebar'sElements/SideBar.tsx";
import Header from "../components/page'sElements/Header.tsx";
import BodyHeader from "../components/page'sElements/BodyHeader.tsx";


const TypesPage = ({token}:{token:string}) => {






    return (
        <div>
          <div className="flex flex-grow">
              <SideBar/>
              <div className="flex-1">
                  <Header/>
                  <div className="flex-1">
                      <BodyHeader
                          value={'Категории'}
                          // onClick={handleAdd}

                      />
                  </div>
              </div>

          </div>
        </div>
    );
};

export default TypesPage;
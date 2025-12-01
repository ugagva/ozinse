import SideBar from "../../components/sidebar'sElements/SideBar.tsx";
import Header from "../../components/page'sElements/Header.tsx";
import BodyHeader from "../../components/page'sElements/BodyHeader.tsx";
import EditSvgIcon from "../../Icons/EditSvgIcon.tsx";
import TrashSvgIcon from "../../Icons/TrashSvgIcon.tsx";


const UsersPage = () => {
    return (

            <div className="flex flex-grow">
                <SideBar/>
                <div className="flex-1  ">
                    <Header/>
                    <div className="relative w-[1190px] h-[2864px] bg-gray-50 rounded-xl mr-[250px] mt-[32px] ">

                        <BodyHeader
                            value={'Пользователи'}
                            // onClick={handleAdd}

                        />


                        {/*{isAdding && (*/}
                        {/*    <div>*/}
                        {/*        <CategoryForm*/}
                        {/*            token={token}*/}
                        {/*            key="new"*/}
                        {/*            onSuccess={handleFormSuccessAdd}*/}
                        {/*        />*/}
                        {/*        <button*/}
                        {/*            onClick={() => setIsAdding(false)}*/}
                        {/*            className="mt-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">*/}
                        {/*            Отмена*/}
                        {/*        </button>*/}

                        {/*    </div>*/}
                        {/*)}*/}

                        {/*{categoriesToEdit && (*/}
                        {/*    <RoleForm*/}
                        {/*        key={`edit-${category.id}`}  // ключ зависит от id редактируемой роли*/}
                        {/*        token={token}*/}
                        {/*        initialData={categoriesToEdit}*/}
                        {/*        onSuccess={handleFormSuccessEdit}*/}
                        {/*    />*/}
                        {/*)}*/}

                    {/*    <ul>*/}
                    {/*        {categories.map((category, i) => (*/}
                    {/*            <li key={i}*/}
                    {/*                className="relative w-[538px] h-[180px]  left-10 bg-white rounded-xl  transition-all p-2 mr-[48px] m-2">*/}
                    {/*                <p className="text-xl font-bold ">*/}
                    {/*                    {category.title}*/}
                    {/*                </p>*/}


                    {/*                <div className=" flex gap-1 absolute bottom-2 right-2">*/}
                    {/*                    <button*/}
                    {/*                        onClick={() => handleEdit(category,)}*/}
                    {/*                        className=" text-white px-2 py-1 rounded hover:bg-blue-600"*/}
                    {/*                    >*/}
                    {/*                        <EditSvgIcon/>*/}
                    {/*                    </button>*/}
                    {/*                    <button*/}
                    {/*                        onClick={() => handleDelete(category,)}*/}
                    {/*                        className=" text-black px-2 py-1 rounded hover:bg-red-600"*/}
                    {/*                    >*/}
                    {/*                        <TrashSvgIcon/>*/}
                    {/*                    </button>*/}
                    {/*                </div>*/}
                    {/*            </li>*/}
                    {/*        ))*/}
                    {/*        }*/}
                    {/*    </ul>*/}


                    {/*    /!*Рендер модалки*!/*/}

                    {/*    {ModalComponent}*/}

                    {/*</div>*/}


                </div>
            </div>
        </div>
    );
};

export default UsersPage;

import { Route, Routes,} from "react-router-dom";

import {VideoListProvider} from "../context/VideoListProvider.tsx";
import { Suspense} from "react";
import PrivateRoute from "../auth/PrivateRoute.tsx";
import ProjectsPage from "../../Pages/ProjectsPage.tsx";
import LogInForm from "../../User/LogInForm.tsx";

import EditPage from "../../Pages/CreateNewProject/EditPage.tsx";


import ProjectDetails from "../../Pages/ProjectDetails.tsx";
import AddedProjects from "../../Pages/CreateNewProject/AddedProjects.tsx";
import RolesPage from "../../Pages/Roles/RolesPage.tsx";

import UsersPage from "../../Pages/Users/UsersPage.tsx";
import RoleForm from "../../Pages/Roles/RoleForm.tsx";
import ProjectsOnMain from "../../Pages/ProjectsOnMain/ProjectsOnMain.tsx";

import GenresPage from "../../Pages/Geners/GenresPage.tsx";
import AgeCategoriesPage from "../../Pages/Age_categories/AgeCategoriesPage.tsx";
import TypesPage from "../../Pages/Types/TypesPage.tsx";





const AppRoutes = () => {
    return (
        <div>

                <Suspense fallback={<div>Загрузка...</div>}>
                <Routes>
                    <Route index element={<LogInForm/>}/>

                    <Route path="projects" element={<VideoListProvider><PrivateRoute><ProjectsPage/></PrivateRoute></VideoListProvider>}/>
                    <Route path="projects/:projectId" element={<PrivateRoute><ProjectDetails/></PrivateRoute>}/>
                    <Route path="projects/add" element={<PrivateRoute><AddedProjects/></PrivateRoute>}/>
                    <Route path="projects/edit/:projectId" element={<PrivateRoute><AddedProjects/></PrivateRoute>}/>
                    <Route path="projects/OnMain" element={<VideoListProvider><PrivateRoute><ProjectsOnMain/></PrivateRoute></VideoListProvider>    }/>
                    <Route path="/roles" element={<PrivateRoute><RolesPage token={localStorage.getItem("token")||''}  /></PrivateRoute>}/>
                    <Route path="/role/add" element={<PrivateRoute><RoleForm/></PrivateRoute>}/>
                    <Route path="/role/edit/:roleId" element={<PrivateRoute><RoleForm token={localStorage.getItem("token")||''}/></PrivateRoute>}/>
                    <Route path="/ages" element={<PrivateRoute><AgeCategoriesPage  /></PrivateRoute>}/>
                    <Route path="/genres" element={<PrivateRoute><GenresPage /></PrivateRoute>}/>
                    <Route path="/types" element={<PrivateRoute><TypesPage/></PrivateRoute>}/>
                    <Route path="/users" element={<PrivateRoute><UsersPage/></PrivateRoute>}/>
{/*<Route path="/ages" element={<PrivateRoute><AgesPage/></PrivateRoute>}/>*t/}
{/*<Route path="/users" element={<PrivateRoute><UsersPage/></PrivateRoute>}/>*/}
{/*<Route path="/users" element={<PrivateRoute><UsersPage/></PrivateRoute>}/>*/}



                    <Route path="edit" element={<PrivateRoute><EditPage /></PrivateRoute>}/>
                </Routes>
                </Suspense>

        </div>
    );
};

export default AppRoutes;
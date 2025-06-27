
import { Route, Routes,} from "react-router-dom";

import {VideoListProvider} from "../context/VideoListProvider.tsx";
import { Suspense} from "react";
import PrivateRoute from "../auth/PrivateRoute.tsx";
import ProjectsPage from "../../Pages/ProjectsPage.tsx";
import LogInForm from "../../User/LogInForm.tsx";

import EditPage from "../../Pages/CreateNewProject/EditPage.tsx";


import ProjectDetails from "../../Pages/ProjectDetails.tsx";
import AddedProjects from "../../Pages/CreateNewProject/AddedProjects.tsx";




const AppRoutes = () => {
    return (
        <div>

                <Suspense fallback={<div>Загрузка...</div>}>
                <Routes>
                    <Route index element={<LogInForm/>}/>

                    <Route path="projects" element={<VideoListProvider><PrivateRoute><ProjectsPage/></PrivateRoute></VideoListProvider>}/>
                    <Route path="projects/:projectId" element={<PrivateRoute><ProjectDetails/></PrivateRoute>}/>
                    <Route path="projects/add" element={<PrivateRoute><AddedProjects/></PrivateRoute>}/>
                    <Route path="projects/edit" element={<PrivateRoute><AddedProjects mode="edit"/></PrivateRoute>}/>


                    <Route path="edit" element={<PrivateRoute><EditPage /></PrivateRoute>}/>
                </Routes>
                </Suspense>

        </div>
    );
};

export default AppRoutes;
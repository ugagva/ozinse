
import { Route, Routes,} from "react-router-dom";

import {VideoListProvider} from "../context/VideoListProvider.tsx";
import { Suspense} from "react";
import PrivateRoute from "../auth/PrivateRoute.tsx";
import ProjectsPage from "../../Pages/ProjectsPage.tsx";
import LogInForm from "../../User/LogInForm.tsx";
import DetailsPage from "../../Pages/DetailsPage.tsx";
import EditPage from "../../Pages/EditPage.tsx";

import CorrectProjects from "../../Pages/CorrectProjects.tsx";
import ProjectDetails from "../../Pages/ProjectDetails.tsx";




const AppRoutes = () => {
    return (
        <div>

                <Suspense fallback={<div>Загрузка...</div>}>
                <Routes>
                    <Route index element={<LogInForm/>}/>

                    <Route path="projects" element={<VideoListProvider><PrivateRoute><ProjectsPage/></PrivateRoute></VideoListProvider>}/>
                    <Route path="projects/:projectId" element={<PrivateRoute><ProjectDetails/></PrivateRoute>}/>
                    <Route path="projects/add" element={<PrivateRoute><CorrectProjects mode="add"/></PrivateRoute>}/>
                    <Route path="projects/edit" element={<PrivateRoute><CorrectProjects mode="edit"/></PrivateRoute>}/>

                    <Route path="details" element={<PrivateRoute><DetailsPage/></PrivateRoute>}/>
                    <Route path="edit" element={<PrivateRoute><EditPage /></PrivateRoute>}/>
                </Routes>
                </Suspense>

        </div>
    );
};

export default AppRoutes;
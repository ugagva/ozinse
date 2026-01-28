import {ProjectCardItemType} from "../Pages/ProjectsPage.tsx";
import {useSearch} from "../components/context/SearchContext.tsx";
import {useMemo} from "react";

export const useProjectSearch = (projects: ProjectCardItemType[]) => {
    const { search } = useSearch();

    return useMemo(() => {
        const value = search.toLowerCase();

        return projects.filter(project => {
            const inTitle = project.title.toLowerCase().includes(value);
            const inDescription = project.description.toLowerCase().includes(value);
            const inAgeCategories = project.age_categories.some(ac =>
                ac.Title.toLowerCase().includes(value)
            );
            const inGenres = project.genres.some(g =>
                g.Title.toLowerCase().includes(value)
            );



            return inTitle || inDescription || inAgeCategories || inGenres ;
        });
    }, [projects, search]);
};

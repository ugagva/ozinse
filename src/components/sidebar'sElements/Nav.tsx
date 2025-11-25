import DashboardSvgIcon from "../../Icons/DashboardSvgIcon.tsx";
import RoleSvgIcon from "../../Icons/RoleSvgIcon.tsx";
import GenreSvgIcon from "../../Icons/GenreSvgIcon.tsx";
import CategoriesSvgIcon from "../../Icons/CategoriesSvgIcon.tsx";
import PeopleSvgIcon from "../../Icons/PeopleSvgIcon.tsx";
import AgesSvgIcon from "../../Icons/AgesSvgIcon.tsx";
import {Link} from "react-router-dom";
import HomeSvgIcon from "../../Icons/HomeSvgIcon.tsx";
import React from "react";


const activeNavItemClasses = 'flex items-center text-[#7E2DFC] gap-4 px-[20px] px-1 py-2 rounded' as const;

const navItemClasses = 'flex items-center color-[#8F92A1] hover:text-white  gap-4 px-[20px] py-2 rounded duration-500' as const;


const navItems:{ label: string; path: string; icon?: React.ReactNode; classes: string }[] = [
    {
        label: 'Проекты',
        path: "/projects",
        classes: activeNavItemClasses,
        icon: <DashboardSvgIcon></DashboardSvgIcon>
    },
    {
        label: 'Проекты на главной',
        path: "/projects/OnMain",
        classes: activeNavItemClasses,
        icon: <HomeSvgIcon></HomeSvgIcon>
    },
    {
        label: 'Категории',
        path: "/categories",
        classes: navItemClasses,
        icon: <CategoriesSvgIcon></CategoriesSvgIcon>
    },
    {
        label: 'Пользователи',
        path: "/users",
        classes: navItemClasses,
        icon: <PeopleSvgIcon></PeopleSvgIcon>
    },

    {
        label: 'Роли',
        path: "/roles",
        classes: navItemClasses,
        icon: <RoleSvgIcon></RoleSvgIcon>
    },
    {
        label: 'Жанры',
        path: "/genres",
        classes: navItemClasses,
        icon: <GenreSvgIcon></GenreSvgIcon>
    },
    {
        label: 'Возрасты',
        path: "/ages",
        classes: navItemClasses,
        icon: <AgesSvgIcon></AgesSvgIcon>

    },
]


const Nav = () => {
        return (
            <nav className="mt-[34px] ">
                {navItems.map(({label, path, classes, icon}) => (
                    <Link
                        key={label}
                        to={path}
                        className={classes} >

                        {icon}

                        <span className=" ml-4 text-base text-[#171717] font-[Roboto] font-bold ">
                                     {label}
                        </span>
                    </Link>
                ))}
            </nav>


        )
            ;
    }
;

export default Nav;
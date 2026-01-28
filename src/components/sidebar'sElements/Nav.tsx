import DashboardSvgIcon from "../../Icons/DashboardSvgIcon.tsx";
import RoleSvgIcon from "../../Icons/RoleSvgIcon.tsx";
import GenreSvgIcon from "../../Icons/GenreSvgIcon.tsx";
import CategoriesSvgIcon from "../../Icons/CategoriesSvgIcon.tsx";
import PeopleSvgIcon from "../../Icons/PeopleSvgIcon.tsx";
import AgesSvgIcon from "../../Icons/AgesSvgIcon.tsx";

import HomeSvgIcon from "../../Icons/HomeSvgIcon.tsx";
import React, {  } from "react";

import {NavLink} from "react-router-dom";


const navItemClasses = "flex items-center text-[#7E2DFC] font-bold font-inter gap-4 px-[20px] py-2 rounded duration-500" as const;




const baseClasses =
    "flex items-center  font-bold font-inter gap-4 px-5 py-2 rounded duration-300";


const Nav = () => {


    const navItems: {
        label: string;
        path: string;
        icon?: React.ReactNode;
        classes: string ;

    }[] = [
        {
            label: 'Проекты',
            path: "/projects",
            classes: navItemClasses,
            icon: <DashboardSvgIcon></DashboardSvgIcon>
        },
        {
            label: 'Проекты на главной',
            path: "/projects/OnMain",
            classes: navItemClasses,
            icon: <HomeSvgIcon></HomeSvgIcon>
        },
        {
            label: 'Категории',
            path: "/types",
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



    return (
        <nav className="mt-[34px] p-4  ">


            {navItems.map(({label, path, icon,}) => (
                <NavLink
                    key={label}
                    to={path}
                    className={baseClasses}>

                    {({isActive}) => (
                        <>
                            <span className={isActive ? "text-[#7E2DFC]" : "text-[#8F92A1]"}>
                            {icon}
                             </span>

                            <span className={`ml-4 text-m  ${
                                isActive ? "text-[#7E2DFC]" : "font-bold  text-black"
                            }`}>
                                    {label}

                                </span>



                        </>
                    )}
                </NavLink>
            ))}


        </nav>


    )

}


export default Nav;
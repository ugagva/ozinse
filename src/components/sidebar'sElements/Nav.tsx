import DashboardSvgIcon from "../../Icons/DashboardSvgIcon.tsx";
import RoleSvgIcon from  "../../Icons/RoleSvgIcon.tsx";
import GenreSvgIcon from  "../../Icons/GenreSvgIcon.tsx";
import CategoriesSvgIcon from  "../../Icons/CategoriesSvgIcon.tsx";
import PeopleSvgIcon from  "../../Icons/PeopleSvgIcon.tsx";
import AgesSvgIcon from "../../Icons/AgesSvgIcon.tsx";




const activeNavItemClasses = 'flex items-center text-[#7E2DFC] gap-4 px-[20px] px-1 py-2 rounded' as const;

const navItemClasses = 'flex items-center color-[#8F92A1] hover:text-white  gap-4 px-[20px] py-2 rounded duration-500' as const;



const navItems = [
    {
        label: 'Проекты на главной',
        classes: activeNavItemClasses,
        icon: <DashboardSvgIcon></DashboardSvgIcon>
    },
    {
        label: 'Категории',
        classes: navItemClasses,
        icon: <CategoriesSvgIcon></CategoriesSvgIcon>
    },
    {
        label: 'Пользователи',
        classes: navItemClasses,
        icon:<PeopleSvgIcon></PeopleSvgIcon>
    },

    {
        label: 'Роли',
        classes: navItemClasses,
        icon: <RoleSvgIcon></RoleSvgIcon>
    },
    {
        label: 'Жанры',
        classes: navItemClasses,
        icon: <GenreSvgIcon></GenreSvgIcon>
    },
    {
        label: 'Возрасты',
        classes: navItemClasses,
        icon:<AgesSvgIcon></AgesSvgIcon>

    },
]



const Nav = () => {
    return (
        <nav className="mt-[34px] ">
            {navItems.map(({label, classes, icon}) => (
                <a href="/images"
               className={classes}
               key={label}
                >
                    {icon}

            <span className=" ml-4 text-base text-[#171717] font-[Roboto] font-bold ">
                    {label}
                </span>
        </a>
                ))}
        </nav>


)
;
}
;

export default Nav;
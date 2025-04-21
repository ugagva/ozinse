



const activeNavItemClasses = 'flex items-center text-[#7E2DFC] gap-4 mx-2 px-4 py-2 rounded' as const;

const navItemClasses = 'flex items-center color-[#8F92A1] hover:text-white mx-2 gap-4 px-4 py-2 rounded duration-500' as const;



const navItems = [
    {
        label: 'Проекты на главной',
        classes: activeNavItemClasses,
        icon: <img src="src/assets/images/Dashboard.svg" className=" h-[20px] w-[20px]" alt="Dashboard"/>,
    },
    {
        label: 'Категории',
        classes: navItemClasses,
        icon: <img src="src/assets/images/Combined Shape.png" className="h-[20px] w-[20px]" alt="Combined Shape"/>
    },
    {
        label: 'Пользователи',
        classes: navItemClasses,
        icon: <img src="src/assets/images/Combined Shape (1).png" className="h-[20px] w-[20px]"  alt="Combined Shape 1(1)"/>
    },

    {
        label: 'Роли',
        classes: navItemClasses,
        icon: <img src="src/assets/images/💚 Icon - L.png" className="h-[20px] w-[20x]" alt="Shape 1(1)"/>
    },
    {
        label: 'Жанры',
        classes: navItemClasses,
        icon: <img src="src/assets/images/💚 Icon - L (1).png" className="h-[20px] w-[20px]" alt="Shape 1(1)"/>
    },
    {
        label: 'Возрасты',
        classes: navItemClasses,
        icon: <img src="src/assets/images/💚 Icon - L (2).png" className="h-[20px] w-[20px]" alt="Shape 1(1)"/>
    },
]

const Nav = () => {
    return (

        <nav>
            {navItems.map(({label, classes, icon}) => (
                <a href="/"
               className={classes}
               key={label}
                >
                    {icon}

            <span className=" ml-4 text-base text-[#171717] font-[Inter] font-bold ">
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
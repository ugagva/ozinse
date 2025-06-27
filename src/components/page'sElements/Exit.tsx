
import ExitSvgIcon from "../../Icons/ExitSvgIcon.tsx";
import {useNavigate} from "react-router-dom";


const Exit = () => {
    const navigate = useNavigate();
    return (
<div className="   ">
            <a href="" className="flex items-center justify-center  w-[180px] h-[56px]  gap-2 "
               onClick={()=>navigate("/projects")} >
                <span
                    className=" font-medium-[Roboto]  font-semibold text-[#8F92A1]">Выйти</span>
                <ExitSvgIcon></ExitSvgIcon>


            </a>
    </div>

    )
};

export default Exit;
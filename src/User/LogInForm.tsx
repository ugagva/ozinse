import BaseButton from "../components/elements/BaseButton.tsx";

import {ChangeEvent, SyntheticEvent, useState} from "react";
import EyeSvgIcon from "../Icons/EyeSvgIcon.tsx";
import MainLogoSvgIcon from "../Icons/MainLogoSvgIcon.tsx";
import  {useAuth} from "../components/context/AuthProvider.tsx";
import axios from "axios";
import {BASE_URL} from "../utils/constants.tsx";
import {Navigate} from "react-router-dom";




const LogInForm = () => {

    const {login} = useAuth();

    const [values, setValues] = useState<{ password:string, email: string }>({
        email: "admin@admin.com",
        password: "admin"
    });

    const [showPassword, setShowPassword] = useState(false)
    const [isLogin, setIsLogin] = useState(false);


    const handleSubmit = async (e:SyntheticEvent) => {
        e.preventDefault();
        const isNotEmpty = Object.values(values).every((val) => val);
        if (!isNotEmpty) return;

        try {
            const response = await axios.post(`${BASE_URL}v1/auth/sign-in`, JSON.stringify(values),{
            });
            const token = response.data.access_token;
            if (token) {
            sessionStorage.setItem('token', token);
            console.log(JSON.stringify(response?.data));
            setValues({...values,});


            sessionStorage.setItem('token', token);
            login(token);
            setIsLogin(true);

            return token}
            console.log(JSON.stringify(values));
        } catch (error) {
            console.log(error);
        }

    }


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }





    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
            setValues({...values,[name]:value });
    }


    return (
        <>
            {isLogin? ( <Navigate to={'/projects'}/>)
            :
                (
             <div className=" min-h-screen w-full bg-[#0052CC0D] flex flex-col items-center">
                <div className="pt-16 flex justify-center ">
                    <MainLogoSvgIcon/>
                </div>

                <div
                    className="flex  flex-col items-center mt-16  w-full  max-w-[360px]  bg-white  rounded-[48px]  p-8  flex  flex-col  items-center">
                    <form className=" flex flex-col items-center  w-[296px] h-[307px]" >

                        <p className="text-[22px] font-Roboto font-bold ">Добро пожаловать</p>
                        <p className="text-[14px] font-Roboto font-normal text-[#8F92A1] m-2">Войдите в систему, чтобы
                            продолжить</p>
                        <div
                            className="w-[296px] h-[104px] mt-[32px] flex flex-col justify-center  gap-2  ">
                            <input
                                className="w-full h-[42px] pl-6 bg-[#8F92A10D] rounded-[16px] outline-none text-sm  text-12 font-Roboto font-medium"
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={values.email}
                                autoComplete="off"
                                onChange={handleChange}
                                required
                            />
                            <div className="relative w-full ">

                                <input
                                    className=" w-full h-[42px] pl-6 bg-[#8F92A10D] rounded-[16px] outline-none text-sm  text-12 font-Roboto font-medium "
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Пароль"
                                    name="password"
                                    value={values.password}
                                    autoComplete="off"
                                    onChange={handleChange}
                                    required
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                                     onClick={handleClickShowPassword}>
                                    <EyeSvgIcon/>
                                </div>


                            </div>
                        </div>

                        <div className="h-[77px] mt-[32px] ">
                            <BaseButton
                                className=" w-full h-[38px]  bg-[#7E2DFC] rounded-[16px] text-white font-bold "
                                title="Войти"
                                onClick={handleSubmit}>
                            </BaseButton>
                            <div
                                className="flex flex-row w-[296px] h-[15px] mt-[24px]  justify-center text-[#8F92A1] text-[13px] font-Roboto font-medium gap-1 ">
                                <p> Забыли пароль?
                                    <a className="text-[#0052CC]"
                                       onClick={() => { }}>Восстановить</a>
                                </p>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        )
            }
        </>
    )

};

export default LogInForm;
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
             <div className=" w-[1440px] h-[1024px] bg-[#0052CC0D]">
                <div className=" pt-[64px] px-[680px] ">
                    <MainLogoSvgIcon/>
                </div>

                <div
                    className="flex  flex-col items-center  w-[360px] h-[387px] bg-[#FFFFFF] mt-[64px] mb-[429px] mx-[540px] py-[40px] px-[32px] rounded-[48px]">
                    <form className=" flex flex-col items-center  w-[296px] h-[307px]" >

                        <p className="text-[22px] font-Roboto font-bold ">Добро пожаловать</p>
                        <p className="text-[14px] font-Roboto font-normal text-[#8F92A1] m-2">Войдите в систему, чтобы
                            продолжить</p>
                        <div
                            className="w-[296px] h-[104px] mt-[32px] flex flex-col justify-center  gap-2  ">
                            <input
                                className=" h-[42px] pl-[24px] bg-[#8F92A10D] text-[#8F92A] outline-none rounded-[16px]  text-12 font-Roboto font-medium  "
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={values.email}
                                autoComplete="off"
                                onChange={handleChange}
                                required
                            />
                            <div className="flex flex-col justify-center   ">

                                <input
                                    className=" flex pl-[24px] h-[42px] bg-[#8F92A10D] text-[#8F92A] rounded-[16px] outline-none text-12 font-Roboto font-medium "
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Пароль"
                                    name="password"
                                    value={values.password}
                                    autoComplete="off"
                                    onChange={handleChange}
                                    required
                                />
                                <div className="absolute ml-[256px]" onClick={handleClickShowPassword}>
                                    <EyeSvgIcon/>
                                </div>


                            </div>
                        </div>

                        <div className="h-[77px] mt-[32px] ">
                            <BaseButton
                                className="flex justify-center items-center bg-[#7E2DFC] w-[296px] h-[38px] opasity-2 rounded-[16px]  gap-1 text-center text-white font-bold text-sm  "
                                title="Войти"
                                onClick={handleSubmit}>
                            </BaseButton>
                            <div
                                className="flex flex-row w-[296px] h-[15px] mt-[24px] justify-center text-[#8F92A1] text-[13px] font-Roboto font-medium gap-1 ">
                                <p> Забыли пароль?
                                    <a className="text-[#0052CC]" onClick={() => {
                                    }}>Восстановить</a>
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
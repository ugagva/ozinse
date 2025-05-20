// // import {useDispatch} from "react-redux";
// import { useState} from "react";
// import BaseButton from "../components/elements/BaseButton.tsx";
//
//
//
// // type propsType = {
// //
// // }
//
// const UserLoginForm = ( ) => {
//     // const dispatch = useDispatch();
//
//     const [values, setValues] = useState({
//         email: "",
//         password: ""
//     });
//
//
//     const loginHandleChange = ({target: {value, name}}) => {
//         setValues({...values, [name]: value});
//     }
//     // const handleSubmit = (e: ChangeEvent<HTMLInputElement>,): propsType => {
//     //     e.preventDefault();
//     //     const isNotEmpty = Object.values(values).every((val) => val);
//     //     if (!isNotEmpty) return;
//     //     // dispatch(loginUser(values));
//     //
//     // }
//
//     return (
//         <div className="w-[1440px] h-[1024px] bg-[ #0052CC] rounded-m">
//             <div className="">
//                 Добро пожаловать
//             </div>
//
//             <form className="" >
//                 <div>
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         name="email"
//                         value={values.email}
//                         autoComplete="off"
//                         onChange={loginHandleChange}
//                         required
//                     />
//
//                     <div>
//                         <input
//                             type="password"
//                             placeholder="Your Password"
//                             name="password"
//                             value={values.password}
//                             autoComplete="off"
//                             onChange={loginHandleChange}
//                             required
//                         />
//                     </div>
//
//                 </div>
//                 <div
//                     >
//                     Забыли пароль? Восстановить
//                 </div>
//                 <BaseButton title={"Войти"}></BaseButton>
//
//             </form>
//         </div>
//     );
// };
//
// export default UserLoginForm;
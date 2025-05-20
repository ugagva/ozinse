// import BaseButton from "../components/elements/BaseButton.tsx";
// import { FormEventHandler, useState} from "react";
//
// type propsType = {
//     toggleCurrentFormType?: (type: never) => void,
//     closeForm?: () => void
// }
//
// const UserSignUpForm = ({toggleCurrentFormType, closeForm}): JSX.Element => {
//
//
//     const [values, setValues] = useState({
//
//         email: "",
//         name: "",
//         password: "",
//     });
//
// const loginHandleChange = ({target: {value,name} }) => {
//  setValues({...values,[name]:value});
//
// }
// const handleSumbit = (e:FormEventHandler<HTMLFormElement>) => {
//   e.preventDefault();
//
// }
//
//     return (
//         <div className="w-[1440px] h-[1024px] bg-[ #0052CC]">
//             <form className="w-[360px] h-[387px] bg-[#FFFFFF]" onSubmit={handleSumbit}>
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
//                 <div onClick={() => {
//                     toggleCurrentFormType('singUp')
//                 }}>
//                     Создать аккаунт
//                 </div>
//                 <BaseButton title={"Войти"}/>
//             </form>
//         </div>
//     );
// };
//
// export default UserSignUpForm;
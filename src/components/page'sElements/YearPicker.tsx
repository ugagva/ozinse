// import {useState} from "react";
// import {Calendar} from 'primereact/calendar';
// import {Nullable} from "primereact/ts-helpers";
//
//
// const iconClock=()=> {
//     return <div>
//         <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             fill="none"
//             viewBox="0 0 24 24"
//         >
//             <path
//                 fill="#8F92A1"
//                 fillRule="evenodd"
//                 d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10m0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16m1-9V7h-2v6h5v-2z"
//                 clipRule="evenodd"
//             ></path>
//         </svg>
//     </div>
// }
//
// const YearPicker = () => {
//     const [year, setYear] = useState<Nullable<Date>>(null);
//
//     return (
//         <div
//             className="  flex  bg-gray-200 justify-between  items-center rounded-[16px] w-[146] h-[40px] mt-[10px] ml-[260px] text-xs">
//             <div className="flex">
//
//                 {iconClock()}
//                 <Calendar
//                     value={year}
//
//                     onChange={(e) => setYear(e.value)}
//                     view="year"
//                     dateFormat="yy"
//                 />
//             </div>
//
//             <div>
//                 <label className="flex mb-2 text-xs  ">
//                     Выберите год
//                 </label>
//
//             </div>
//
//
//         </div>
//
//
//     );
// };
//
// export default YearPicker;
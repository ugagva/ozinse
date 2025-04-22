import {useState} from "react";
import {Calendar} from 'primereact/calendar';
import {Nullable} from "primereact/ts-helpers";



const YearPicker = () => {
    const [year, setYear] = useState<Nullable<Date>>(null);

    return (
        <div className="flex  bg-gray-200  rounded-[16px] w-[146px] h-[40px] mt-[10px] ml-[260px] text-center">
            <Calendar
                icon={<i className="pi pi-clock"></i>}
                value={year}
                onChange={(e) => setYear(e.value)}
                view="year"
                dateFormat="yy"
                showIcon
            />
            <label htmlFor="buttondisplay" className=" block mb-2 ">
                Выберите год
            </label>

        </div>
    );
};

export default YearPicker;
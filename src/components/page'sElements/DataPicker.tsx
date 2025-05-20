import {useState} from "react";
import DatePicker from "react-datepicker";
import ClockSvgIcon from "../../Icons/ClockSvgIcon.tsx";



const DataPicker = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);


    return (
        <div >
            <DatePicker
                showIcon
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showYearPicker
                dateFormat="yyyy"
                placeholderText="Выберите год"
                icon={
                   <ClockSvgIcon className="24px"/>
                }

           />


        </div>
    )
};

export default DataPicker;
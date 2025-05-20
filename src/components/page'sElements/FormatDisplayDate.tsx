import {useState} from "react";


const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString).getFullYear();

    return `${date}`;
};     /// set above data type as you like


const FormatDisplayDate = () => {
    const [year, setYear] = useState('');


    return (

        <div>
            <div className="flex items-center space-x-4">
                <div className="flex-1">

                    <div className="relative">
                        {year && (
                            <span className="absolute left-2 bottom-2 bg-white px-2 text-sm text-gray-600"
                                  style={{pointerEvents: "none"}}> {formatDisplayDate(year)} </span>
                        )}
                        <input  type="" placeholder="Выберите год"   value={year} onChange={(e) => setYear(e.target.value)}
                               className="mt-1 block w-full rounded-md border-gray-300  focus:border-[#9F5316] focus:ring-[#9F5316] p-2 bg-white"
                               required/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default FormatDisplayDate;
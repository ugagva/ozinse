import {ChangeEvent, useState} from "react";

interface NumericInputProps {
    placeholder: string,
    selectedValue?:  number
    setSelectedValue?: (value: number) => void
}


const NumericInput = ({placeholder, selectedValue, setSelectedValue}: NumericInputProps) => {
    const [value, setValue] = useState<number>(selectedValue?? 1)
    const [error, setError] = useState(false)

    const float = value

    const handleChangeInput = (e:ChangeEvent<HTMLInputElement>) => {
        const newValue =e.target.value;

        if (/^\d*$/.test(newValue as string)) {
            setError(false);
            const validValue = newValue === '' ? 0 : parseInt(newValue, 10);
            setValue(validValue);
            if (setSelectedValue) {
                setSelectedValue(validValue);
            }
        } else {
            setError(true);
        }
    }

    const increase = () => {
        setError(false);
        const newValue = value + 1;
        setValue(newValue);
        if (setSelectedValue) {
            setSelectedValue(newValue);
        }
    };

    const decrease = () => {
        setError(false);
        if (value > 1) {
            const newValue = value - 1;
            setValue(newValue);
            if (setSelectedValue) {
                setSelectedValue(newValue);
            }
        } else {
            alert('Значение не может быть меньше или равно 0');
        }
    };


    return (
        <div
            className=" w-[250px] relative flex items-center border border-gray-600 hover:border-blue-700 rounded-2xl px-2 py-4 space-x-2 ">
            <input
                value={value ?? ''}
                id="seasons"
                type="text"
                placeholder={placeholder}
                onChange={handleChangeInput}

                className={`w-full font-bold  px-2 py-1 rounded-md outline-none text-sm placeholder-gray-600 ${error ? 'border border-red-500' : ''}`}
            />
            <label
                htmlFor="seasons"
                className={`absolute left-4 transition-all duration-200 text-gray-500 bg-white px-1 ${
                    float ? 'top-[-10px] text-sm' : 'top-3 text-lg'
                }`}

            >
                Количество сезонов
            </label>

            <button type="button" className=" " onClick={increase}>⏶</button>
            <button type="button" className=" " onClick={decrease}>⏷</button>
            {selectedValue && selectedValue > 0 &&
                <div>

                </div>

            }
        </div>
    );
};

export default NumericInput;
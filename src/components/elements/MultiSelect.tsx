import {useState, useEffect, useRef} from "react";

interface MultiSelectOption {
    label: string;
    value: string;
}



interface MultiSelectProps<T extends string | number> {
    label: string;
    name: string;
    options: (T | MultiSelectOption)[];
    selected: T[];
    onChange: (values: T[]) => void;
    labelClassName?: string; // 👈 сюда можно передать свои классы
}


const MultiSelect = <T extends string | number>({
                                                    label,
                                                    options,
                                                    selected,
                                                    onChange,
                                                    labelClassName,

                                                }: MultiSelectProps<T>) => {




    const normalizedOptions: (MultiSelectOption | { label: string; value: T })[] = options.map((opt) =>
        typeof opt === "object" ? opt : { label: String(opt),  value: opt as T  }
    );



    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [customValue, setCustomValue] = useState("");


    // Закрытие при клике вне селекта
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOption = (value: T) => {
        const newValues = selected.includes(value)
            ? selected.filter(v => v !== value)
            : [...selected, value];
        onChange(newValues);


    };

    const handleAddCustom = () => {
        const trimmed = customValue.trim();
        if (trimmed && !selected.includes(trimmed as T)) {
            onChange([...selected, trimmed as T]);
            setCustomValue("");
        }
    };


    return (
        <div className="relative w-[510px] m-6" ref={dropdownRef}>
            <label className={labelClassName}
               >
                {label}
            </label>

            {/* Кнопка открытия */}
            <button
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
                className="w-full h-[46px] rounded-2xl border-[0.1px] border-[#17171799] bg-white px-3 py-2 text-left font-bold text-[#171717] flex justify-between items-center"
            >
        <span>
          {selected.length > 0 ? selected.join(", ") : "Выберите или добавьте..."}
        </span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
            </button>


            {/* Выпадающее меню */}
            {isOpen && (
                <div
                    className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
                    {normalizedOptions.map(option => (
                        <label
                            key={option.value}
                            className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(option.value as T)}
                                onChange={() => toggleOption(option.value as T)}
                                className="mr-2 accent-[#7E2DFC]"
                            />
                            <span className="text-sm text-blue-800">{option.value}</span>
                        </label>
                    ))}

                    {label === "Выберите проект" ? (
                            <></>
                        ) :
                        <div className="border-t border-gray-200 mt-1 px-3 py-2 bg-gray-50">

                            <input
                                type="text"
                                value={customValue}
                                onChange={e => setCustomValue(e.target.value)}
                                placeholder="Введите своё значение..."
                                className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#7E2DFC]"
                            />


                            <button
                                type="button"
                                onClick={handleAddCustom}
                                className="mt-2 w-full bg-[#7E2DFC] text-white text-sm font-bold py-1 rounded-lg hover:bg-[#6825d0] transition"
                            >
                                Добавить
                            </button>
                        </div>
                    }


                </div>


            )}


        </div>
    );
};

export default MultiSelect;

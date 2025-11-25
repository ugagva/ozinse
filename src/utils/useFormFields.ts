import { useState } from "react";
import {useNavigate} from "react-router-dom";

export function useFormFields<T extends Record<string, unknown>>(initialValues: T) {

    const [form, setForm] = useState<T >(initialValues);
    const navigate = useNavigate();


        const handleFieldChange = <K extends keyof T>(name: K, value: T[K]) => {
            setForm(prev => {
                if (!prev) return prev; // если форма закрыта — ничего не меняем
                return { ...prev, [name]: value };
            });
        };

    const resetForm = () => setForm(initialValues);
    const closeForm = async () => {
        navigate(`/roles`);

    }

    return { form, setForm, handleFieldChange, resetForm, closeForm };
}

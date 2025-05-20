import { format } from 'date-fns';


export function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    return format(date, "d.MM.yyyy, 'в' HH:mm", );
}
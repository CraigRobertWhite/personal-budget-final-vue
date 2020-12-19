import { format, parse, parseISO } from 'date-fns';

export const formatISODate = (dateStr, formatStr) => format(parseISO(dateStr), formatStr);

export const formatDate = (dateStr, inputFormat, outputFormat) => {
    return format(parse(dateStr, inputFormat, new Date()), outputFormat);
}
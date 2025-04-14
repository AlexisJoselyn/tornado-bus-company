export const formatDateToYYYYMMDD = (date: Date): string => {
    return date.toISOString().split('T')[0];
};



export const getMidDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split('T')[0];
}
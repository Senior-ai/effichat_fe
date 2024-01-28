import moment from "moment";

export const dateHandler = (date) => {
    let now = moment();
    let momentDate = moment(date);
    let time = momentDate.fromNow();
    let dateByHour = momentDate.format('HH:mm')

    if (time === 'a few seconds ago') {
        return 'Now';
    }
    if (time.search('minute') !== -1) {
        let mins = time.split(' ')[0]
        if (mins==='a') {
            return '1 min ago';
        } else {
            return `${mins} min ago`
        }
    }
    if (time.search('hour') !== -1) {
        return dateByHour;
    }
    if (time === 'a day ago') {
        return 'Yesterday'
    }
    if (time.search('days') !== -1) {
        return momentDate.format('DD/MM/YYYY')
    }
    return moment(date).fromNow();
}
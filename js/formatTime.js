'use strict';

/* eslint indent: 0 */

function formatTime(datetime) {

    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(datetime)) {
        return datetime;
    }

    var result = '';

    var month = datetime.slice(5, 7);

    var hour = datetime.slice(11, 13);

    var day = datetime.slice(8, 10);

    var year = datetime.slice(0, 4);

    var minute = datetime.slice(14, 16);

    var ampm = undefined;

    if (hour >= 12) {

        ampm = 'PM';
    } else {
        ampm = 'AM';
    }

    if (hour > 12) {

        hour = hour - 12;
    } else if (hour === '00') {
        hour = 12;
    }

    switch (month) {

        case '01':
            month = 'January';
            break;

        case '02':
            month = 'February';
            break;

        case '03':
            month = 'March';
            break;

        case '04':
            month = 'April';
            break;

        case '05':
            month = 'May';
            break;

        case '06':
            month = 'June';
            break;

        case '07':
            month = 'July';
            break;

        case '08':
            month = 'August';
            break;

        case '09':
            month = 'September';
            break;

        case '10':
            month = 'October';
            break;

        case '11':
            month = 'November';
            break;

        case '12':
            month = 'December';
            break;

    }

    result = month + ' ' + day + ', ' + year + ' ' + hour + ':' + minute + ' ' + ampm;

    return result;
}
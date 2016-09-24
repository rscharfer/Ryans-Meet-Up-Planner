function formatTime(datetime){

    let result='';
   
    let month = datetime.slice(5,7);

    let hour = datetime.slice(11,13);

    switch(month){

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

    result = `${month} ${datetime.slice(8,10)}, ${datetime.slice(0,4)}`;

    return result;
}
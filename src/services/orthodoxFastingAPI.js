const dayAPIuri = 'https://mqev24rwub.execute-api.eu-central-1.amazonaws.com/dev/fastingStatus/date?inputDate=';
const monthAPIuri = 'https://mqev24rwub.execute-api.eu-central-1.amazonaws.com/dev/fastingStatus/month?inputDate='

const fixed_responses = {
    '2022-01-27': {
        "the_date": "2022-01-27",
        "status": 6
    },
    '2022-01-26': {
        "the_date": "2022-01-26",
        "status": 4
    },
    '2022-01-25': {
        "the_date": "2022-01-25",
        "status": 6
    },
    '2022-01-28': {
        "the_date": "2022-01-28",
        "status": 4
    }
}

/*export async function getFastingAPIResponse(inputDate) {
    return new Promise((resolve) => {
        //const response = fetch(uri + inputDate);
        // const data = response.json();

        setTimeout(() => {
            resolve(
                fixed_responses[inputDate])
        }, 1500)
    })
}*/

export function getFastingAPIResponse(inputDate) {
    return fetch(dayAPIuri + inputDate)
        .then(data => data.json())
}
export function getFastingAPIMonthResponse(inputDate) {
    console.log('getFsatingAPIMonthResponse has just been called');
    return fetch(monthAPIuri + inputDate).then(data => data.json())

}
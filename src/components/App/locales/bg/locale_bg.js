export const locale_bg = {
    // months list by order
    months: [
        'Януари',
        'Февруари',
        'Март',
        'Април',
        'Май',
        'Юни',
        'Юли',
        'Август',
        'Септември',
        'Октомври',
        'Ноември',
        'Декември',
    ],

    // week days by order
    weekDays: [
        {
            name: 'Понеделник',
            short: 'П',
        },
        {
            name: 'Вторник',
            short: 'В',
        },
        {
            name: 'Сряда',
            short: 'Ср',
        },
        {
            name: 'Четвъртък',
            short: 'Ч',
        },
        {
            name: 'Петък',
            short: 'П',
        },
        {
            name: 'Събота',
            short: 'С',
            isWeekend: true,
        },
        {
            name: 'Неделя', // used for accessibility 
            short: 'Н', // displayed at the top of days' rows
            isWeekend: true, // is it a formal weekend or not?
        },
    ],

    // just play around with this number between 0 and 6
    weekStartingIndex: 6,

    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
        return gregorainTodayObject;
    },

    // return a native JavaScript date here
    toNativeDate(date) {
        return new Date(date.year, date.month - 1, date.day);
    },

    // return a number for date's month length
    getMonthLength(date) {
        return new Date(date.year, date.month, 0).getDate();
    },

    // return a transformed digit to your locale
    transformDigit(digit) {
        return digit;
    },

    // texts in the date picker
    nextMonth: 'Следващ месец',
    previousMonth: 'Предишен месец',
    openMonthSelector: 'Отвори избор на месец',
    openYearSelector: 'Отвори избор на  година',
    closeMonthSelector: 'Затвори избор на месец',
    closeYearSelector: 'Затвори избор на година',
    defaultPlaceholder: 'Избери...',

    // for input range value
    from: 'от',
    to: 'до',


    // used for input value when multi dates are selected
    digitSeparator: ',',

    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,

    // is your language rtl or ltr?
    isRtl: false,
}

import { store } from "../index";
import { diff, derivative, simplify, parse, sec } from 'mathjs'

const warStart = new Date("October 01, 2023 00:00:00");
const today = new Date();
const monthsSinceConflictStart = monthsSinceConflictStarted()


export const getMonthOfDate = (date) => {
    var dateR = new Date(Date.parse(date))

    return (dateR.getMonth() + 1)

}

export const getYearOfDate = (date) => {
    var dateR = new Date(Date.parse(date))

    return (dateR.getFullYear())

}

export const todaysDate = () => {
    var date = new Date()
    var month = (date.getMonth() + 1).toString().length === 1 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    var today = date.getFullYear() + '-' + (month) + '-' + date.getDate();


    return today;
}

export const getMonth = () => (
    new Date().getMonth() + 1)


export const generatePush = () => {
    const characters = "ABCDEFGHIKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-"
    var push = ""
    for (var i = 0; i < 20; i++) {
        push += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return push;
}

export const timeInMillis = () => {

    const d = new Date();
    let ms = d.getMilliseconds();

    return ms;
}

export function monthsSinceConflictStarted() {

    var months;
    months = (today.getFullYear() - warStart.getFullYear()) * 12;
    months -= warStart.getMonth();
    months += today.getMonth();



    return months <= 0 ? 0 : months;

}

export function monthComparison(reportDate) {
    // This function is used to address the month array to the correct spot

    var months;
    months = (reportDate.getFullYear() - warStart.getFullYear()) * 12;
    months -= warStart.getMonth();
    months += reportDate.getMonth();
    months += -1


    return months <= 0 ? 0 : months;

}
// conflict started in Oct
export const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep"]

export function monthLabels() {

    let labels = new Array(monthsSinceConflictStart).fill(null).map((r, count) => {

        let month = months[(monthsSinceConflictStart - (13 - count)) % 11]
        console.log(2023 + Math.floor(((monthsSinceConflictStart - (count)) / 12)))

        // The war started in October (m = 9)
        let year = 2023 + Math.floor(((monthsSinceConflictStart + (count + 8 - 12)) / 12))

        return month + " " + year
    })

    console.log(labels)

    return labels


}

export function lastThirtyDaysLabels(data) {

    let labels = new Array(30).fill(null)

    for (let i = 0; i <= 30; i++) {
        labels[30 - i] = data[(data.length - 1 - i)].report_date


    }
    return labels

}

export function totalDeathPerMonthData(data) {

    let monthDeaths = new Array(monthsSinceConflictStart + 1).fill(0)

    if (data) {

        data.map((dataRow) => {
            var reportDate = new Date(dataRow.report_date)
            if (dataRow)
                monthDeaths[monthComparison(reportDate)] += dataRow.ext_killed


        })


    }
    return monthDeaths
}

export function totalDeathThisMonthDayData(data) {

    let lastThirtyDay = new Array(30).fill(0)



    if (data) {

        for (let i = 0; i <= 30; i++) {
            lastThirtyDay[30 - i] = data[(data.length - 1 - i)].ext_killed

        }

    }
    return lastThirtyDay
}

export function totalDeathData(data) {
    if (data) {

        return data[(data.length - 1)].ext_killed_cum
    }
    else {
        return 0
    }
}



export function totalChildDeathData(data) {
    if (data) {

        return data[(data.length - 1)].ext_killed_children_cum
    }
    else {
        return 0
    }
}

export function totalWomenDeathData(data) {
    if (data) {

        return data[(data.length - 1)].ext_killed_women_cum
    }
    else {
        return 0
    }
}

export function totalPressDeathData(data) {
    if (data) {

        return data[(data.length - 1)].ext_press_killed_cum
    }
    else {
        return 0
    }
}



export function calculateRateOfChange(interval, y1, y2) {

    // Rate of change is defined as (y1 - y2) / (x1 - x2)
    let rateOfChange = (y2 - y1) / interval

    return rateOfChange


}




export function calculateDerivatives(lastThirtyDaysData, labels) {

    //array of the difference between elements of the given array
    let firstDerivative = diff(lastThirtyDaysData)
    firstDerivative.unshift(0)

    // array of the difference of the array of the difference
    let secondDerivative = diff(firstDerivative)
    secondDerivative.unshift(0)


    let graphData = []
    try {

        graphData =
            [
                {
                    "label": "Daily Casualties",
                    "fill": true,
                    "data": lastThirtyDaysData,
                    "pointStyle": 'circle',
                    "pointRadius": 8,
                    "pointHoverRadius": 15,
                    "backgroundColor": "rgba(78, 115, 223, 0.05)",
                    "borderColor": "rgba(255, 99, 132, 0.35)"

                },
                {
                    "label": "Daily Rate of Change of Casualties",
                    "fill": true,
                    "data": firstDerivative,
                    "pointStyle": 'circle',
                    "pointRadius": 8,
                    "pointHoverRadius": 15,
                    "backgroundColor": "rgba(78, 115, 223, 0.05)",
                    "borderColor": "rgba(118,82,229,0.45)",
                    "pointHoverBorderColor": "rgba(118,82,229,0.85)"


                },
                {
                    "label": "Acceleration of Casualties per day",
                    "fill": true,
                    "data": secondDerivative,
                    "pointStyle": 'circle',
                    "pointRadius": 8,
                    "pointHoverRadius": 15,
                    "backgroundColor": "rgba(78, 115, 223, 0.05)",
                    "hoverBorderWidth": 2,

                    "borderColor": "rgba(0, 0, 0, 0.15)"
                }
            ]
        console.log(labels)

    }
    catch { }

    return graphData



}

export function formatMonthlyData(data, labels) {
    console.log(data)


    const graphData = [{


        "label": "Monthly Casualties",

        "data": data,
        "hoverBackgroundColor": "rgba(118,82,229,0.85)"
    }

    ]

    console.log(graphData)

    return graphData



}

export function weeklyConcavity(data) {



}

export function insightsFromData(data) {
    // y1 represents the current week, while y2 represents the previous week
    let y1 = 0
    let y2 = 0

    // counting the size our data pulled from techforpalestine.org
    const dataSize = data.length - 1

    // i starts with zero, and while i <=6, increment one to i.
    for (let i = 0; i <= 6; i++) {
        y1 += data[(dataSize - i)].ext_killed
        y2 += data[(dataSize - 6 - i)].ext_killed
    }
    // Calculating the average rate of change on each week, and rounding the result to the second decimal.
    const casualtiesPerDayFirstWeek = (y1 / 7).toFixed(2)
    const casualtiesPerDayPreviousWeek = (y2 / 7).toFixed(2)

    // if the rate of change of the current week is higher than the previous week, this week the war is escalating
    // else this week the war is de-escalating
    const isEscalating = casualtiesPerDayFirstWeek > casualtiesPerDayPreviousWeek ? "escalating" : "de-escalating"

    //String with the result
    const result =
        ["The number of casualties per day on average (The average rate of change) in the last 7 days is approximately " + casualtiesPerDayFirstWeek + "",
        "The average number of casualties per day on the week before was approximately " + casualtiesPerDayPreviousWeek + "",
        "The conflict is " + isEscalating + " in comparison to the previous week."]

    return result
}

export function derivativeExpression(expr) {
    console.log(derivative(expr, 'x'))

}
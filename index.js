function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(array){
    const employeeRecords = []
    for(const arr of array){
        employeeRecords.push(createEmployeeRecord(arr))
    }
    return employeeRecords
}

function createTimeInEvent(employeeObj, dateStamp){
    const timeInObj = {}
    timeInObj.type = 'TimeIn'
    timeInObj.hour = parseInt(dateStamp.slice(11))
    timeInObj.date = dateStamp.slice(0,10)
    employeeObj.timeInEvents.push(timeInObj)
    return employeeObj
}

function createTimeOutEvent(employeeObj, dateStamp){
    const timeOutObj = {}
    timeOutObj.type = 'TimeOut'
    timeOutObj.hour = parseInt(dateStamp.slice(11))
    timeOutObj.date = dateStamp.slice(0,10)
    employeeObj.timeOutEvents.push(timeOutObj)
    return employeeObj
}

function hoursWorkedOnDate(employeeObj, date){
    const timeInObj = employeeObj.timeInEvents.find(element=>element.date===date)
    const timeIn = timeInObj.hour
    const timeOutObj = employeeObj.timeOutEvents.find(element=>element.date===date)
    const timeOut = timeOutObj.hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(employeeObj, date){
    const hours = hoursWorkedOnDate(employeeObj,date)
    return hours*employeeObj.payPerHour
}

function allWagesFor(employeeObj){
    const timeInArray = employeeObj.timeInEvents
    let sum =0
    timeInArray.forEach(obj => {
        const payForDay = wagesEarnedOnDate(employeeObj, obj.date)
        sum = payForDay + sum
    })
    return sum
}

function calculatePayroll(employeeRecordsArray){
    let totalSum =0
    employeeRecordsArray.forEach(employee =>{
        totalSum += allWagesFor(employee)
    })
    return totalSum
}

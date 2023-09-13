// Your code here
function createEmployeeRecord(array) {
  const newEmployee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return newEmployee;
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(record, dateTime) {
  const timeInEvent = { type: "TimeIn" };
  const dateTimeArray = dateTime.split(" ");
  timeInEvent.date = dateTimeArray[0];
  timeInEvent.hour = parseInt(dateTimeArray[1], 10);
  record.timeInEvents.push(timeInEvent);
  return record;
}

function createTimeOutEvent(record, dateTime) {
  const timeOutEvent = { type: "TimeOut" };
  const dateTimeArray = dateTime.split(" ");
  timeOutEvent.date = dateTimeArray[0];
  timeOutEvent.hour = parseInt(dateTimeArray[1], 10);
  record.timeOutEvents.push(timeOutEvent);
  return record;
}

function hoursWorkedOnDate(record, date) {
  let timeIn = record.timeInEvents.find(
    (timeInEvent) => timeInEvent.date === date
  );
  let timeOut = record.timeOutEvents.find(
    (timeOutEvent) => timeOutEvent.date === date
  );
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(record, date) {
  const hoursWorked = hoursWorkedOnDate(record, date);
  return hoursWorked * record.payPerHour;
}

function allWagesFor(record) {
  let total = 0;
  for (let timeIn of record.timeInEvents) {
    total += wagesEarnedOnDate(record, timeIn.date);
  }
  return total;
}

function calculatePayroll(employees) {
  return employees.reduce(
    (accumulator, record) => accumulator + allWagesFor(record),
    0
  );
}

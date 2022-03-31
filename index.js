const fs = require('fs');

const data = JSON.parse(fs.readFileSync('1-input.json', 'utf8'));

let bal = {};

data['revenueData'].forEach((item) => {
  if (item.startDate in bal) {
    bal[item.startDate] += item.amount;
  } else {
    bal[item.startDate] = item.amount;
  }
});

data['expenseData'].forEach((item) => {
  if (item.startDate in bal) {
    bal[item.startDate] -= item.amount;
  } else {
    bal[item.startDate] = -1 * item.amount;
  }
});
//console.log(JSON.stringify(bal));

let dateArr = Object.keys(bal);
dateArr.sort();
const start = dateArr[0];
const end = dateArr[dateArr.length - 1];

let yrs = [];
const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

for (
  let year = new Date(start).getFullYear();
  year <= new Date(end).getFullYear();
  year++
) {
  yrs.push(year.toString());
}
for (let i in yrs)
  for (let j in months) {
    const newDate =
      yrs[i] +
      '-' +
      months[j] +
      dateArr[0].substring(7, dateArr[0].length).toString();

    if (newDate > start && newDate < end) {
      if (dateArr.indexOf(newDate) === -1) {
        bal[newDate] = 0;
        dateArr.push(newDate);
      }
    }
  }

dateArr.sort();

let op = [];
dateArr.forEach((item) => {
  const obj = {};
  obj['amount'] = bal[item];
  obj['startDate'] = item;
  op.push(obj);
});

const output = {};
output.bal = op;

fs.writeFileSync('op.json', JSON.stringify(output), 'utf-8');

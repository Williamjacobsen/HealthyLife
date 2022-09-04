const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");

/*
cage = age = int (1, 2, 3)
csex = gender = m (male) / f (female)
cheightmeter = height = int (1, 2, 3)
ckg = weight = int (1, 2, 3)
cactivity = activity = float (1.234, 2.345, 3.456) => {
    Sedentary = 1.2
    Light = 1.375
    Moderate = 1.465
    Active = 1.55
    Very Active = 1.725
    Extra Active = 1.9
}
*/

const getData = async (age, gender, height, weight, activity) => {
  let res = await axios.get(`https://www.calculator.net/calorie-calculator.html?
    ctype=metric&cage=${age}&csex=${gender}
    &cheightmeter=${height}&ckg=${weight}&cactivity=${activity}&cmop=0
    &coutunit=c&cformula=m&cfatpct=20&printit=0&x=65&y=25`);
  const $ = cheerio.load(res.data);
  const baseCaloriesHtml = $(".verybigtext");
  const calories = baseCaloriesHtml.text().split(" ");
  const baseCalories = calories[0];
  return baseCalories;
};

async function tableauSignin(age, gender, height, weight, activity) {
  var response = await getData(age, gender, height, weight, activity);
  return response;
}

module.exports = { tableauSignin };

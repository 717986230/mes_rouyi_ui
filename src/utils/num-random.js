/*使用方法
* numRandom(0,1);     // 0 or 1
numRandom(1);       // 0 or 1
numRandom(100);     // 0~100
numRandom(100,999); // 100~999
numRandom(100,999,true);   //663.7264946557116
numRandom(100,999,4);      //346.5673
numRandom(0,1,true);       //0.1557056098245
numRandom();               //0.3497616536915302
* */
/**
 * Generate random number in a range
 * @param {number}         min
 * @param {number}         max     [optional]
 * @param {number|boolean} float   [optional] default false
 * @returns {number}
 */
export function numRandom(min, max, float) {
  if (min === undefined) {
    return Math.random();
  }

  if (max === undefined) {
    max = min;
    min = 0;
  }

  if (max < min) {
    var tmp = max;
    max = min;
    min = tmp;
  }

  if (float) {
    var result = Math.random() * (max - min) + min;
    if (float === true) {
      return result;
    } else if (typeof float === 'number') {
      var str = result.toString();
      var index = str.indexOf('.');
      str = str.substr(0, index + 1 + float);
      if (str[str.length - 1] === '0') {
        str = str.substr(0, str.length - 1) + random(1, 9);
      }
      return parseFloat(str);
    }
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}


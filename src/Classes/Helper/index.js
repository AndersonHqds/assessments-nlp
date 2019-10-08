class Helper {
  arrayStringToNumber(arr) {
    const result = [];
    let qtd = 0;
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
      let element = arr[i];
      if (element.length > 0) {
        element = [...element].map((char) => char.charCodeAt(0))
          .reduce((current, previous) => previous + current);
        sum += Math.sqrt(element);
        qtd++;
      } else {
        sum += 0;
      }
    }

    const mean = parseFloat(sum / qtd).toFixed(0);
    result.push(Number(mean));
    return result;
  }

  removeDuplicated(arr) {
    arr = [...new Set(arr)];
    return arr;
  }
}

module.exports = new Helper();

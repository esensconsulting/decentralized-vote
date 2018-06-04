export default {
  trimCharacter: function (strToTrim) {
    let result = strToTrim
    for (let i = strToTrim.length - 1; i >= 0; i--) {
      if (result[i].charCodeAt() === 0 || result[i].charCodeAt() === 32) {
        result = result.substring(0, result.length - 1)
        continue
      }
      break
    }
    return result
  }
}

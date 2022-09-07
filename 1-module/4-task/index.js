function checkSpam(str){
  const lowerStr = str.toLowerCase()
  return lowerStr.includes('1xbet') ||  lowerStr.includes('xxx');
}

console.log(checkSpam('1xBeT'))
console.log(checkSpam('xXx'))

function generateRandom() {
  let randomString=''
  const randomTable='abcdefghijklmnopqrstuvwxyz1234567890'

  for(let i = 0; i < 5; i++) {
    randomString += randomTable[Math.floor(Math.random()*36)]
  }
  return randomString
}

module.exports = generateRandom
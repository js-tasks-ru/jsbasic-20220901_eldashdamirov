function makeDiagonalRed(table) {
  let trList = table.rows; // создаем строки
  for (let i = 0; i < trList.length; i++) {
    trList[i].cells[i].style.backgroundColor = 'red'; 
  }
}

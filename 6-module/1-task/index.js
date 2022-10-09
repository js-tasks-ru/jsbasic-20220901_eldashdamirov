export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this._elem = document.createElement("TABLE");
    this._elem.innerHTML = this.rows.map(function (item) {
      return `<tr>
      <td>${item.name}</td>
      <td>${item.age}</td>
      <td>${item.salary}</td>
      <td>${item.city}</td>
      <td><button>X</button></td>
      </tr>`;
    }).join('');

    this.elem.addEventListener("click", evt => {
      if (evt.target.tagName == "BUTTON") {
        evt.target.parentElement.parentElement.remove();
      }
    });
  }

  get elem() {
    return this._elem;
  }
}
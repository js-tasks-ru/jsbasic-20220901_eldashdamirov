function showSalary(users, age) {
  let string = ""; 
  users.forEach((item)=>{ 
    if (item.age <= age) { 
      string = string + item.name + ", " + item.balance + "\n"; 
    }
  });
  return string.slice(0, -1); 
}
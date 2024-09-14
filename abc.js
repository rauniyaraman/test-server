const bcrypt = {
  hash: function() {
    return "hashed";
  },
  name: "Aman Rauniyar",
  user: {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com"
  }
};

console.log(bcrypt.hash()); // hashed
console.log(bcrypt.name); // Aman Rauniyar
console.log(bcrypt.user.id); // 1
console.log(bcrypt.user.name); // John Doe
console.log(bcrypt.user.email); // johndoe@example.com
console.log("Hello World");


setTimeout(() => {
  console.log("World");
}, 10);

console.log("Hello");

const id = setTimeout(() => {
  console.log("Not printed");
}, 1000000);

// clearTimeout(id);

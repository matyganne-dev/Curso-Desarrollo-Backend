console.log("A -> 1");
setTimeout(() => {
    console.log("C -> 2");
}, 1000);
console.log("B -> 3");
setTimeout(() => {
    console.log("D -> 4");
}, 2000);
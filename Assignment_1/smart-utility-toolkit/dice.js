const sides = Number(process.argv[2]);

if (!sides || sides < 2) {
    console.log("Please provide a number of sides");
    process.exit();
}

const result = Math.floor(Math.random() * sides) + 1;

console.log(`You rolled: ${result}`);
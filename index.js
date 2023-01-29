
console.log('hello');
console.log('hello2');

let fetchCalculator = async function() {
    try {
        let response = await fetch('http://localhost:8000/calculator');
        let json = await response.json();

        console.log(json)

    } catch(error) {
        console.log(error.message);
    }
}

fetchCalculator();
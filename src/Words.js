import wordBank from './wordle-bank.txt'
export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
];

export const generateWordSet = async () => {
    let wordSet;
    let randomWord;
    const pkArr = []

    await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010')
        .then((response) => response.json())
        .then((data) => {
            data.results.filter(pk => pk.name.length === 5).map(pk => {
                pkArr.push(pk.name)
            })
        })
        randomWord = pkArr[Math.floor(Math.random() * pkArr.length)]
        wordSet = new Set(pkArr)

    return { wordSet, randomWord }
}

/** 
await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
        const wordArr = result.split("\n")
        randomWord = wordArr[Math.floor(Math.random() * wordArr.length)]
        wordSet = new Set(wordArr)
    })
 */
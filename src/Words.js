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
            data.results.filter(pk => !pk.name.includes('-')).map(pk => {
                pkArr.push(pk.name)
            })
        })
        randomWord = pkArr[Math.floor(Math.random() * pkArr.length)]
        wordSet = new Set(pkArr)

    return { wordSet, randomWord }
}
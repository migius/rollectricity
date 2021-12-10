
import { Burocrazia } from "../entities/Burocrazia";


export const InizializzaListaBurocrazia = () => {
    console.log("InizializzaListaBurocrazia");

    let primaDecade = new Burocrazia(1930);
    primaDecade.ValoreIniziale = 5;
    return [   
        primaDecade,
        new Burocrazia(1940),
        new Burocrazia(1950),
        new Burocrazia(1960),
        new Burocrazia(1970),
        new Burocrazia(1980),
        new Burocrazia(1990),
        new Burocrazia(2000),
        new Burocrazia(2010),
        new Burocrazia(2020),
        new Burocrazia(2030),
        new Burocrazia(2040)
    ]
}


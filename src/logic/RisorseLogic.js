
import { Risorsa } from "../entities/Risorsa";

/*eslint "no-extend-native": "off"*/ 

export const GeneraRisorse = (dadi,risorse) => {
    if(typeof risorse === 'undefined' || risorse.length === 0){

        return InizializzaRisorse();
    }else{

        let newRisorse = [];

        risorse.forEach(element => {
            newRisorse.push(element.DeepCopy());
        });


        PulisciDadiRisorse(newRisorse);
        let gruppiDadi = [];

        for (let index = 1; index < 7; index++) {
            gruppiDadi.push(dadi.filter(x => {
                return x === index
                }).length);
        }
        console.log(gruppiDadi);
        let indiceRisorsa = 1;
        for (let index = 1; index <= gruppiDadi.length; index++) {
            
            if(gruppiDadi[index-1] === 0) continue;

            for (let risId = indiceRisorsa-1; risId < newRisorse.length; risId++) {
                console.log(risId);
                const ris = newRisorse[risId];
                if(ris.IsEsaurita){
                    continue;
                }
                else {
                    console.log("set " + gruppiDadi[index-1] + " su " + index + " per il " + ris.Nome)
                    ris.SetDadi(gruppiDadi[index-1], index);
                    risId++;
                    risId++;
                    indiceRisorsa = risId;
                    break;
                }
            }
        }
        console.log(newRisorse);
        return newRisorse;
    }
}

const PulisciDadiRisorse = (risorse) => {
    console.log("pulisciDadiRisorse")
    risorse.forEach(ris => {
        ris.Dadi = [];
    });
}

export const InizializzaRisorse = () => {
    console.log("InizializzaRisorse");
    return [   
        new Risorsa(0, "Carbone", 12),
        new Risorsa(1, "Petrolio", 14),
        new Risorsa(2, "Gas", 12),
        new Risorsa(3, "Rifiuti", 12),
        new Risorsa(4, "Uranio", 10),
        new Risorsa(5, "Deuterio", 8), 
    ]
}

Array.prototype.risorseSufficienti = function(regione) {
    let RisorseUsabili = new Array(this.length);

    //faccio un array con il numero di disponibili per ogni Id
    this.forEach(risorsa => {
        RisorseUsabili[risorsa.Id] = risorsa.Usabili;
    });

    let risorseSufficienti = true;
    regione.Consumi.forEach(risorsaDaUsare => {
        RisorseUsabili[risorsaDaUsare]--;
        if(RisorseUsabili[risorsaDaUsare]<0) {
            risorseSufficienti = false;
        }
    });

    return risorseSufficienti;
};

Array.prototype.risorseSufficientiTutteCentrali = function(regioni) {
    let RisorseUsabili = new Array(this.length);

    //faccio un array con il numero di disponibili per ogni Id
    this.forEach(risorsa => {
        RisorseUsabili[risorsa.Id] = risorsa.Usabili;
    });

    let risorseSufficienti = true;

    regioni.filter((r) => r.IsCostruita && !r.IsSmantellata && !r.IsProduttiva).forEach(regione => {
      regione.Consumi.forEach(risorsaDaUsare => {
          RisorseUsabili[risorsaDaUsare]--;
          if(RisorseUsabili[risorsaDaUsare]<0) {
              risorseSufficienti = false;
          }
      });
    });

    return risorseSufficienti;
};

Array.prototype.consumaRisorse = function(regione) {
    regione.Consumi.forEach(risorsaDaUsare => {
        this.forEach(risorsa => {
            if(risorsa.Id === risorsaDaUsare){
                risorsa.UsaRisorsa();
            }
        });
    });
};


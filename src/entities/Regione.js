import { FasiPartita } from './Partita';


export class Regione {
    constructor(x, y, costo, consumi, entrate) {
        this.X = x;
        this.Y = y;
        this.Costo = costo;
        this.Consumi = consumi;
        this.Entrate = entrate;
        this.IsCostruita = false;
        this.IsProduttiva = false;
        this.IsSmantellata = false;
        this.IsDaSmantellare = false;
    }

    IsLimitrofo(regione){
        return (this.X - regione.X)**2 + (this.Y - regione.Y)**2 < 2; 
    }

    IsCostruibile(partita,burocrazie,regioni){ 
        if(this.IsCostruita) {return false;}
        if(partita.Fase === FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE){
            return this.Costo <= burocrazie.punteggioAttuale();
        }else if(partita.Fase === FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_MIGL){
            const daSmantellareList = regioni.filter((item) => item.IsDaSmantellare);
            if(daSmantellareList.length !== 1) {return false;}
            const daSmantellare = daSmantellareList[0];
            if(!this.IsLimitrofo(daSmantellare)) {return false;}
            
            if(daSmantellare.Costo >= this.Costo) {return false;}

            return this.Costo <= burocrazie.punteggioAttuale() + daSmantellare.Costo;
        }else if(partita.Fase === FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_DECLASS){
            const daSmantellareList = regioni.filter((item) => item.IsDaSmantellare);
            if(daSmantellareList.length !== 1) {return false;}
            const daSmantellare = daSmantellareList[0];
            if(!this.IsLimitrofo(daSmantellare)) {return false;}
            
            if(daSmantellare.Costo < this.Costo) {return false;}
            
            return this.Costo/2 <= burocrazie.punteggioAttuale();
        }
    }

    get Style() {
        return  {
            top: 560 - 100*this.Y, 
            left: 80*this.X - 60
        };
    }

}
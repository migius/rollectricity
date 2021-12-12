
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

    get Style() {
        return  {
            top: 560 - 100*this.Y, 
            left: 80*this.X - 60
        };
    }

}
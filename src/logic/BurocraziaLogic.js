
import { Burocrazia } from "../entities/Burocrazia";


Array.prototype.indiceAnnoCorrente = function() {
    for (let i = 0; i < this.length; i++) {
        if(this[i].ValoreIniziale === undefined) {
            return i-1;
        }
    }
    return this.length-1;
};

Array.prototype.burocraziaAnnoCorrente = function() {
    return this[this.indiceAnnoCorrente()];
};

Array.prototype.segnaCosti = function(costo) {
    const iac = this.indiceAnnoCorrente();
    if(this[iac].Costi === undefined) {
        this[iac].Costi = 0;
    } 
    
    this[iac].Costi += costo;
    return this;
};

Array.prototype.segnaEntrate = function(entrate) {
    const iac = this.indiceAnnoCorrente();
    if(this[iac].Guadagni === undefined) {
        this[iac].Guadagni = 0;
    } 
    
    this[iac].Guadagni += entrate;
    return this;
};

Array.prototype.nuovoTurno = function() {
    const iac = this.indiceAnnoCorrente();
    
    if(iac < this.length - 1) {
        this[iac+1].ValoreIniziale = this[iac].ValoreIniziale - this[iac].Costi + this[iac].Guadagni;
    }
    return this;
};

Array.prototype.punteggioAttuale = function() {
    if(this === undefined || this.length === 0) return 0;
    const iac = this.indiceAnnoCorrente();
    
    return this[iac].ValoreIniziale - (this[iac].Costi !== undefined ? this[iac].Costi : 0) + (this[iac].Guadagni !== undefined ? this[iac].Guadagni : 0);
};

export const InizializzaBurocrazie = () => {
    console.log("InizializzaBurocrazie");

    let primaDecade = new Burocrazia(1930);
    primaDecade.ValoreIniziale = 5;

    const burocrazie = [   
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
    ];

    return burocrazie;
}



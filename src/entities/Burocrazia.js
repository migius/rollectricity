
export class Burocrazia {
    constructor(anno) {
        this.Anno = anno;
        this.ValoreIniziale = undefined;
        this.Costi = undefined;
        this.Guadagni = undefined;
    }
    
    DeepCopy() {
        let b = new Burocrazia();
        b.Anno = this.Anno ;
        b.ValoreIniziale = this.ValoreIniziale ;
        b.Costi = this.Costi ;
        b.Guadagni = this.Guadagni ;

        return b;
    }
}

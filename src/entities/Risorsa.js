export class Risorsa {
    constructor(id, nome, disponibili) {
      this.Id = id;
      this.Nome = nome;
      this.Disponibili = disponibili;
      this.Estratte = 0;
      this.Usate = 0;
      this.Dadi = [];
    }

    DeepCopy() {
        let r = new Risorsa();
        r.Id = this.Id;
        r.Nome = this.Nome;
        r.Disponibili = this.Disponibili;
        r.Estratte = this.Estratte;
        r.Usate = this.Usate;
        r.Dadi = this.Dadi;

        return r;
    }

    // Getter
    get IsEsaurita() {
        return this.Estratte === this.Disponibili;
    }
    
    get IsDisponibile() {
        return this.Usate < this.Estratte;
    }

    // Method
    SetDadi(numero, valore) {
        this.Dadi = [];

        for (let index = 0; index < numero; index++) {
            if(this.Estratte < this.Disponibili) 
            {
                this.Dadi.push(valore);
                this.Estratte++;
            }
        }
    }

}

  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCertificate, faFire, faOilCan, faRadiationAlt, faTrashAlt, faTint } from '@fortawesome/free-solid-svg-icons';

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
    
    get Usabili() {
        return this.Estratte - this.Usate;
    }

    get Icona() {
        return IconaFromId(this.Id);
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

    UsaRisorsa() {
        this.Usate++;
    }

}


export function IconaFromId(id){
    switch(id){
      case 0:
        return <FontAwesomeIcon icon={faCertificate} />;
      case 1:
        return <FontAwesomeIcon icon={faOilCan} />;
      case 2:
        return <FontAwesomeIcon icon={faFire} />;
      case 3:
        return <FontAwesomeIcon icon={faTrashAlt} />;
      case 4:
        return <FontAwesomeIcon icon={faRadiationAlt} />;
      case 5:
        return <FontAwesomeIcon icon={faTint} />;
      default:
        return <p>???</p>
    }
  }
  
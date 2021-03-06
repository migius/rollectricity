
export const FasiPartita = {
    INIZIO: 0,
    TIRA_DADI: 1,
    ASSEGNA_DADI: 2,
    SELEZIONA_AZIONE_CENTRALI: 3,
    SELEZIONA_CENTRALE_DA_COSTRUIRE: 4,
    SELEZIONA_CENTRALE_DA_DISMETTERE_MIGL: 5,
    SELEZIONA_CENTRALE_DA_COSTRUIRE_MIGL: 6,
    SELEZIONA_CENTRALE_DA_DISMETTERE_DECLASS: 7,
    SELEZIONA_CENTRALE_DA_COSTRUIRE_DECLASS: 8,
    SELEZIONA_CENTRALE_DA_DISMETTERE: 9,
    PRODUZIONE: 10,
    SCELTA_PRODUZIONE: 11,
    FINE_TURNO: 12,
    FINE_PARTITA: 13
}   


export class Partita {
    constructor(partita) {
        if(partita === undefined) {
            this.Fase = FasiPartita.INIZIO;
            this.Alert = {
                Testo: "Buona partita",
                Classe: "alert-success"
            };
            this.Entrate = 0;
            this.Turno = 0;
            this.PartitaCasuale = true;
            this.CodicePartita = "";
            this.CodicePartitaCorrente = "";
            this.ModalitaRapida = true;
        } else {
            this.Fase = partita.Fase;
            this.Entrate = partita.Entrate;
            this.Turno = partita.Turno;
            this.PartitaCasuale = partita.PartitaCasuale;
            this.CodicePartita = partita.CodicePartita;
            this.CodicePartitaCorrente = partita.CodicePartitaCorrente;
            this.ModalitaRapida = partita.ModalitaRapida;
        }
    }

    get Messaggio() {
        switch(this.Fase) {
            case FasiPartita.INIZIO:
                return "istruzioni.inizio";
            case FasiPartita.TIRA_DADI:
                return "istruzioni.tira";
            case FasiPartita.ASSEGNA_DADI:
                return "istruzioni.assegna";
            case FasiPartita.SELEZIONA_AZIONE_CENTRALI:
                return "istruzioni.azione";
            case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE:
            case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_MIGL:
                case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_DECLASS:
                return "istruzioni.costruire";
            case FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_MIGL:
            case FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_DECLASS:
            case FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE:
                return "istruzioni.dismettere";
            case FasiPartita.PRODUZIONE:
                return "istruzioni.produzione";
            case FasiPartita.SCELTA_PRODUZIONE:
                return "istruzioni.seleziona-produzione";
            case FasiPartita.FINE_TURNO:
                return "istruzioni.fine-turno";
            case FasiPartita.FINE_PARTITA:
                return "istruzioni.fine-partita";
            default:
                return "istruzioni.fase-null";
        }
    }

    ProssimaFase(fase) {    
        switch(this.Fase) {
            case FasiPartita.INIZIO:
                this.Turno = 0;
                break;
            case FasiPartita.TIRA_DADI:
                this.Turno++;
                break;
            default:
                break;
        }
        let newP = new Partita(this);
        newP.Fase = fase;
        return newP;
    }

    SegnalaAlert(testo, classe){
        let newP = new Partita(this);
        newP.Alert = {
            Testo: testo,
            Classe: classe
        };

        return newP;
    }

    TiraDadi() {
        let tiri = this.CodicePartita.split('-');
        console.log(tiri);
        return parseInt(tiri[this.Turno],36).toString(7).split('').flatMap(x => [parseInt(x)]);
    }
    
}


/*eslint "no-extend-native": "off"*/ 

String.prototype.IsAValidCodicePartita = function () {
    return /^[a-z0-9]{3,4}-[a-z0-9]{3,4}-[a-z0-9]{3,4}-[a-z0-9]{3,4}-[a-z0-9]{3,4}-[a-z0-9]{3,4}-[a-z0-9]{3,4}-[a-z0-9]{3,4}-[a-z0-9]{3,4}-[a-z0-9]{3,4}-[a-z0-9]{3,4}-[a-z0-9]{3,4}-$/.test(this);
}

Array.prototype.ToCodicePartita = function () {
    //converto da base 7 a base 36 per abbreviare
    return parseInt(this.sort().join(''),7).toString(36) + "-";
}
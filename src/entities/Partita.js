
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
        } else {
            this.Fase = partita.Fase;
        }
    }

    get Messaggio() {
        switch(this.Fase) {
            case FasiPartita.INIZIO:
                return "Buona partita";
            case FasiPartita.TIRA_DADI:
                return "Per iniziare il turno tira i dadi";
            case FasiPartita.ASSEGNA_DADI:
                return "Per determinare le risorse disponibili assegna i dadi";
            case FasiPartita.SELEZIONA_AZIONE_CENTRALI:
                return "Scegli se vuoi fare un'azione di costruzione";
            case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE:
            case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_MIGL:
                case FasiPartita.SELEZIONA_CENTRALE_DA_COSTRUIRE_DECLASS:
                return "Scegli la centrale da costruire";
            case FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_MIGL:
            case FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE_DECLASS:
            case FasiPartita.SELEZIONA_CENTRALE_DA_DISMETTERE:
                return "Scegli la centrale da smantellare";
            case FasiPartita.PRODUZIONE:
                return "Avvia la fase di produzione";
            case FasiPartita.SCELTA_PRODUZIONE:
                return "Seleziona le centrali per farle produrre, quelle non selezionate avranno una produzione negativa.";
            case FasiPartita.FINE_TURNO:
                return "L'anno volge al termine";
            case FasiPartita.FINE_PARTITA:
                return "La partita è finita";
            default:
                return "Qualcosa non ha funzionato... [Fase NULL]";
        }
    }

    ProssimaFase(fase) {    
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

        setTimeout(this.ProssimaFase(this.fase), 1000);
        return newP;
    }
}



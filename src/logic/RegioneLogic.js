import { Regione } from "../entities/Regione";

export const InizializzaListaRegioni = () => {
    console.log("InizializzaListaRegioni");

    return [   
        new Regione(1,3.5,12,[2,2],10),

        new Regione(2,1,10,[1,1,1],10),
        new Regione(2,2,11,[1,1,1],12),
        new Regione(2,3,8,[2],5),
        new Regione(2,4,18,[2,2,2],16),

        new Regione(3,0.5,4,[1],3),
        new Regione(3,1.5,7,[1,1],6),
        new Regione(3,2.5,12,[1,1],8),
        new Regione(3,3.5,15,[2,1],9),
        new Regione(3,4.5,22,[2,2],15),

        new Regione(4,1,3,[0],2),
        new Regione(4,2,15,[3,0],7),
        new Regione(4,3,12,[3],7),
        new Regione(4,4,20,[3,3],14),
        new Regione(4,5,26,[3,3,1],18),
        
        new Regione(5,1.5,5,[0,0],4),
        new Regione(5,2.5,22,[1,1,0],10),
        new Regione(5,3.5,15,[4],10),
        
        new Regione(6,1,7,[0,0,0],7),
        new Regione(6,2,18,[1,0,0],8),
        new Regione(6,3,25,[4,4],20),
        new Regione(6,4,35,[5],20),
        new Regione(6,5,50,[5,5],40),
        
        new Regione(7,1.5,9,[0,0,0,0],10),
        new Regione(7,3.5,40,[4,4,4],30),
        new Regione(7,4.5,70,[5,5],50),
        new Regione(7,5.5,80,[5,5],60),
        
        new Regione(8,5,90,[5],60),
    ]
}


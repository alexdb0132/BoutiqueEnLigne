import {EstInformationValide} from './EstInformationValide';

export function EstFormulaireValide(p_informations){
    const ensembleCles = Object.keys(p_informations);
    
    let estValide = true;
    let compteur = 0
    while(estValide && compteur < ensembleCles.length){
        if(!EstInformationValide(p_informations[ensembleCles[compteur]])){
            estValide = false;
        }
        compteur++;
    }

    return estValide;
}
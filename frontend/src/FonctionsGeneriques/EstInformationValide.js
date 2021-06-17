// Auteur: Philippe-Anthony Daumas
export function EstInformationValide(p_information){
    let estValide = false;

    if(p_information !== null && p_information !== undefined){

        if(p_information.length !== 0){

            const informationSansEspaces = p_information.trim();
            if(informationSansEspaces.length !== 0){
    
                estValide = true;
            }
        }
    }

    return estValide;
}
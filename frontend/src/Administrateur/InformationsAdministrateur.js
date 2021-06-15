// Autheur: Philippe-Anthony Daumas
const informationsAdministrateurs = {
    "nomAdministrateur" : "admin",
    "motDePasseAdministrateur" : "admin"
};

export function EstAdministrateur(p_nom, p_motDePasse){
    const { nomAdministrateur, motDePasseAdministrateur } = informationsAdministrateurs;

    return p_nom === nomAdministrateur 
        && p_motDePasse === motDePasseAdministrateur;
};
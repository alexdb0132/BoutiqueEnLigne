var selectionCategorie = [];

export function putSelectionCategorie(requete, reponse)
{
    putSelectionCategorieTableau(requete.body);
    reponse.status(200).json(selectionCategorie);
}

export function putSelectionCategorieTableau(tableau)
{
    selectionCategorie = tableau;
}

export function TableauSelectionCategorie()
{
    return selectionCategorie;
}

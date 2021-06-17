import 'regenerator-runtime/runtime';
import { putSelectionCategorieTableau, TableauSelectionCategorie } from './putSelectionCategorie';

test('Retourne le tableau de sélection de catégorie', () => {
    const categorieInseree = ['pomme', 'poire', 'poutine'];

    putSelectionCategorieTableau(categorieInseree);
    const tableauCategorie = TableauSelectionCategorie();

    tableauCategorie.forEach(categorie => {
        expect(categorieInseree).toContainEqual(categorie);
    });
});
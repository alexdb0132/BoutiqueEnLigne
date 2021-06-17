// Auteur: Philippe-Anthony Daumas
import { EstInformationValide } from './EstInformationValide';

test('Vérifier une information du formulaire', () => {
    expect(EstInformationValide("")).toBe(false);
    expect(EstInformationValide(" ")).toBe(false);
    expect(EstInformationValide(null)).toBe(false);
    expect(EstInformationValide(undefined)).toBe(false);
    expect(EstInformationValide("test")).toBe(true);
});
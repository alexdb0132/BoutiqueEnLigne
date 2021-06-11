import {EstInformationValide} from './VerifierInformationsCompte';

test('Vérifier que les informations reçues ne sont pas vide', ()=>{
    expect(EstInformationValide("")).toBe(false);
    expect(EstInformationValide(" ")).toBe(false);
    expect(EstInformationValide(null)).toBe(false);
    expect(EstInformationValide(undefined)).toBe(false);
    expect(EstInformationValide("test")).toBe(true);
});
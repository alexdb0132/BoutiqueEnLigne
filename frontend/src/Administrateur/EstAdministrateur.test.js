// Autheur: Philippe-Anthony Daumas
import {EstAdministrateur} from './InformationsAdministrateur';

test('Authentifier l\'administrateur', () => {
    expect(EstAdministrateur("testNom", "motDePasse")).toBe(false);
    expect(EstAdministrateur("admin", "motDePasse")).toBe(false);
    expect(EstAdministrateur("testNom", "admin")).toBe(false);
    expect(EstAdministrateur("admin", " ")).toBe(false);
    expect(EstAdministrateur(" ", "admin")).toBe(false);
    expect(EstAdministrateur(" ", " ")).toBe(false);
    expect(EstAdministrateur("admin", "admin")).toBe(true);
});
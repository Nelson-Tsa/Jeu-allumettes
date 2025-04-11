import {expect, test, vi, describe, beforeEach} from "vitest";

// Create a mock elements object to store references
let mockElements = {};

// Setup all mocks before importing the script
beforeEach(() => {
  // Reset mocks for each test
  mockElements = {};
  vi.resetAllMocks();
});

// Mock all DOM methods and properties
global.document = {
  getElementById: vi.fn(id => {
    if (!mockElements[id]) {
      mockElements[id] = {
        innerText: '',
        textContent: '',
        value: '',
        style: { display: 'none' },
        disabled: false,
        addEventListener: vi.fn(),
        innerHTML: '',
        onclick: null,
        className: '',
        checked: false
      };
    }
    return mockElements[id];
  }),
  querySelector: vi.fn(selector => {
    if (!mockElements[selector]) {
      mockElements[selector] = {
        style: { display: 'none' },
        addEventListener: vi.fn(),
        innerHTML: '',
        checked: false,
        value: '',
        className: '',
        appendChild: vi.fn()
      };
    }
    return mockElements[selector];
  }),
  querySelectorAll: vi.fn(() => []),
  addEventListener: vi.fn(),
  createElement: vi.fn(() => ({
    style: {},
    setAttribute: vi.fn(),
    appendChild: vi.fn()
  }))
};

// Mock window methods and properties
global.window = {
  addEventListener: vi.fn()
};

// Mock other globals
global.alert = vi.fn();
global.prompt = vi.fn();
global.confirm = vi.fn().mockReturnValue(true);
global.setInterval = vi.fn(callback => {
  // Immediately invoke the callback once for testing
  callback();
  return 123; // Mock timer ID
});

// Mock location
global.location = {
  reload: vi.fn()
};

// Mock console
global.console = {
  ...console,
  log: vi.fn()
};

const {decompteAllumettes, choisirNombreDeJoueur, jeux, finPartie, rejouer, VersionInput, inputjoueurs, nommerInput, valeurInput, verifierInput, joueurSuivant, finPartieInput, rejouerInput} = await import('./script.js');

// Réinitialiser les mocks avant chaque test
beforeEach(() => {
    // Vider les éléments mock
    Object.keys(mockElements).forEach(key => delete mockElements[key]);
    
    // Réinitialiser tous les mocks
    vi.clearAllMocks();
  });

describe('decompteAllumettes', () => {
    test('should return 50', () => {
        expect(decompteAllumettes()).toBe(50);
    });
});

describe('finPartie', () => {
    test('appelle alert quand les allumettes sont à 0', () => {
        // Espionner la fonction alert
        const alertSpy = vi.spyOn(global, 'alert');
        
        // Créer un mock temporaire pour rejouer pour éviter les erreurs
        const originalRejouer = rejouer;
        global.rejouer = vi.fn();
        
        try {
            // Appeler finPartie avec 0 allumettes et joueur 1
            finPartie(0, 1);
            
            // Vérifier que alert a été appelé avec le bon message
            expect(alertSpy).toHaveBeenCalledWith('le joueur 1 a gagner la partie');
        } finally {
            // Restaurer la fonction originale
            global.rejouer = originalRejouer;
        }
    });
    
    test('ne fait rien quand les allumettes sont supérieures à 0', () => {
        // Espionner la fonction alert
        const alertSpy = vi.spyOn(global, 'alert');
        
        // Appeler finPartie avec 5 allumettes et joueur 1
        finPartie(5, 1);
        
        // Vérifier que alert n'a pas été appelé
        expect(alertSpy).not.toHaveBeenCalled();
    });
});

describe('rejouer', () => {
    beforeEach(() => {
        // Réinitialiser les mocks avant chaque test
        vi.clearAllMocks();
    });
    
    test('vérifie que prompt est appelé avec le bon message quand l\'utilisateur répond "oui"', () => {
        // Remplacer temporairement choisirNombreDeJoueur pour éviter son exécution
        const originalChoisirNombreDeJoueur = choisirNombreDeJoueur;
        global.choisirNombreDeJoueur = vi.fn();
        
        try {
            // Configurer le mock de prompt pour retourner "oui"
            global.prompt.mockReturnValueOnce("oui");
            
            // Appeler rejouer
            rejouer();
            
            // Vérifier que prompt a été appelé avec le bon message
            expect(global.prompt).toHaveBeenCalledWith("voulez vous rejouer ? oui ou non");
        } finally {
            // Restaurer la fonction originale
            if (originalChoisirNombreDeJoueur) {
                global.choisirNombreDeJoueur = originalChoisirNombreDeJoueur;
            } else {
                delete global.choisirNombreDeJoueur;
            }
        }
    })
    
    test('affiche un message et recharge la page si l\'utilisateur ne répond pas "oui"', () => {
        // Configurer le mock de prompt pour retourner "non"
        global.prompt.mockReturnValueOnce("non");
        
        // Espionner la fonction alert
        const alertSpy = vi.spyOn(global, 'alert');
        
        // Espionner la fonction location.reload
        const reloadSpy = vi.spyOn(global.location, 'reload');
        
        // Appeler rejouer
        rejouer();
        
        // Vérifier que prompt a été appelé avec le bon message
        expect(global.prompt).toHaveBeenCalledWith("voulez vous rejouer ? oui ou non");
        
        // Vérifier que alert a été appelé avec le bon message
        expect(alertSpy).toHaveBeenCalledWith("merci d'avoir jouer");
        
        // Vérifier que location.reload a été appelé
        expect(reloadSpy).toHaveBeenCalled();
    });
});
import { User, ClientProfile, PrestataireProfile, TransporteurProfile } from './types'

// Données de démonstration
const demoUsers: User[] = [
  {
    id: '1',
    email: 'client@demo.com',
    password: 'client123',
    type: 'client',
    profile: {
      nomComplet: 'Jean Dupont',
      raisonSociale: 'Entreprise Dupont SARL',
      telephone: '+237 6 12 34 56 78',
      localisation: {
        ville: 'Douala',
        pays: 'Cameroun'
      },
      typeMarchandises: ['alimentaire', 'materiaux'],
      frequenceBesoins: 'hebdomadaire',
      modePaiementPrefere: 'mobile_money'
    } as ClientProfile,
    createdAt: '2024-01-15',
    isActive: true
  },
  {
    id: '2',
    email: 'prestataire@demo.com',
    password: 'prestataire123',
    type: 'prestataire',
    profile: {
      nomEntreprise: 'Garage Auto Plus',
      categorie: 'garage',
      adresse: '123 Avenue de la République',
      ville: 'Douala',
      pays: 'Cameroun',
      telephone: '+237 6 23 45 67 89',
      horairesOuverture: '8h-18h (Lun-Sam)',
      siteWeb: 'www.garageautoplus.cm',
      services: ['Mécanique générale', 'Carrosserie', 'Entretien préventif'],
      tarifs: {
        'Vidange moteur': 15000,
        'Changement pneus': 5000,
        'Réparation freins': 25000
      }
    } as PrestataireProfile,
    createdAt: '2024-01-10',
    isActive: true
  },
  {
    id: '3',
    email: 'transporteur@demo.com',
    password: 'transporteur123',
    type: 'transporteur',
    profile: {
      nomEntreprise: 'Transport Express SARL',
      typeStructure: 'societe',
      rccm: 'CM-2024-A-001234',
      telephone: '+237 6 34 56 78 90',
      siegeSocial: '456 Boulevard de la Liberté, Douala',
      localisationPrincipale: 'Douala',
      typeMarchandises: ['containers', 'vrac', 'alimentaire'],
      capaciteOperationnelle: {
        nombreCamions: 12,
        typesCamions: ['Semi-remorque', 'Benne', 'Plateau'],
        capacite: {
          tonnage: 25,
          volume: 80
        },
        zonesCouverture: ['Cameroun', 'CEMAC'],
        kilometrageMoyenAnnuel: 50000
      },
      equipe: {
        conducteurs: 15,
        assistantsLogistiques: 5
      },
      documentsLegaux: {
        assuranceVehicules: true,
        controlesTechniques: true,
        autorisationsTransport: true
      },
      servicesAdditionnels: {
        suiviGPS: true,
        assuranceCargaison: true
      },
      planAbonnement: 'pro'
    } as TransporteurProfile,
    createdAt: '2024-01-05',
    isActive: true
  }
]

export class AuthService {
  private static STORAGE_KEY = 'translink_user'

  static login(email: string, password: string): User | null {
    const user = demoUsers.find(u => u.email === email && u.password === password)
    if (user) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
      return user
    }
    return null
  }

  static register(userData: Partial<User>): User | null {
    // Vérifier si l'email existe déjà
    const existingUser = demoUsers.find(u => u.email === userData.email)
    if (existingUser) {
      return null
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email!,
      password: userData.password!,
      type: userData.type!,
      profile: userData.profile!,
      createdAt: new Date().toISOString(),
      isActive: true
    }

    demoUsers.push(newUser)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUser))
    return newUser
  }

  static getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.STORAGE_KEY)
    if (userStr) {
      return JSON.parse(userStr)
    }
    return null
  }

  static logout(): void {
    localStorage.removeItem(this.STORAGE_KEY)
  }

  static updateProfile(profileData: Partial<User['profile']>): User | null {
    const currentUser = this.getCurrentUser()
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        profile: { ...currentUser.profile, ...profileData }
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedUser))
      return updatedUser
    }
    return null
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  static getUserType(): User['type'] | null {
    const user = this.getCurrentUser()
    return user ? user.type : null
  }
}
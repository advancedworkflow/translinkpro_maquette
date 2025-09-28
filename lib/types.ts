export interface User {
  id: string
  email: string
  password: string
  type: 'client' | 'prestataire' | 'transporteur'
  profile: ClientProfile | PrestataireProfile | TransporteurProfile
  createdAt: string
  isActive: boolean
}

export interface ClientProfile {
  nomComplet: string
  raisonSociale?: string
  telephone: string
  localisation: {
    ville: string
    pays: string
  }
  typeMarchandises: string[]
  frequenceBesoins: 'occasionnel' | 'hebdomadaire' | 'quotidien'
  modePaiementPrefere: 'mobile_money' | 'carte' | 'virement'
}

export interface PrestataireProfile {
  nomEntreprise: string
  categorie: 'assurance' | 'garage' | 'concessionnaire' | 'pieces_detachees' | 'lubrifiants'
  adresse: string
  ville: string
  pays: string
  telephone: string
  horairesOuverture: string
  siteWeb?: string
  services: string[]
  tarifs?: Record<string, number>
}

export interface TransporteurProfile {
  nomEntreprise: string
  typeStructure: 'independant' | 'societe' | 'cooperative'
  rccm?: string
  telephone: string
  siegeSocial: string
  localisationPrincipale: string
  typeMarchandises: string[]
  capaciteOperationnelle: {
    nombreCamions: number
    typesCamions: string[]
    capacite: {
      tonnage: number
      volume: number
    }
    zonesCouverture: string[]
    kilometrageMoyenAnnuel: number
  }
  equipe: {
    conducteurs: number
    assistantsLogistiques: number
  }
  documentsLegaux: {
    assuranceVehicules: boolean
    controlesTechniques: boolean
    autorisationsTransport: boolean
  }
  servicesAdditionnels: {
    suiviGPS: boolean
    assuranceCargaison: boolean
  }
  planAbonnement: 'starter' | 'pro' | 'entreprise' | 'elite'
}

export interface DemandeTransport {
  id: string
  clientId: string
  typeMarchandise: string
  volume: number
  poids: number
  origine: string
  destination: string
  dateDemande: string
  statut: 'en_attente' | 'acceptee' | 'en_cours' | 'livree' | 'annulee'
  transporteurId?: string
  prix?: number
}

export interface OffreTransport {
  id: string
  transporteurId: string
  demandeId: string
  prix: number
  delaiLivraison: string
  statut: 'en_attente' | 'acceptee' | 'refusee'
  dateOffre: string
}

export interface Course {
  id: string
  demandeId: string
  transporteurId: string
  clientId: string
  statut: 'en_cours' | 'livree' | 'annulee'
  dateDebut: string
  dateFin?: string
  positionActuelle?: {
    lat: number
    lng: number
  }
  suiviGPS: boolean
}


# TransLinkPro

Plateforme complète de gestion de flotte de transport avec suivi GPS, marketplace de prestataires et analytics avancées.

## 🚀 Fonctionnalités

### Corporate
- **Site vitrine** avec présentation du projet
- **Landing page investisseurs** avec projections financières
- **Sections détaillées** : Solution, Marché, Services, Entreprise

### Plateforme SaaS
- **Tableau de bord** avec KPIs en temps réel
- **Gestion de flotte** complète (véhicules, chauffeurs, maintenance)
- **Suivi GPS** en temps réel avec cartes interactives
- **Gestion des courses** et optimisation des routes
- **Marketplace** intégrée pour connecter transporteurs et clients
- **Analytics** avancées avec rapports détaillés
- **Paiements** et transactions sécurisées
- **Administration** et gestion des utilisateurs

## 🛠️ Technologies

- **Frontend** : Next.js 14+ avec App Router
- **Styling** : Tailwind CSS
- **Charts** : Recharts
- **Icons** : Lucide React
- **Authentication** : NextAuth.js
- **TypeScript** : Typage strict
- **State Management** : React Hooks + Context

## 📁 Structure du Projet

```
translinkpro/
├── app/                        # App Router principal
│   ├── layout.tsx              # Layout global (Header + Footer + MegaMenu)
│   ├── globals.css             # Styles globaux (import Tailwind)
│   ├── page.tsx                # Page d'accueil (corporate)
│
│   ├── presentation/           # 🌍 Landing investisseurs
│   │   ├── page.tsx            # Présentation projet (PDF adapté en web)
│   │   ├── solution.tsx        # Problème & Solution
│   │   ├── marche.tsx          # Opportunité marché
│   │   ├── projections.tsx     # Projections financières
│   │   └── investir.tsx        # Pourquoi investir + CTA
│
│   ├── solution/               # 💡 Section corporate : Solution
│   ├── marche-modele/          # 📊 Marché & Modèle économique
│   ├── services/               # 🛠️ Services & Tarifs
│   ├── entreprise/             # 🏢 À propos
│
│   └── app-saas/               # 🚛 Application SaaS (gestion de flotte)
│       ├── layout.tsx          # Layout SaaS (Sidebar, Dashboard UI)
│       ├── page.tsx            # Tableau de bord principal
│       ├── auth/               # Authentification
│       ├── flotte/             # Gestion des véhicules
│       ├── courses/            # Gestion des courses
│       ├── tracking/           # GPS & Suivi temps réel
│       ├── paiements/          # Paiements & transactions
│       ├── marketplace/        # Marketplace prestataires
│       ├── analytics/          # Reporting & KPI
│       └── admin/              # Administration & autorité
│
├── components/                 # Composants réutilisables
│   ├── navigation/             # Header, MegaMenu, Footer, Sidebar
│   ├── ui/                     # Boutons, cartes, modals, inputs
│   ├── charts/                 # Graphiques (Recharts)
│   ├── forms/                  # Formulaires génériques
│   └── sections/               # Hero, Features, CTA
│
├── lib/                        # Utils (API fetchers, helpers)
│   ├── api.ts                  # Requêtes backend
│   ├── auth.ts                 # Gestion JWT / NextAuth
│   ├── constants.ts            # Constantes de l'application
│   └── utils.ts                # Fonctions utilitaires
│
├── public/                     # Images, logos, icônes
├── styles/                     # Fichiers CSS globaux
└── Configuration files         # package.json, tailwind.config.js, etc.
```

## 🎨 Design System

### Couleurs
- **Primary** : Vert herbe foncé (#2d7a2d)
- **Secondary** : Gris moderne (#64748b)
- **Accent** : Couleurs complémentaires

### Composants
- **Boutons** : Primary, Secondary, Outline, Ghost
- **Cartes** : Default, Elevated, Outlined
- **Formulaires** : Inputs avec validation, modals
- **Navigation** : Header responsive, Sidebar collapsible

## 🚀 Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd translinkpro
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env.local
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

5. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 📝 Scripts Disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run start` - Serveur de production
- `npm run lint` - Linting ESLint

## 🔧 Configuration

### Variables d'environnement
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### Tailwind CSS
Configuration personnalisée avec couleurs primaires et secondaires définies dans `tailwind.config.js`.

## 📱 Responsive Design

- **Mobile First** : Design adaptatif pour tous les écrans
- **Breakpoints** : sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation** : Menu hamburger sur mobile, mega menu sur desktop

## 🔐 Authentification

- **Pages** : Login, Register, Reset Password
- **Sécurité** : JWT tokens, validation côté client et serveur
- **Rôles** : Admin, Manager, Driver, Client
- **Protection** : Routes protégées avec middleware

## 📊 Analytics & Reporting

- **Graphiques** : Line, Bar, Pie charts avec Recharts
- **KPIs** : Métriques en temps réel
- **Exports** : Rapports PDF/Excel
- **Filtres** : Périodes, véhicules, chauffeurs

## 🗺️ Intégrations Futures

- **Maps** : Google Maps / OpenStreetMap pour le tracking
- **GPS** : Intégration avec dispositifs de géolocalisation
- **Paiements** : Stripe / PayPal pour les transactions
- **Notifications** : Push notifications, emails, SMS
- **API** : REST API pour intégrations tierces

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- Email : contact@translinkpro.com
- Documentation : [docs.translinkpro.com](https://docs.translinkpro.com)
- Issues : [GitHub Issues](https://github.com/translinkpro/translinkpro/issues)

---

**TransLinkPro** - Révolutionner la gestion de flotte de transport 🚛




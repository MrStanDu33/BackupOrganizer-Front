export default {
  login: <object> {
    connection: 'Connexion' as string,
    email: 'Email' as string,
    password: 'Mot de passe' as string,
    forgotPass: 'Mot de passe oublié ?' as string,
    new: 'Nouveau ici ?' as string,
    createAccount: 'Créer un compte !' as string,
    errorInvalidCredentials: 'L\'identifiant et le mot de passe que vous avez saisis ne correspondent pas.' as string,
    errorMailStructure: 'Vous devez indiquer une adresse mail valide.' as string,
    errorPassword: 'Votre mot de passe doit contenir au moins 8 caractères.' as string,
  },
  newAccount: <object> {
    createAccount: 'Créez votre compte' as string,
    name: 'Nom' as string,
    email: 'Email' as string,
    password: 'Mot de passe' as string,
    confirm: 'Confirmer' as string,
    create: 'Créer' as string,
    connectWithAccount: 'Se connecter avec un compte existant.' as string,
    errorName: 'Vous devez indiquer un nom.',
    errorMailStructure: 'Vous devez indiquer une adresse mail valide.' as string,
    errorMailExist: 'Un utilisateur existe déjà avec cette adresse e-mail.' as string,
    errorPassword: 'Votre mot de passe doit contenir au moins 8 caractères.' as string,
    errorConfirm: 'Les mots de passe ne corréspondent pas.' as string,
  },
  menu: <object> {
    logout: 'Déconnexion' as string,
    dashboard: 'Tableau de bord' as string,
    clients: 'Clients' as string,
    projects: 'Projets' as string,
    websites: 'Sites internet' as string,
    database: 'Bases de données' as string,
    backups: 'Sauvegardes' as string,
    billing: 'Facturation' as string,
    useraccount: 'Comptes utilisateurs' as string,
    darkTheme: 'Passer en thème sombre' as string,
    whiteTheme: 'Passer en thème lumineux' as string,
    switchLang: 'Passer en français' as string,
  },
};

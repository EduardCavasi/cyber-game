import { Scene, ComputerScreen } from '../types';

// Game Scenes
export const scenes: Record<string, Scene> = {
  office: {
    id: 'office',
    name: 'Birou',
    backgroundImage: '/images/office.jpg',
    description: 'Biroul colegului tău unde a avut loc breșa de securitate. Caută indicii pe birou, computer, biblioteca și prin cameră.',
    clickableItems: [
      {
        id: 'computer',
        name: 'Computer',
        type: 'computer',
        x: 40,
        y: 45,
        width: 18,
        height: 14,
        description: 'Computerul colegului tău. Are nevoie de o parolă pentru a fi accesat. S-ar putea să conțină informații importante în interior.',
        requiresPassword: true,
        password: '2000cat',
        hint: 'Încearcă să combini anul nașterii cu numele animalului de companie. Verifică prin jur pentru indicii.',
        leadsTo: 'computerDesktop'
      },
      {
        id: 'sticky-note',
        name: 'Notă Adezivă',
        type: 'note',
        x: 66,
        y: 52,
        width: 5,
        height: 5,
        description: 'Memento Parolă: Nume_ZiuaNașterii'
      },
      {
        id: 'calculator',
        name: 'Calculator',
        type: 'computer',
        x: 60,
        y: 52,
        width: 5,
        height: 6,
        description: 'Un calculator specializat cu protecție de logare. Pare să conțină date importante.',
        requiresPassword: true,
        password: 'Alex_20',
        hint: 'Încearcă să folosești formatul din notița adezivă: Nume_ZiuaNașterii. Verifică prin jur pentru mai multe indicii.',
        leadsTo: 'computerDesktop'
      },
      {
        id: 'notes',
        name: 'Notițe pe Birou',
        type: 'note',
        x: 72,
        y: 50,
        width: 8,
        height: 5,
        description: 'Un bloc de hârtie cu câteva notițe scrise de mână. O notă menționează "de amintit: programare veterinar pentru Whiskers".'
      },
      {
        id: 'calendar',
        name: 'Calendar',
        type: 'item',
        x: 85,
        y: 45,
        width: 8,
        height: 10,
        description: 'Un calendar de perete. Pare să aibă o dată importantă marcată.',
        leadsTo: 'calendarView',
        containsItems: ['calendar']
      },
      {
        id: 'bookshelf',
        name: 'Bibliotecă',
        type: 'item',
        x: 10,
        y: 40,
        width: 15,
        height: 40,
        description: 'O bibliotecă plină cu cărți. Una dintre cărți iese în evidență.',
        containsItems: ['security-book']
      },
      {
        id: 'desk-drawer',
        name: 'Sertar Birou',
        type: 'drawer',
        x: 60,
        y: 60,
        width: 18,
        height: 8,
        description: 'Un sertar parțial deschis la biroul colegului tău.',
        containsItems: ['id-card']
      },
      {
        id: 'trash-bin',
        name: 'Coș de Gunoi',
        type: 'item',
        x: 90,
        y: 80,
        width: 8,
        height: 10,
        description: 'Un coș de gunoi lângă birou. Pare să conțină hârtii mototolite.',
        containsItems: ['crumpled-paper']
      }
    ]
  },
  calendarView: {
    id: 'calendarView',
    name: 'Calendar',
    backgroundImage: '/images/calendar.png',
    description: 'O privire mai atentă la calendar. 15 iulie 2000 este încercuit cu roșu cu "Ziua mea de naștere!" scris lângă.',
    clickableItems: [
      {
        id: 'examine-calendar',
        name: 'Examinează',
        type: 'note',
        x: 50,
        y: 50,
        width: 40,
        height: 35,
        description: 'Un calendar cu 15 iulie 2000 încercuit cu roșu cu "Ziua mea de naștere!" scris lângă. Aceasta trebuie să fie data de naștere a colegului tău.'
      },
      {
        id: 'back-to-office',
        name: 'Înapoi la Birou',
        type: 'door',
        x: 10,
        y: 90,
        width: 15,
        height: 8,
        description: 'Întoarce-te la birou.',
        leadsTo: 'office'
      }
    ]
  },
  computerDesktop: {
    id: 'computerDesktop',
    name: 'Computer Desktop',
    backgroundImage: '/images/desktop.png',
    description: 'Te-ai logat în computerul colegului tău. Există mai multe pictograme pe desktop.',
    clickableItems: [
      {
        id: 'email-client',
        name: 'Client Email',
        type: 'computer',
        x: 25,
        y: 20,
        width: 15,
        height: 15,
        description: 'Deschide clientul de email pentru a verifica emailurile suspecte.',
        leadsTo: 'emailClient'
      },
      {
        id: 'files-folder',
        name: 'Folder Fișiere',
        type: 'folder',
        x: 25,
        y: 45,
        width: 15,
        height: 15,
        description: 'Un folder care conține fișiere importante.',
        leadsTo: 'filesFolder'
      },
      {
        id: 'browser',
        name: 'Browser web',
        type: 'computer',
        x: 25,
        y: 70,
        width: 35,
        height: 15,
        description: 'FELICITĂRI! Ai câștigat un iPhone 17! Sistemul nostru a detectat că ești eligibil pentru această recompensă exclusivă. Revendică-ți iPhone 17 GRATUIT acum înainte ca oferta să expire!',
        containsItems: ['claim-reward', 'report-scam']
      },
      {
        id: 'return-to-office',
        name: 'Înapoi la Birou',
        type: 'door',
        x: 75,
        y: 80,
        width: 15,
        height: 15,
        description: 'Întoarce-te la birou.',
        leadsTo: 'office'
      }
    ]
  },
  emailClient: {
    id: 'emailClient',
    name: 'Client Email',
    backgroundImage: '/images/mailbox.png',
    description: 'Căsuța de email a colegului tău. Există mai multe emailuri suspecte în inbox care ar putea conține indicii importante.',
    clickableItems: [
      {
        id: 'suspicious-email',
        name: 'Confirmare Zbor',
        type: 'item',
        x: 50,
        y: 22,
        width: 45,
        height: 10,
        description: 'De la: rezervari@calatorii.com\nSubiect: Confirmare Zbor\n\nZborul tău către Fiji este confirmat pentru mâine la ora 10:00 AM. Paradise Cove Resort te așteaptă. Referința rezervării tale este MPOWMQ.'
      },
      {
        id: 'password-hint-email',
        name: 'URGENT: Alertă de Securitate - Acțiune Necesară',
        type: 'item',
        x: 50,
        y: 35,
        width: 45,
        height: 10,
        description: 'De la: alerta-securitate@sisteme-companie.net [SUSPECT]\nSubiect: URGENT: Alertă de Securitate - Acțiune Necesară\n\nStimate Angajat,\n\nSistemele noastre au detectat încercări de acces neautorizat la contul tău. Te rugăm să dai click pe butonul de mai jos imediat pentru a-ți verifica identitatea și a-ți securiza contul:'
      },
      {
        id: 'phishing-warning',
        name: 'Avertisment Phishing',
        type: 'item',
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        description: 'ATENȚIE: Acesta este un exemplu de email de phishing! În viața reală, nu ar trebui niciodată să dai click pe link-uri suspecte în email-uri, în special cele cu cereri urgente, alerte neașteptate sau de la expeditori necunoscuți. Companiile legitime nu cer niciodată informații sensibile prin link-uri de email. Verifică întotdeauna adresa de email a expeditorului și raportează email-urile suspecte departamentului IT.'
      },
      {
        id: 'travel-booking-email',
        name: 'Rezervare Paradise Cove',
        type: 'item',
        x: 50,
        y: 48,
        width: 45,
        height: 10,
        description: 'De la: rezervari@paradisecove.com\nSubiect: Confirmarea Rezervării Tale\n\nÎți mulțumim pentru rezervarea la Paradise Cove Resort, Fiji. Suntem încântați să îți confirmăm rezervarea pentru o Vilă cu Vedere la Ocean începând de mâine pentru 14 nopți. Așteptăm cu nerăbdare să te întâmpinăm în paradisul nostru izolat.'
      },
      {
        id: 'back-to-desktop',
        name: 'Înapoi la Desktop',
        type: 'door',
        x: 10,
        y: 85,
        width: 12,
        height: 10,
        description: 'Întoarce-te la desktop.',
        leadsTo: 'computerDesktop'
      }
    ]
  },
  filesFolder: {
    id: 'filesFolder',
    name: 'Folder Fișiere',
    backgroundImage: '/images/files.png',
    description: 'Un folder care conține diverse fișiere. Unele ar putea conține informații importante.',
    clickableItems: [
      {
        id: 'run-executable',
        name: 'DocumentImportant.txt',
        type: 'item',
        x: 50,
        y: 65,
        width: 40,
        height: 10,
        description: '<span style="color: #FF0000; font-weight: bold; font-size: 18px;">⚠️ AVERTISMENT DE SIGURANȚĂ ⚠️</span><br/><br/><span style="color: #FF0000; font-weight: bold; font-size: 16px;">Acest fișier poate fi periculos!</span><br/><br/>Chiar dacă arată ca un fișier text (.txt), acesta este de fapt un program descărcat de pe internet. Rularea unor astfel de programe poate:<br/><br/><ul style="color: #FF0000; font-weight: bold;"><li>Pune programe rele pe computerul tău</li><li>Fura informațiile tale personale</li><li>Permite străinilor să controleze computerul tău</li><li>Bloca fișierele tale și cere bani pentru a le debloca</li><li>Afecta și alte dispozitive din casa ta</li></ul><br/><span style="color: #FF0000; font-weight: bold; font-size: 16px;">Sfaturi de Siguranță:</span><br/><ul style="font-weight: bold;"><li>Nu deschide niciodată fișiere de la persoane necunoscute</li><li>Verifică întotdeauna dacă fișierul este sigur înainte de a-l deschide</li><li>Nu te lăsa păcălit de numele fișierelor - pot fi înșelătoare</li><li>Folosește un program antivirus pentru a verifica fișierele descărcate</li><li>Spune unui adult dacă primești fișiere suspecte</li></ul>'
      },
      {
        id: 'back-to-desktop',
        name: 'Înapoi la Desktop',
        type: 'door',
        x: 10,
        y: 80,
        width: 15,
        height: 15,
        description: 'Întoarce-te la desktop.',
        leadsTo: 'computerDesktop'
      }
    ]
  },
  browser: {
    id: 'browser',
    name: 'Browser Web',
    backgroundImage: '/browser.jpg',
    description: 'Istoricul browserului web arată căutări multiple pentru "Fiji" și "cum să dispari".',
    clickableItems: [
      {
        id: 'fiji-search',
        name: 'Căutare Fiji',
        type: 'item',
        x: 50,
        y: 25,
        width: 40,
        height: 10,
        description: 'Rezultate pentru căutarea "Resorturi din Fiji fără extrădare".'
      },
      {
        id: 'map-location',
        name: 'Locație pe Hartă',
        type: 'item',
        x: 50,
        y: 45,
        width: 40,
        height: 10,
        description: 'O hartă arătând o locație specifică în Fiji: "Paradise Cove Resort".'
      },
      {
        id: 'back-to-desktop',
        name: 'Înapoi la Desktop',
        type: 'door',
        x: 10,
        y: 80,
        width: 15,
        height: 15,
        description: 'Întoarce-te la desktop.',
        leadsTo: 'computerDesktop'
      }
    ]
  }
};

// Inventory Items
export const inventoryItems = {
  'calendar': {
    id: 'calendar',
    name: 'Calendar',
    description: 'Un calendar cu data nașterii 15 iulie 2000 încercuită cu roșu.',
    isClue: true
  },
  'crumpled-paper': {
    id: 'crumpled-paper',
    name: 'Hârtie Mototolită',
    description: 'O hârtie mototolită cu "Paradise Cove Resort" scris pe ea.',
    isClue: true
  },
  'security-book': {
    id: 'security-book',
    name: 'Carte de Securitate',
    description: 'O carte intitulată "Securitatea Parolelor". Un capitol marcat cu semn de carte spune: "Greșelile comune pentru parole slabe includ folosirea anilor de naștere combinați cu numele animalelor de companie (ca 2000Cat), modele simple (0000, 1234), sau cuvântul \'password\'. O parolă puternică ar trebui să includă litere mari, numere și simboluri ca jH7$p2Kx!9. Din păcate, utilizatorii preferă adesea combinații memorabile legate de informațiile lor personale."',
    isClue: true
  },
  'id-card': {
    id: 'id-card',
    name: 'Card de Identificare Companie',
    description: 'Un card de identificare a angajaților aparținând lui Alex Johnson. Cardul arată o fotografie, numele său, ID-ul de angajat (AJ-20072), departamentul (Securitate IT) și data emiterii (01/02/2020).',
    isClue: true
  }
};

// Computer Screens
export const computerScreens: Record<string, ComputerScreen> = {
  login: {
    id: 'login',
    type: 'login',
    content: {
      message: 'Introduceți parola pentru a accesa computerul.',
      hint: 'Indiciu: Verifică prin birou pentru indicii despre parolă.'
    },
    passwordProtected: true,
    password: '2000cat'
  },
  desktop: {
    id: 'desktop',
    type: 'desktop',
    content: {
      icons: [
        { name: 'Email', leadsTo: 'email' },
        { name: 'Fișiere', leadsTo: 'files' },
        { name: 'Browser', leadsTo: 'browser' }
      ]
    }
  },
  email: {
    id: 'email',
    type: 'email',
    content: {
      emails: [
        {
          subject: 'Confirmare Zbor',
          from: 'rezervari@calatorii.com',
          content: 'Zborul tău către Fiji este confirmat pentru mâine la ora 10:00 AM. Paradise Cove Resort te așteaptă.'
        },
        {
          subject: 'URGENT: Alertă de Securitate - Acțiune Necesară',
          from: 'alerta-securitate@sisteme-companie.net',
          content: 'Sistemele noastre au detectat încercări de acces neautorizat la contul tău. Te rugăm să faci click pe butonul de mai jos imediat pentru a-ți verifica identitatea și a-ți securiza contul:'
        }
      ]
    }
  },
  files: {
    id: 'files',
    type: 'files',
    content: {
      files: [
        {
          name: 'Secrete Companie.pdf',
          content: 'Conține date furate ale companiei care dovedesc că colegul tău este hoțul.',
          passwordProtected: true
        },
        {
          name: 'Personal.txt',
          content: 'Pisica mea Whiskers este cel mai bun lucru care mi s-a întâmplat de când am primit-o în 2000.'
        }
      ]
    }
  },
  browser: {
    id: 'browser',
    type: 'browser',
    content: {
      history: [
        { url: 'harti.com/fiji/paradise-cove-resort', title: 'Paradise Cove Resort - Hărți' },
        { url: 'cautare.com/rezultate?q=țări+fără+extrădare', title: 'Căutare: țări fără extrădare' },
        { url: 'zboruri.com/rezerva/spre/fiji', title: 'Rezervă Zboruri spre Fiji' }
      ]
    }
  }
};

// Game password solutions
export const passwords = {
  computerLogin: '2000cat', // Combination of birth year and pet
  secretFile: 'paradise2000'
};

// Clues for the game
export const clues = [
  {
    id: 'birthdate',
    text: 'Colegul s-a născut pe 15 iulie 2000.',
    foundIn: ['sticky-note', 'calendar']
  },
  {
    id: 'password-pattern',
    text: 'Colegul folosește o combinație între anul nașterii și lucrurile preferate pentru parole.',
    foundIn: ['security-book']
  },
  {
    id: 'phishing-awareness',
    text: 'Ai descoperit un email înșelător! Oamenii răi folosesc emailuri care par urgente pentru a te păcăli să le dai informațiile tale personale.',
    foundIn: ['phishing-warning']
  },
  {
    id: 'executable-warning',
    text: 'Ai descoperit un fișier periculos ascuns ca un document text. Numele fișierelor pot fi înșelătoare, așa că nu deschide niciodată fișiere de la persoane necunoscute.',
    foundIn: ['run-executable']
  },
  {
    id: 'scam-awareness',
    text: 'Ai făcut alegerea corectă! Fii atent la reclamele care îți spun că ai câștigat ceva ce nu există încă sau la care nu ai participat.',
    foundIn: ['report-scam']
  },
  {
    id: 'destination',
    text: 'Colegul planifică să fugă în Fiji, mai precis la Paradise Cove Resort.',
    foundIn: ['suspicious-email', 'fiji-search', 'map-location', 'crumpled-paper']
  },
  {
    id: 'computer-login',
    text: 'Ai obținut cu succes acces la computerul colegului folosind parola "2000cat".',
    foundIn: ['computer-login']
  },
  {
    id: 'identity',
    text: 'Numele colegului tău este Alex Johnson. Lucrează în departamentul de Securitate IT.',
    foundIn: ['id-card']
  },
  {
    id: 'calculator-login',
    text: 'Ai accesat computerul prin calculatorul ascuns folosind parola "Alex_20".',
    foundIn: ['calculator']
  }
]; 
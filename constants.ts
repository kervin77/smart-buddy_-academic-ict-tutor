import { Unit, QuizQuestion } from './types';

export const CURRICULUM: Unit[] = [
  {
    id: 1,
    title: "Digital Devices",
    topic: "Hardware & Systems",
    lessons: ["Mainframes & Supercomputers", "PCs & Mobile Devices", "Input/Output Peripherals", "Storage Media (Magnetic/Optical/SSD)"],
    mastered: false,
    color: "bg-brand-blue",
    icon: "monitor",
    glossary: [
      { term: "CPU", definition: "Central Processing Unit. The primary component that executes instructions and manages data flow." },
      { term: "Embedded System", definition: "A computer system with a dedicated function within a larger mechanical or electrical system." },
      { term: "Peripheral", definition: "An auxiliary device used to put information into and get information out of the computer." },
      { term: "RAM", definition: "Random Access Memory. Volatile memory used to store data currently in use by the CPU." },
      { term: "SSD", definition: "Solid State Drive. Storage device that uses integrated circuit assemblies as memory to store data persistently." }
    ]
  },
  {
    id: 2,
    title: "Connectivity",
    topic: "Networks",
    lessons: ["LAN vs WAN", "Network Topologies", "Protocols (TCP/IP, HTTP)", "Transmission Media"],
    mastered: false,
    color: "bg-brand-purple",
    icon: "wifi",
    glossary: [
      { term: "Bandwidth", definition: "The maximum rate of data transfer across a given path." },
      { term: "Latency", definition: "The delay before a transfer of data begins following an instruction for its transfer." },
      { term: "Protocol", definition: "A set of rules governing the exchange or transmission of data between devices." },
      { term: "Router", definition: "A networking device that forwards data packets between computer networks." },
      { term: "Encryption", definition: "The process of converting information or data into a code, especially to prevent unauthorized access." }
    ]
  },
  {
    id: 3,
    title: "Operating Online",
    topic: "Cybersecurity",
    lessons: ["Malware Types", "Social Engineering", "Data Protection Legislation", "Digital Footprint"],
    mastered: false,
    color: "bg-brand-green",
    icon: "shield",
    glossary: [
      { term: "Phishing", definition: "The fraudulent practice of sending emails purporting to be from reputable companies to induce individuals to reveal personal information." },
      { term: "Malware", definition: "Software that is specifically designed to disrupt, damage, or gain unauthorized access to a computer system." },
      { term: "Firewall", definition: "A network security system that monitors and controls incoming and outgoing network traffic." },
      { term: "Authentication", definition: "The process of verifying the identity of a user or process." },
      { term: "Plagiarism", definition: "The practice of taking someone else's work or ideas and passing them off as one's own." }
    ]
  },
  {
    id: 4,
    title: "Online Services",
    topic: "The Cloud & Web",
    lessons: ["Cloud Computing (SaaS/IaaS)", "E-commerce Models", "Collaborative Working", "Impact of Internet"],
    mastered: false,
    color: "bg-brand-red",
    icon: "shopping-bag",
    glossary: [
      { term: "Cloud Computing", definition: "The delivery of different services through the Internet, including data storage, servers, databases, networking, and software." },
      { term: "Ubiquitous Computing", definition: "A concept in software engineering and computer science where computing is made to appear anytime and everywhere." },
      { term: "Streaming", definition: "A method of transmitting or receiving data (especially video and audio) over a computer network as a steady, continuous flow." },
      { term: "Transactional Data", definition: "Information captured from transactions such as purchases, invoices, and payments." },
      { term: "VoIP", definition: "Voice over Internet Protocol. A technology that allows you to make voice calls using a broadband Internet connection." }
    ]
  },
  {
    id: 5,
    title: "Applying Information",
    topic: "Design & Management",
    lessons: ["Target Audience Analysis", "Design Consistency", "File Formats & Compression", "Project Management"],
    mastered: false,
    color: "bg-brand-yellow",
    icon: "pen-tool",
    glossary: [
      { term: "Master Slide", definition: "A slide that stores information about the theme and slide layouts of a presentation." },
      { term: "House Style", definition: "A set of rules meant to ensure consistency in presentation and writing across a brand or organization." },
      { term: "Compression", definition: "The process of encoding information using fewer bits than the original representation (Lossy or Lossless)." },
      { term: "Vector Graphics", definition: "Computer graphics images that are defined in terms of points on a Cartesian plane, connected by lines and curves." },
      { term: "Copyright", definition: "The exclusive legal right to reproduce, publish, sell, or distribute the matter and form of something." }
    ]
  },
  {
    id: 6,
    title: "Software Skills",
    topic: "Office & Coding",
    lessons: ["Advanced Spreadsheets", "Relational Databases", "Mail Merge", "HTML/CSS Basics"],
    mastered: false,
    color: "bg-blue-400",
    icon: "code",
    glossary: [
      { term: "Primary Key", definition: "A specific choice of a minimal set of attributes (columns) that uniquely specify a tuple (row) in a relation (table)." },
      { term: "Foreign Key", definition: "A field (or collection of fields) in one table that refers to the PRIMARY KEY in another table." },
      { term: "Absolute Reference", definition: "In spreadsheets, a cell reference that remains fixed when a formula is copied to a new location (e.g., $A$1)." },
      { term: "HTML", definition: "HyperText Markup Language. The standard markup language for documents designed to be displayed in a web browser." },
      { term: "Validation", definition: "An automatic computer check to ensure that the data entered is sensible and reasonable." }
    ]
  }
];

export const UNIT_QUIZZES: Record<number, QuizQuestion[]> = {
  1: [
    {
      id: 101,
      question: "Which component is primarily responsible for executing program instructions?",
      options: ["Hard Disk Drive (HDD)", "Central Processing Unit (CPU)", "Random Access Memory (RAM)"],
      correctAnswer: 1,
      explanation: "The CPU is the 'brain' of the computer, fetching, decoding, and executing instructions."
    },
    {
      id: 102,
      question: "Which of the following describes a characteristic of RAM?",
      options: ["Non-volatile", "Volatile", "Read-Only"],
      correctAnswer: 1,
      explanation: "RAM is volatile, meaning it loses its data when the power is turned off."
    },
    {
      id: 103,
      question: "Which device is classified as an 'Input' peripheral?",
      options: ["Monitor", "Laser Printer", "Webcam"],
      correctAnswer: 2,
      explanation: "A webcam captures visual data and sends it TO the computer system, making it an input device."
    },
    {
      id: 104,
      question: "What is the main advantage of an SSD over a traditional magnetic HDD?",
      options: ["Lower cost per GB", "Faster data access speeds", "Ideally suited for archival storage"],
      correctAnswer: 1,
      explanation: "SSDs use flash memory and have no moving parts, resulting in significantly faster read/write speeds than HDDs."
    }
  ],
  2: [
    {
      id: 201,
      question: "What is the primary function of a Router in a network?",
      options: ["To detect malware", "To forward data packets between different networks", "To store web pages"],
      correctAnswer: 1,
      explanation: "A router connects multiple networks (like a LAN and the WAN/Internet) and directs traffic between them."
    },
    {
      id: 202,
      question: "Which protocol ensures secure communication over a computer network?",
      options: ["HTTP", "FTP", "HTTPS"],
      correctAnswer: 2,
      explanation: "HTTPS (Hypertext Transfer Protocol Secure) uses encryption (TLS/SSL) to secure data transmission."
    },
    {
      id: 203,
      question: "What distinguishes a Wide Area Network (WAN) from a Local Area Network (LAN)?",
      options: ["WANs use wireless only", "WANs cover a large geographical area", "WANs are faster"],
      correctAnswer: 1,
      explanation: "WANs span large distances (cities, countries), whereas LANs are confined to a single site."
    }
  ],
  3: [
    {
      id: 301,
      question: "What is 'Phishing' in the context of cybersecurity?",
      options: ["A virus that deletes files", "Social engineering to deceive users into revealing sensitive info", "Intercepting Wi-Fi signals"],
      correctAnswer: 1,
      explanation: "Phishing involves fraudulent communications that appear to come from a reputable source."
    },
    {
      id: 302,
      question: "What is the function of a Firewall?",
      options: ["To cool down the CPU", "To monitor and block unauthorized network traffic", "To backup data automatically"],
      correctAnswer: 1,
      explanation: "A firewall acts as a barrier between a trusted internal network and untrusted external networks."
    },
    {
      id: 303,
      question: "Which legislation in the UK controls how personal information is used by organizations?",
      options: ["Computer Misuse Act", "Data Protection Act / GDPR", "Copyright, Designs and Patents Act"],
      correctAnswer: 1,
      explanation: "The Data Protection Act (and GDPR) sets out strict rules for handling personal data."
    }
  ],
  4: [
    {
      id: 401,
      question: "What is a key benefit of Cloud Computing (SaaS)?",
      options: ["Accessibility from any device with internet", "Requires no internet connection", "Total control over physical hardware"],
      correctAnswer: 0,
      explanation: "Cloud services are hosted remotely, allowing users to access data and apps from anywhere."
    },
    {
      id: 402,
      question: "Which term refers to the trail of data you leave behind while using the internet?",
      options: ["Digital Footprint", "Cache", "Cookie Crumb"],
      correctAnswer: 0,
      explanation: "Your digital footprint includes visited websites, emails, and information submitted to online services."
    },
    {
      id: 403,
      question: "In E-commerce, what does B2C stand for?",
      options: ["Business to Computer", "Business to Consumer", "Buyer to Carrier"],
      correctAnswer: 1,
      explanation: "B2C refers to transactions conducted directly between a company and consumers."
    }
  ],
  5: [
    {
      id: 501,
      question: "Why is a 'Master Slide' used in presentation software?",
      options: ["To make the file smaller", "To ensure consistent formatting across all slides", "To auto-correct spelling"],
      correctAnswer: 1,
      explanation: "Master slides define the layout, fonts, and colors for the entire presentation to maintain a House Style."
    },
    {
      id: 502,
      question: "Which file format is an example of 'Lossy' compression?",
      options: ["RAW", "JPEG", "PNG"],
      correctAnswer: 1,
      explanation: "JPEG uses lossy compression, which reduces file size by permanently eliminating some audio/video information."
    },
    {
      id: 503,
      question: "When analyzing a Target Audience, which factor is LEAST relevant?",
      options: ["Age range", "Technical ability", "The designer's favorite color"],
      correctAnswer: 2,
      explanation: "Design must focus on the user's needs (Age, Accessibility, Interests), not the designer's personal preference."
    }
  ],
  6: [
    {
      id: 601,
      question: "In a relational database, what is a Primary Key?",
      options: ["The first field in a table", "A unique identifier for each record", "A password to open the file"],
      correctAnswer: 1,
      explanation: "A Primary Key uniquely identifies each record (row) in a database table, ensuring no duplicates."
    },
    {
      id: 602,
      question: "What is the purpose of an 'Absolute Cell Reference' ($A$1) in a spreadsheet?",
      options: ["To make the value negative", "To keep the reference fixed when copying formulas", "To round the number up"],
      correctAnswer: 1,
      explanation: "The dollar signs ($) lock the row and/or column so it doesn't change relative to the new position."
    },
    {
      id: 603,
      question: "What is the purpose of 'Validation' in data entry?",
      options: ["To encrypt the data", "To ensure data is reasonable and sensible", "To backup the data"],
      correctAnswer: 1,
      explanation: "Validation rules (like range checks) prevent invalid data from being entered into a system."
    }
  ]
};

// Backwards compatibility for the initial demo code if needed
export const UNIT_1_QUIZ = UNIT_QUIZZES[1];
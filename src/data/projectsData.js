import betYouCantImg from "../assets/images/bet-you-cant-preview.png";
import paragraphPlaygroundImg from "../assets/images/paragraph-playground-preview.png";
import portfolioV1Img from "../assets/images/portfolio-preview.png";
import recallifyImg from "../assets/images/recallify-preview.png";

export const projects = [
  {
    id: "recallify",
    title: "Recallify",
    description:
      "A quiz study app — paste quiz text from ChatGPT, and Recallify turns it into an interactive flashcard deck with timers, scoring & review. No sign-up needed. Just paste and study.",
    tech: ["React", "CSS", "JavaScript", "LocalStorage"],
    link: "https://recallify-three.vercel.app/",
    image: recallifyImg,
    featured: true,
    docs: {
      overview:
        "Recallify is a lightweight, browser-based study tool. Generate a quiz with ChatGPT, paste it in, and Recallify parses it into an interactive flashcard deck — complete with timers, scoring, shuffle, and review.",
      features: [
        "Paste-and-play: just paste quiz text from any AI",
        "Auto-parses questions, choices, and answers",
        "Timer-based study sessions with countdown",
        "Score tracking and review mode",
        "Up to 5 decks with local storage persistence",
        "Shuffle-on-play for randomized review",
        "30-day auto-archive for old decks",
        "Fully responsive, hand-drawn aesthetic",
      ],
      howToUse: [
        "Ask ChatGPT to generate a quiz on any topic",
        "Copy the quiz text and paste it into Recallify",
        "Click 'Create Deck' — your flashcards are ready",
        "Hit play to start a timed study session",
        "Review your score and retry as needed",
      ],
      stack:
        "Built with React and vanilla CSS. No backend — everything runs in the browser with localStorage for deck persistence. GSAP handles animations. Hand-drawn UI with Fredoka and Nunito fonts.",
    },
  },
  {
    id: "bet-you-cant",
    title: "Bet You Can't",
    description:
      "A dare-based challenge web app — pick a challenge, compete with friends, and see who pulls off the impossible. CHALLENGE · DARE · WIN",
    tech: ["React", "CSS", "JavaScript"],
    link: "https://bet-you-cant.vercel.app/",
    image: betYouCantImg,
    featured: true,
    docs: {
      overview:
        "Bet You Can't is a casual browser-based challenge app built for laughs and friendly competition. Each visit gives you a fresh, randomly selected challenge to attempt.",
      features: [
        "Random challenge generator with 50+ built-in challenges",
        "Timer-based challenges with live countdown",
        "Win/lose tracker stored in the browser",
        "Share challenges directly with friends via link",
        "Simple, no-login required — just open and play",
      ],
      howToUse: [
        "Click 'Give me a challenge' to receive a random task",
        "Read the challenge carefully — some are trickier than they look",
        "Hit 'Start' when you're ready — the timer begins",
        "Complete the challenge before time runs out",
        "Tap 'I did it!' or 'I failed 😭' to log your result",
      ],
      stack: "Built with plain React and CSS, no backend or database needed. State is managed locally via useState, and results persist in localStorage so your streak survives a refresh.",
    },
  },
  {
    id: "paragraph-playground",
    title: "Paragraph Playground",
    description:
      "A fun and interactive webpage where your words don't just sit still — they get sucked away! Write your own paragraph, and as you move your mouse around the screen, a playful vacuum effect follows your cursor, gradually pulling the text into oblivion. A minimalist experiment blending creativity with interactivity.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://fanciful-monstera-32ba5d.netlify.app/",
    image: paragraphPlaygroundImg,
  },
];

export const archivedProjects = [
  {
    id: "tsarls-portfolio-v1",
    title: "Tsarls Portfolio v1",
    description:
      "My very first portfolio site. A simpler, static HTML/CSS page where I first tried to put myself online. Looking back it's a little rough, but it was the start of everything.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "",
    year: "2024",
    image: portfolioV1Img,
  },
];

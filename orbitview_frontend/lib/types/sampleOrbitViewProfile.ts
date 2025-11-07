import { OrbitViewProfile } from "./types";
import { defaultPrivacySettings } from "./defaults";

import tommy from "/tommy.png";
import leetops from "/leetops.avif";
import huvtspAlumni from "/huvtsp_search.avif";
import medport from "/medport.avif";
import clearsmile from "/clearsmile.avif";
import omniwave from "/omniwave.avif";
import planebrain from "/planebrain.avif";
import ssn from "/ssn.avif";
import desync from "/desync.avif";
import EarlHaigScienceSociety from "/EarlHaigScienceSociety.avif";
import azure_partners from "/azure_partners.avif";
import personalweb from "/personalweb.avif";

export const TomZhang: OrbitViewProfile = {
  first_name: "Tom",
  last_name: "Zhang",
  profile_picture: {
    image: tommy,
    url: "/orbitview/profile_pics/mightytmz/tommy.png",
    alt: "Tom Zhang",
  },
  username: "MightyTMZ",
  metadata: {
    created_at: "string",
    updated_at: "string",
    is_public: false,
    profile_completion: 90, // 0-100%
  },
  byline:
    "Full-Stack Software Engineer & Hardware Developer | prev @ Rove (YC W24) & Harvard",
  aboutlines: [
    "ENTJ",
    "World-Class Engineer",
    "First-principles Polymath",
    "Phd-trained Computer Scientist",
    "Phd-trained Computer Engineer",
    "Phd-trained Electrical Engineer",
  ],
  about: `Hello, I'm Tom Zhang. I'm passionate about technology and building innovative solutions to solve real-world problems.
    With a deep interest in software engineering, full stack development, AI, electrical engineering and entrepreneurship, I 
    have embarked on a journey to explore industries through tech. As an ENTJ, I thrive on strategic thinking, leadership, 
    and pushing ambitious ideas forward. I believe in continuous learning and pushing boundaries to make an impact on the world.`,
  nicknames: [
    "aTOM",
    "aTOMIC",
    "TΩ (T'Ohm'm)",
    "TOML",
    "auTOMate",
    "Tom Zhanergy ⚡",
    "phoTOMetry",
    "phanTOM 👻",
    "BotTOM-up ⬆️⬇️",
    "quanTOM",
  ],
  skills: "typescript, python, javascript, java, software engineering",
  works: [
    {
      title: "LeetOps: The New Currency of Engineering Credibility",
      description: `LeetOps is the standardized benchmark for on-call engineering reliability. Practice real-world incident response scenarios at top tech companies or rising startups to prove your on-call response skills and reliability.

Think of it as "LeetCode for incident response", but instead of solving algorithmic puzzles, engineers handle realistic production incidents across dozens of major tech companies and rising startups. Each user has a "LeetOps ELO" which is a benchmark they can use to prove their on-call reliability as well as for companies to leverage when comparing candidates.

Top 20 (Honorable Mention) project 🏅 @ Hack the North 2025`,
      cover_image: {
        image: leetops,
        url: "/orbitview/cover_images/mightytmz/leetops.png",
        alt: "LeetOps",
      },
      links: [
        {
          title: "GitHub repository",
          link: "https://github.com/MightyTMZ/leetops",
        },
        {
          title: "Devpost repository",
          link: "https://devpost.com/software/fsdfs",
        },
      ],
      status: "completed",
      start_date: "2025-09-12",
      end_date: "2025-09-14",
      tags: ["hackathon", "Hack the North", "Y Combinator"],
      impact: "Top 20 project at Hack the North 2025",
    },
    {
      title: "HUVTSP (student-led) Alumni Search Engine",
      description: `Empowered 300+ HUVTSP (Harvard Undergraduate Ventures TECH Summer Program) to connect with each other and ventures through a search engine.

Implemented secure password protection to ensure exclusive access to verified HUVTSP alumni.

It has smart search (using natural language to find alumni based on skills, interest, and project needs), filter search for alumni (browsing and filtering alumni by region, session, pod, or internship), location-based searching (finding alumni based on their location), smart project/venture search (finding projects and collaboration opportunities using natural language), and filter search for projects/ventures (browsing and filtering projects based on type, stage and other criteria).

Improved performance by an average of 41% through strategic caching.

Reached nearly 600 users, over 3500 impressions, and over 5000 searches as of August 2025.`,
      cover_image: {
        image: huvtspAlumni,
        url: "/orbitview/cover_images/mightytmz/huvtspAlumni.png",
        alt: "HUVTSP (student-led) Alumni Search Engine",
      },
      links: [
        {
          title: "GitHub repository",
          link: "https://github.com/MightyTMZ/huvtsp-linked",
        },
        {
          title: "Live website",
          link: "https://cracked-students.vercel.app/",
        },
      ],
      status: "completed",
      start_date: "2025-07-29",
      end_date: "2025-08-10",
      tags: ["alumni network", "semantic search"],
    },
    {
      title: "World Color Discovery",
      description:
        "A global clicking game where players collectively discover all 16,777,216 unique colors—one click at a time. Built to handle massive concurrent traffic with an optimized backend capable of processing tens of thousands of requests per minute. Over 333,000 colors have been discovered as of August 2025.",
      cover_image: null,
      links: [
        { title: "Live Site", link: "https://www.thecolorproject.world/" },
        {
          title: "GitHub (frontend)",
          link: "https://github.com/MightyTMZ/thecolorproject.world/",
        },
        {
          title: "GitHub (backend)",
          link: "https://github.com/MightyTMZ/thecolorproject.world-backend/",
        },
      ],
      status: "completed",
      start_date: "2025-05-01",
      end_date: "2025-07-01",
      tags: ["Web App", "Global Project", "Game", "Crowdsourcing"],
      impact: "333,000+ colors discovered globally",
      tech_stack: [
        "TypeScript",
        "React",
        "Node.js",
        "Express",
        "Redis",
        "PostgreSQL",
        "AWS",
      ],
    },
    
  ],
  accomplishments: [
    {
      title: "Meta Back-End Developer",
      description:
        "Introduction to Back-End Development; Programming in Python; Introduction to Databases for Back-End Development; Django Web Framework; APIs; The Full Stack; Back-End Developer Capstone",
      date: "2024-06-27",
      type: "certification",
      link: "https://www.coursera.org/account/accomplishments/specialization/L54BNPRXXHHR",
    },
    {
      title: "Python for Data Science, AI, & Development",
      description: "Python for Data Science, AI, & Development",
      date: "2024-09-05",
      type: "certification",
      link: "https://www.coursera.org/account/accomplishments/verify/QHGTC3EHAQYL",
    },
    {
      title: "Generative AI: Prompt Engineering Basics",
      description: "Generative AI: Prompt Engineering Basics",
      date: "2024-09-05",
      type: "certification",
      link: "https://www.coursera.org/account/accomplishments/verify/1874MYYDKNE8",
    },
  ],
  looking_for: {
    opportunities: ["Internship", "Collaborators"],
  },
  social_links: [
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/tom-zhang-485341274/",
    },
    {
      platform: "github",
      url: "https://github.com/MightyTMZ",
      username: "MightyTMZ",
    },
    {
      platform: "twitter",
      url: "https://x.com/OrbitTommyZ",
      username: "OrbitTommyZ",
    },
    {
      platform: "website",
      url: "https://www.tomzhang.info/",
    },
  ],
  analytics: {
    total_views: 2424687,
    total_conversations: 3247,
  },
  privacy: defaultPrivacySettings,
};

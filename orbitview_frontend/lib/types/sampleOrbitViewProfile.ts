import { OrbitViewProfile } from "./types";
import { defaultPrivacySettings } from "./defaults";

import tommy from "@/public/tommy.png";
import leetops from "@/public/leetops.avif";
import huvtspAlumni from "@/public/huvtsp_search.avif";
import colorproject from "@/public/thecolorproject.avif";
import medport from "@/public/medport.avif";
import clearsmile from "@/public/clearsmile.avif";
import omniwave from "@/public/omniwave.avif";
import planebrain from "@/public/planebrain.avif";
import ssn from "@/public/ssn.avif";
import desync from "@/public/desync.avif";
import EarlHaigScienceSociety from "@/public/EarlHaigScienceSociety.avif";
import azure_partners from "@/public/azure_partners.avif";
import personalweb from "@/public/personalweb.avif";

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
      title: "The Color Project (World)",
      description:
        "A global clicking game where players collectively discover all 16,777,216 unique colors—one click at a time. Built to handle massive concurrent traffic with an optimized backend capable of processing tens of thousands of requests per minute. Over 333,000 colors have been discovered as of August 2025.",
      cover_image: {
        image: colorproject,
        url: "url",
        alt: "The Color Project",
      },
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
      impact: "333,000+ colors discovered globally. Number 1 ranked on Google",
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
    {
      title: "ClearSmile AI",
      description:
        "A computer vision system that automatically detects and removes dental braces from images using Mask R-CNN. Created to solve a personal problem of braces affecting photo confidence, demonstrating the power of AI to improve self-image and aesthetics.",
      cover_image: {
        image: clearsmile,
        url: "image_url",
        alt: "ClearSmile AI",
      },
      links: [
        {
          title: "GitHub Repository",
          link: "https://github.com/MightyTMZ/clearsmile-ai",
        },
      ],
      status: "completed",
      start_date: "2024-07-29",
      end_date: "2024-08-03",
      tags: ["AI/ML", "Computer Vision", "Deep Learning"],
      impact:
        "Developed for personal use; inspired others facing similar insecurities",
      tech_stack: ["Python", "PyTorch", "Mask R-CNN", "OpenCV", "FastAPI"],
    },
    {
      title: "Omniwave",
      description:
        "A comprehensive speech-planning platform designed for debaters, Model UN delegates, and public speakers. Built from first-hand experience competing at provincial and national MUN conferences, Omniwave helps users plan speeches, organize segments like humor or pauses, and practice delivery in an intuitive, structured interface.",
      cover_image: {
        image: omniwave,
        url: "url",
        alt: "Omniwave Nexus",
      },
      links: [
        { title: "Live Site", link: "https://omniwave-nexus.vercel.app/" },
        {
          title: "GitHub Repository",
          link: "https://github.com/MightyTMZ/omniwave_nexus",
        },
      ],
      status: "completed",
      start_date: "2025-08-10",
      end_date: "2025-08-13",
      tags: ["Web App", "Education", "Speech Tech"],
      impact:
        "Used by 100+ delegates across Canada; improved speech planning efficiency",
      tech_stack: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
    },
    {
      title: "PlaneBrain",
      description:
        "An aviation and space-themed quiz platform built for my brother and aspiring explorers. Features fun, fast-paced quizzes with curated questions, progress tracking, and structured data for educational reinforcement. Focused on interactivity, knowledge building, and family passion for flight.",
      cover_image: {
        image: planebrain,
        url: "url",
        alt: "PlaneBrain",
      },
      links: [
        {
          title: "GitHub Repository",
          link: "https://github.com/yourusername/planebrain",
        },
      ],
      status: "completed",
      start_date: "2025-08-17",
      end_date: "2024-08-22",
      tags: ["Education", "Web App", "Aviation", "Space"],
      impact:
        "Helped aviation enthusiasts learn faster through interactive quizzes",
      tech_stack: ["Next.js", "TypeScript", "AWS S3", "React", "Node.js"],
    },
    {
      title: "DeSync",
      description:
        "A zero-interest lending protocol built on Scroll that unlocks lucrative yield for lenders while allowing borrowers to borrow at 0% interest. It achieves a scalable, crypto-native solution through delta-hedging BTC, ETH, and USDC spot assets using perpetual futures contracts — democratizing loans for all.",
      cover_image: {
        image: desync,
        url: "url",
        alt: "DeSync",
      },
      links: [
        {
          title: "Video",
          link: "https://drive.google.com/file/d/1Go4Ipu9FKrf-RKM37g1tqoAPZXLGQhaf/view",
        },
      ],
      status: "completed",
      start_date: "2025-03-01",
      end_date: "2025-03-17",
      tags: ["Blockchain", "DeFi", "Finance", "Smart Contracts"],
      impact: "Winner 🥇 (DeFi Track) @ Scroll Open 2025",
      tech_stack: ["Solidity", "Scroll", "Ethers.js", "Next.js", "TypeScript"],
    },
    {
      title: "Earl Haig Science Society",
      description:
        "Earl Haig Science Society is part of Ontario’s largest public high school, serving as the central hub for STEM labs, contests, and opportunities. As Head of Engineering, I led workshops, collaborated with staff to solve school problems, and built the official website serving 330+ members (16% of the school). Integrated event modals with Google and Outlook Calendar APIs for seamless scheduling.",
      cover_image: 
      {
        image: EarlHaigScienceSociety,
        url: "url",
        alt: "Earl Haig Science Society",
      },
      links: [
        {
          title: "Official Website",
          link: "https://earlhaigsciencesociety.com/",
        },
      ],
      status: "completed",
      start_date: "2024-12-15",
      end_date: "2024-12-25",
      tags: ["Leadership", "STEM", "Community", "Education"],
      impact:
        "330+ members served; improved STEM accessibility and communication",
      tech_stack: [
        "Next.js",
        "TypeScript",
        "Google Calendar API",
        "Outlook API",
      ],
    },
    {
      title: "Azure Partners",
      description:
        "Developed a multilingual company website supporting both English and Chinese visitors for Azure Partners. As the founding engineer, I helped the CEO present the company to major partners like ByteDance and Google, contributing to partnership and investment discussions. Built the site using Next.js with seamless internationalization and a polished, professional UI.",
      cover_image: {
        image: azure_partners,
        url: "example url",
        alt: "Azure Partners",
      },
      links: [{ title: "Live Site", link: "https://azurepartners.ai/" }],
      status: "completed",
      start_date: "2024-02-01",
      end_date: "2024-03-15",
      tags: [
        "Web Development",
        "Internationalization",
        "Business",
        "Partnerships",
      ],
      impact:
        "Helped CEO present to ByteDance and Google to secure partnerships and investments",
      tech_stack: [
        "Next.js",
        "TypeScript",
        "i18next",
        "Tailwind CSS",
        "Vercel",
      ],
    },
  ],
  accomplishments: [
    {
      title: "Meta Back-End Developer",
      issuer: "Meta",
      description:
        "Introduction to Back-End Development; Programming in Python; Introduction to Databases for Back-End Development; Django Web Framework; APIs; The Full Stack; Back-End Developer Capstone",
      date: "2024-06-27",
      type: "certification",
      link: "https://www.coursera.org/account/accomplishments/specialization/L54BNPRXXHHR",
    },
    {
      title: "Python for Data Science, AI, & Development",
      issuer: "IBM",
      description: "Python for Data Science, AI, & Development",
      date: "2024-09-05",
      type: "certification",
      link: "https://www.coursera.org/account/accomplishments/verify/QHGTC3EHAQYL",
    },
    {
      title: "Generative AI: Prompt Engineering Basics",
      issuer: "IBM",
      description: "Generative AI: Prompt Engineering Basics",
      date: "2024-09-05",
      type: "certification",
      link: "https://www.coursera.org/account/accomplishments/verify/1874MYYDKNE8",
    },
    {
      title: "Managing Social and Human Capital",
      issuer: "University of Pennsylvania",
      description: "From this course, I learned how to effectively manage people — the most valuable yet unpredictable asset in any organization. I gained insights into motivating individual performance, designing fair and effective reward systems, organizing work for high performance, and making sound management decisions. I also learned how to shape and adapt an organization’s structure to drive both business success and a healthy social environment. Overall, the course helped me build a strong foundation in people management and organizational leadership.",
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

import websolImg from "../assets/images/projects/websol-preview.png";
import voyavistaImg from "../assets/images/projects/voyavista_uk.png";
import coffeeImg from "../assets/images/projects/coffeeecommerce.png";
import taskmanagerImg from "../assets/images/projects/taskmanager.png";
import weatherImg from "../assets/images/projects/weatherapp.png";
import dashboardImg from "../assets/images/projects/dashboard.png";
import safewebImg from "../assets/images/projects/safeweb.png";
import delaCodesImg from "../assets/images/projects/delaCodes.jpg";
const projects = [
  {
    title: "WebSol — Business Landing Page",
    img: websolImg,
    description: `· React & Vite — Built and deployed a fully responsive business landing page with a clean, modern design and reusable components.
· Tailwind CSS — Created a mobile-first layout with consistent styling across desktop, tablet, and mobile devices.
· Interactive navigation — Implemented smooth section scrolling, a sticky navbar, and an animated mobile menu.
· Accessibility — Added keyboard navigation, Escape-key handling, and background scroll locking for improved usability.
· Motion for React — Integrated subtle animations and transitions to enhance the user experience.
· Git & Vercel — Managed source code with Git and GitHub and deployed the project using Vercel.`,
    tech: [
      "React",
      "Vite",
      "Tailwind CSS",
      "JavaScript (ES6+)",
      "Motion for React",
    ],
    demo: "https://landing-page-project-rose.vercel.app/",
    github: "https://github.com/delaramfarzad9/landing-page-project",
  },

  {
    title: "VoyaVista — UK Travel Application",
     img: voyavistaImg,
    status: "In Progress",
    description: `· React & Tailwind CSS — Building a responsive UK travel application with reusable components and a modern interface.
· Full-stack development — Developing the frontend with React and the backend with Node.js and Express.
· PostgreSQL — Created and populated a PostgreSQL database to manage travel destinations and experiences.
· REST API — Built API endpoints and integrated backend data into the React frontend.
· Explore features — Implemented destination search, filtering, sorting, and dynamic experience details.
· UI/UX — Designed the application from initial concept through interface design and development.`,
    tech: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST API",
    ],
    demo: "",
    github: "https://github.com/delaramfarzad9/voyavista",
  },

  {
    title: "Coffee E-commerce Website",
    img: coffeeImg,
    description: `· Next.js & Tailwind CSS — Built and deployed a fully responsive coffee e-commerce platform with a clean UI and reusable components.
· Dynamic catalog — Implemented product filtering, sorting, and best-seller logic for a smooth browsing experience.
· UX enhancements — Added scroll-position saving, click-outside interactions, auto-focused inputs, and custom validation to reduce user friction.
· Framer Motion — Integrated subtle animations and transitions to create a polished, modern feel.
· Out-of-stock flow — Designed a user-friendly "notify me" experience to handle unavailable products.
· Git & Vercel — Version-controlled the project with Git and deployed it using Vercel.`,
    tech: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "JavaScript (ES6+)",
      "Framer Motion",
      "LocalStorage",
    ],
    demo: "https://setcoffee-shop.vercel.app/",
    github: "https://github.com/delaramfarzad9/coffee-e-commerce",
  },
{
  title: "Dela Codes — Personal Developer Portfolio",
  img: delaCodesImg,
  status: "Completed",
  description: `· Next.js & React — Built and deployed a responsive personal portfolio using reusable components and modern frontend architecture.
· Tailwind CSS — Created responsive layouts with consistent styling across different screen sizes.
· Framer Motion — Added animations and interactive transitions to improve the browsing experience.
· tsParticles — Integrated animated particle effects for a more engaging visual experience.
· UI/UX Design — Designed the website's logo, visual identity, and user interface.
· Git & Vercel — Managed the project with Git and GitHub and deployed it using Vercel.`,
  tech: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "JavaScript (ES6+)",
    "Framer Motion",
    "tsParticles",
  ],
  demo: "https://dela-codes.vercel.app/",
  github: "https://github.com/delaramfarzad9/Dela.Codes",
},
  {
    title: "Task Manager App",
    img: taskmanagerImg,
    description: `· React & Vite — Created a responsive task management app with a clean, minimal UI.
· CRUD features — Implemented adding, editing, completing, deleting, and marking tasks as important.
· Smart sorting — Added sorting to keep important and active tasks easy to find.
· Dark/light mode — Built a theme toggle for improved usability.
· Local storage — Saved tasks locally for a persistent user experience.`,
    tech: [
      "React",
      "Vite",
      "Tailwind CSS",
      "JavaScript (ES6+)",
      "LocalStorage",
    ],
    demo: "https://delaramfarzad9.github.io/react-task-manager/",
    github: "https://github.com/delaramfarzad9/react-task-manager",
  },

  {
    title: "Weather App",
    img: weatherImg,
    description: `· React & Vite — Developed a responsive weather application with a clean interface.
· API integration — Fetched real-time weather data, including temperature, humidity, wind speed, and pressure.
· City search — Implemented a search feature allowing users to look up weather by location.
· Tailwind CSS — Styled the application with a responsive, consistent layout.
· JavaScript to React — Originally built in vanilla JavaScript, then rebuilt using React and reusable components.`,
    tech: [
      "React",
      "Vite",
      "Tailwind CSS",
      "JavaScript (ES6+)",
      "REST API",
    ],
    demo: "https://delaramfarzad9.github.io/weather-app/",
    github: "https://github.com/delaramfarzad9/weather-app",
  },

  {
    title: "Admin Dashboard",
    img: dashboardImg,
    description:
      "A responsive admin dashboard built with React and Tailwind CSS, featuring interactive charts, data tables, and basic user management functionality. Designed with a clean layout and reusable components for a smooth and efficient user experience.",
    tech: [
      "React",
      "Tailwind CSS",
      "Chart.js",
    ],
    demo: "",
    github: "https://github.com/delaramfarzad9/admin-dashboard",
  },

  {
    title: "SafeWeb — Cybersecurity SaaS Landing Page",
    img: safewebImg,
    status: "Completed",
    description: `· HTML5 & CSS3 — Built a responsive cybersecurity SaaS landing page without JavaScript.
· CSS Architecture — Used design tokens, CSS Grid, Flexbox, and fluid typography.
· Mobile Navigation — Implemented a CSS-only mobile menu using the checkbox hack.
· Accessibility — Added semantic HTML, keyboard navigation, and reduced-motion support.
· Performance — Optimised images with WebP and achieved 100 Lighthouse scores in Accessibility, Best Practices, and SEO.`,
    tech: [
      "HTML5",
      "CSS3",
      "Responsive Design",
      "CSS Grid",
      "Flexbox",
      "Accessibility",
      "Lighthouse",
    ],
    demo: "https://safeweb-landing-page.vercel.app/",
    github: "https://github.com/delaramfarzad9/safeweb-landing-page",
  },
  


];

export default projects;

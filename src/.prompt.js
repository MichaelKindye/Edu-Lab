// PROJECT: Frontend-only e-learning site (Vite + React + Tailwind CSS + Framer Motion). Build a clean, modern, accessible UI with smooth micro-interactions. Use component-driven architecture. The app must include exactly 3 pages (routes) and a top nav that persists across pages.

// GENERAL REQUIREMENTS
// - Tech stack: React (functional components + hooks), React Router (or use a simple file-based router if you prefer), Tailwind CSS for styling, Framer Motion for animations. Keep code modular and easy to extend.
// - Theming: two themes — dark (black → green gradient) and light (white → green gradient). Provide CSS variables / Tailwind config tokens for colors so switching themes is trivial.
// - Responsiveness: mobile-first. Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px). Ensure all pages look great on mobile and desktop.
// - Accessibility: semantic HTML, keyboard navigable, ARIA attributes for interactive widgets, focus-visible styles, skip-to-content link.
// - Data: use mock JSON data (no backend). Provide a `mock/api` folder with endpoints simulated using a small in-memory fetch wrapper or `msw`-like mock - but Copilot can start with a `data` folder exporting JSON arrays. Provide data shapes for courses, lessons, instructors, reviews.
// - Performance: lazy-load course thumbnails and videos, use skeleton loaders for network delay simulation, implement basic caching in memory (React context).
// - Animations: subtle enter/exit animations on route change, hover micro-animations for cards, button press animations, smooth scrolling to sections.
// - Tests: include at least one example unit test for a critical component (e.g., CourseCard rendering) — keep simple.

// ROUTES / PAGES (3 pages)
// 1. **/ (Courses Catalog / Home)** — shows all available courses with filters and search.
// 2. **/course/:slug (Course Detail + Lesson Player)** — course hero, syllabus, video lesson player, resources, comments.
// 3. **/dashboard (Student Dashboard)** — enrolled courses, progress bars, quick resume CTA.

// NAVIGATION
// - Top nav (persistent): Logo (left) -> Search (center on large screens) -> Links: Courses (home), Dashboard -> Right: Theme toggle, Sign In button (modal), Contact (mailto).
// - Clicking Logo or "Courses" goes to `/`.
// - Course cards link to `/course/:slug`.
// - CTA on course page "Enroll / Start Course" leads to `/dashboard` and adds the course to the mocked "enrolled" list.

// DATA SHAPES (export these JS objects)
// - Course:
//   {
//     id: "c_course-intro-react",
//     slug: "intro-to-react",
//     title: "Intro to React — Build Real Projects",
//     subtitle: "Practical React, hooks, and component design",
//     price: 49,
//     level: "Beginner",
//     lengthHours: 8.5,
//     lessons: [ { id, title, duration, videoUrl, transcriptUrl, resources:[] } ],
//     thumbnail: "/images/courses/react-thumb.jpg",
//     instructor: { id, name, avatar, bio },
//     tags: ["react","frontend","javascript"],
//     rating: 4.8,
//     reviewsCount: 124
//   }
// - Lesson:
//   {
//     id: "l_01",
//     title: "Getting started & project setup",
//     duration: "8:12",
//     videoUrl: "/video/lesson1.mp4",
//     description: "We scaffold the project, install deps, and run the first app.",
//     resources: [ {title, url} ]
//   }

// COMPONENT LIST (file suggestions)
// - src/components/
//   - Header.jsx (logo, nav links, theme toggle, search)
//   - CourseCard.jsx (thumbnail, title, meta, hover preview)
//   - CourseGrid.jsx (grid of CourseCard)
//   - FiltersPanel.jsx (category tags, level, price toggle, sort)
//   - HeroCourse.jsx (big banner used on course detail)
//   - LessonPlayer.jsx (video player, next/prev buttons, chapters list)
//   - Syllabus.jsx (collapsible section listing lessons)
//   - EnrollButton.jsx (stateful, shows enrolled / price / CTA)
//   - ProgressRing.jsx (small circular progress)
//   - DashboardCard.jsx (enrolled course preview + progress)
//   - Footer.jsx (links, contact)
//   - ModalSignIn.jsx (email sign-in mock)
//   - SkeletonCourseCard.jsx (loading state)
// - src/pages/
//   - Home.jsx
//   - CourseDetail.jsx
//   - Dashboard.jsx
// - src/context/
//   - EnrollmentContext.jsx (enrolled courses, progress, actions)
// - src/mock/
//   - courses.js (array)
//   - lessons.js
//   - images/ (placeholder images)
// - src/utils/
//   - formatDuration.js
//   - storageCache.js

// UI / LAYOUT DETAILS (exact)
// 1) HOME (/)
// - Header at top with subtle glass effect.
// - Hero strip: short headline, search input, pill CTA: "Browse Popular Courses".
// - Under hero: FiltersRow (sticky on large screens) with:
//   - Search (text)
//   - Tag chips (clickable) — show selected state
//   - Level toggle (All / Beginner / Intermediate / Advanced)
//   - Sort dropdown (Popular / Newest / Price low-high / Rating)
// - CourseGrid:
//   - Layout: 1 column on mobile, 2 on md, 3 on lg, 4 on xl.
//   - CourseCard design:
//     - Left: thumbnail (16:9) with subtle zoom-on-hover and a short hover play preview overlay.
//     - Right: title, instructor small avatar, tags, meta row (duration, level, rating), price badge (rounded pill).
//     - CTA: "View Course" button that links to `/course/:slug`.
//   - Hover state: card lifts (translate-y -4), soft shadow, thumbnail gently scales.
// - Feature strip: horizontally scrollable mini-section (full-width) with logos or stats like "30k students", "500+ hours content".
// - Pagination or infinite scroll: implement a "Load more" button at bottom (for simplicity).

// 2) COURSE DETAIL (/course/:slug)
// - Top hero (sticky on scroll):
//   - Left: large course thumbnail or subtle looping background with course title and instructor info.
//   - Right card: price tag, level, duration, enroll button (Enroll / Resume), "Preview lesson" small CTA.
//   - Microcopy: "30-day refund" or "Certificate included" small line.
// - Main content layout (two-column on md+, single-column on mobile):
//   - Left (content, 65%):
//     - LessonPlayer (top): responsive video player with keyboard shortcuts (space play/pause, left/right skip 10s).
//     - Below player: tabs: Overview | Syllabus | Reviews | Q&A
//     - Overview: course description, learning outcomes (bullet list), what you'll build (3 bullets).
//     - Reviews: show top 3 reviews with rating stars and “See all” modal.
//   - Right (sidebar, 35%):
//     - Sticky Syllabus: collapsible lessons list with lesson durations and an inline play button. Clicking a lesson jumps the player to that lesson (for the mock, swap videoUrl and update lesson active state).
//     - Resources: zip/download buttons.
//     - Instructor card with small bio and contact/email link.
// - Interactions:
//   - Clicking a lesson in syllabus updates the player to the lesson video and sets a small toast "Playing lesson X".
//   - "Next lesson" appears as a floating button on player when a lesson ends.
//   - Smooth scroll to sections when clicking tabs.
// - Enrollment logic:
//   - If not enrolled: EnrollButton opens a small modal to confirm (mock payment). On confirm, add to EnrollmentContext and redirect to /dashboard.
//   - If enrolled: button says "Resume Course" and on click scrolls to last watched lesson.
// - Accessibility:
//   - Video player has captions toggle, descriptive alt text for images, aria-current on active lesson.
//   - All interactive elements have focus outlines and aria-labels.

// 3) DASHBOARD (/dashboard)
// - Page header: "Student Dashboard" + summary cards (Total courses, Hours watched, Certificates).
// - Layout:
//   - Top: Progress overview horizontal scroll cards (each enrolled course) showing small progress ring, resume CTA.
//   - Middle: Detailed list of enrolled courses — card with progress bar, last watched lesson, quick actions: Resume, View Course, Unenroll.
//   - Bottom: Recommended for you (uses tags from enrolled courses).
// - Quick resume:
//   - Resume opens an inline modal mini-player or navigates to `/course/:slug` and auto-scrolls to lesson player.
// - State:
//   - Progress is stored in EnrollmentContext and persisted to localStorage.

// INTEGRATIONS & UX DETAILS
// - Mock API delay: 400–900ms to simulate network; show skeletons.
// - Analytics events: fire console.log events for `course_view`, `enroll`, `lesson_start`, `lesson_complete`.
// - Deep linking: URL `?lesson=03` should auto-open the specified lesson.
// - Keyboard/ARIA:
//   - Tab order: header -> search -> course grid -> footer.
//   - Ensure modal traps focus; pressing Esc closes modal.
// - Error handling:
//   - If video fails to load, show fallback poster and a "Retry" button.
//   - If mock enroll fails (simulate 5% chance), show error toast.

// STYLING / DESIGN TOKENS
// - Colors:
//   - darkBg: #0b0b0b
//   - darkAccent: #064e3b (emerald dark)
//   - lightBg: #ffffff
//   - lightAccent: #10b981 (emerald)
//   - muted: #9ca3af
//   - cardBgDark: #0f1724
// - Typography:
//   - Headline: Inter / Poppins, weight 700
//   - Body: Inter, weight 400
// - Spacing & radius:
//   - base spacing 8px, border-radius rounded-xl for cards, rounded-full for CTAs
// - Shadows: soft, multi-layered; subtle on hover.

// COPY / MICROCOPY
// - Hero CTA text: "Browse Popular Courses"
// - Card CTA: "View Course" / "Enroll — $49"
// - Enroll CTA: "Enroll now — Start today"
// - Empty states: "You haven't enrolled in any courses yet — Browse courses"

// DELIVERABLES FROM COPILOT
// - Create all components listed above with clear prop types and JSDoc comments.
// - Provide a `README.md` explaining how to run locally (`npm install`, `npm run dev`), and how to switch themes.
// - Export mock data files and a simple `seed` system to reset localStorage.
// - Include a short sample of unit tests with Jest + React Testing Library (e.g., CourseCard test).
// - Provide comments on which parts need real backend hooks later (e.g., enrollment API, video CDN).

// FINAL: make the UI feel premium: generous white space, clear hierarchy, rounded cards, subtle animations, and quick-loading thumbnails. Keep code readable and well-commented.
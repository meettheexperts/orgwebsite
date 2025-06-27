# Essential Christian Memory Verses App

A minimalist, offline-friendly web app for memorizing key Bible verses, exploring Bible questions and answers, learning the books of the Bible, and reading essential Bible stories.

## Features

- **Key Bible Verses:**  
  Browse, search, and favorite essential memory verses from both Old and New Testaments.

- **Bible Questions & Answers:**  
  Practice with a wide range of Bible Q&A, including doctrine, stories, parables, and key teachings.

- **Books of the Bible:**  
  Visual list of all 66 books, grouped by Old and New Testament. Includes a drag-and-drop ordering game and memory tips.

- **Bible Stories:**  
  Read concise, story-style summaries of major Bible stories, with references and sharing options.

- **Favorites:**  
  Mark any verse, question, or story as a favorite for quick review.

- **Search:**  
  Instantly filter verses, questions, or stories by keyword or reference.

- **Share & Open in Bible:**  
  Share content or open references directly in BibleGateway.

- **Minimalist Controls:**  
  Toggle between list and single-view modes, filter by content type, and access more options via the ellipsis menu.

- **Offline Support:**  
  Works offline as a Progressive Web App (PWA) with service worker caching.

- **Mobile Friendly:**  
  Responsive design for phones, tablets, and desktops.

## Getting Started

1. **Open `index.html` in your browser**  
   Or deploy the folder to any static web server.

2. **Add to Home Screen (PWA):**  
   On mobile, use "Add to Home Screen" for an app-like experience.

3. **Navigation:**  
   Use the navigation bar to switch between Verses, Questions, Books, and Stories.

## File Structure

- `index.html` — Key Bible Verses
- `bible_questions.html` — Bible Questions & Answers
- `books_of_the_bible.html` — Books of the Bible (with game)
- `bible_stories.html` — Essential Bible Stories
- `service-worker.js` — Offline/PWA support
- `manifest.json` — PWA manifest
- `bibleStories.js`, `bible_questions.js`, `more_bible_questions.js` — Data files
- `icon-192.png`, `icon-512.png` — App icons

## Customization

- **Add/Edit Verses:**  
  Edit the `verses` array in `index.html`.

- **Add/Edit Questions:**  
  Edit `bible_questions.js` or `more_bible_questions.js`.

- **Add/Edit Stories:**  
  Edit `bibleStories.js`.

- **Books of the Bible:**  
  Edit the arrays in `books_of_the_bible.html`.

## Credits

- Scripture quotations are from the Holy Bible, ESV and other public domain translations.
- UI built with [Bootstrap](https://getbootstrap.com/) and [Font Awesome](https://fontawesome.com/).
- Developed by MTE.

---

*"Thy word have I hid in mine heart, that I might not sin against thee."* — Psalm 119:11


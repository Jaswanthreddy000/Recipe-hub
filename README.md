# 🍳 RecipeHub – Ultimate Collaborative Cooking Platform

> 🧑‍🍳 GitHub for Recipes: Co-Author, Scale, Timer, and Share with Seamless Invites!

## [🌐 Live Site Vercel Link](https://recipe-hub-opal.vercel.app/) 

## [🎥 YouTube Walkthrough Video link ](https://www.youtube.com/watch?v=SOUaHbKySXQ)

---

## 🚀 Core Features

### 👥 Collaborative Recipe Builder
- **Real-time or Sync Editing**: Owners invite collaborators via email.
- Edits sync via polling or manual "Sync" button.
- **Credit System**: Original creator is always shown as the primary author.

### 📩 Invite Workflow
- **Owner**: Clicks "Invite" → Enters email.
- **Invited User**: Sees invite in **Invites tab** under "My Recipes".
  - Example: `@ChefJohn invited you to edit 'Spicy Tacos'!`
- **Actions**: Accept (moves to **Collaborations tab**) or Decline (removes invite).
- **After Acceptance**: 
  - Real-time collaboration.
  - Contributor badges shown to the owner.

### 🧮 Smart Ingredient Scaling
- Input fields for:
  - Quantity (e.g., `2`) + unit dropdown (`cups`, `grams`, etc.).
  - Optional alt quantity (e.g., `150g`) for better accuracy.
- **Auto-Scaling**: Change servings → all quantities update instantly.

### ⏱️ Step-by-Step Timers with Music
- Add timers (minutes/seconds) to recipe steps.
- Timer UI:
  - Start / Pause / Reset
  - Progress bar + sound alert
- **New Feature**: Optional background music during timer.
  - Music resumes from where it was paused.
  - Toggle music on/off with speaker icon.
  - Play only timer sound if preferred.

### 📸 Recipe CRUD with Images
- Create / Edit recipes with:
  - Cover image uploads (drag-and-drop or file picker).
  - Full-screen horizontal tabs: `Title`, `Description`, `Ingredients`, `Steps`.
- Public / Private toggle:
  - Private recipes editable only by owner/collaborators.
- **New Feature**: Add unique image per recipe.

### 👤 User Profiles
- **Edit Profile**:
  - Name, bio, and profile picture.
- **View Profile**:
  - My Recipes (authored)
  - Collaborations (accepted invites)

- **Login Methods**:
  - Email/Password Authentication
  - Google Sign-In (One-click login via OAuth)

- **Password Requirements**:
  - Minimum 8 characters
  - Must include:
    - At least one number (0–9)
    - At least one letter (a–z or A–Z)
    - Recommended: Use a special character for better security

- **Validation & Error Handling**:
  - ✅ Client-side and server-side validation
  - ❌ If email is missing or invalid → "Please enter a valid email address"
  - ❌ If password is too short or weak → "Password must be at least 8 characters and include both letters and numbers"
  - ❌ On login failure → "Incorrect email or password"
  - ❌ On sign-up with existing email → "Account already exists"
  - 🔁 Loading indicators during sign-in and sign-up process for smoother U

### 🧭 Intuitive Navigation
- **Home**: Featured recipes.
- **Explore**: Browse public recipes by tags (e.g., `Vegan`, `Keto`).
- **My Recipes** workspace:
  - `My Recipes` (owned)
  - `Collaborations` (accepted invites)
  - `Invites` (pending requests)

---

## 🎨 UI/UX Highlights

- **Food-Themed Design**: Appetizing colors and high-quality images.
- **Card-Based Layouts**: Visually appealing and easy to scan.
- **Horizontal Workflow**: Full-screen tabs for recipe creation—no scrolling between sections.
- **Alerts**:
  - Red badge on `Invites` tab for new invites.
  - Popup + sound alert when timer completes.

---

## 🆕 Unique Features You’ll Love

- 🎵 **Integrated Music Player with Timer**:
  - Play, pause, and resume music that enhances your cooking experience.
- 🧑‍🍳 **Multi-Unit Ingredients**:
  - Add secondary units to reduce ambiguity.  
    - _Example_: `2 cups of flour` → also specify `150g`.
- 🧑‍🤝‍🧑 **Seamless Collaboration**:
  - Invite friends via email.
  - Collaborate in real-time with contributor tracking.

---

## 📸 Preview

> _Add some screenshots or GIFs here showcasing:_
> - Collaborative editing
> - Timer + music
> - Smart scaling
> - User profile



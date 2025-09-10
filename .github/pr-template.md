## 🎯 Purpose & Context

_(The "Why?")_
A brief, one or two-sentence summary of the PR's goal. What feature or issue does this PR address? What is the overall objective?

<!-- EXAMPLE FROM PREVIOUS PR:
This pull request establishes the entire foundational infrastructure for the TXPF Portfolio application. It completes all objectives for **Phase 1** of the implementation plan, including environment setup, core dependency configuration, creation of the primary layout structure, and the implementation of a complete user authentication system. This work provides a stable and scalable base for all future feature development. -->

---

## 🔗 Related Issues

_(Connecting to the plan)_
This section directly links the work back to your `README.md` project plan. We'll use a nested list to show the hierarchy clearly.

<!-- EXAMPLE FROM PREVIOUS PR:
This PR addresses and completes the entirety of **Phase 1: Foundation Setup**, as outlined in the `README.md` project plan.

 - **Epic:** `[Phase 1]` #4
  - **Issue:** #5
    - [x] #8
    - [x] #9
    - [x] #10
    - [x] #11
    - [x] #12
  - **Issue:** #6
    - [x] #13
    - [x] #14
    - [x] #15
    - [x] #16
    - [x] #17
  - **Issue:** #7
    - [x] #18
    - [x] #19
    - [x] #20
    - [x] #21
    - [x] #22

Closes: #4
Closes: #5, #6, #7
Closes: #8, #9, #10, #11, #12, #13, #14, #15, #16, #17, #18, #19, #20, #21, #22 -->

---

## 🚀 Summary of Changes

_(The "What?")_
A high-level, bulleted list of the main changes implemented in this PR.

<!-- EXAMPLE FROM PREVIOUS PR :
- **Project Setup:** Initialized and configured core dependencies: Vue Router for navigation, Pinia for state management, and the Supabase client for backend services.
- **Core Layout:** Built the fundamental page layout components (`NavBar.vue`, `HeroSection.vue`, `FooterSection.vue`) and structured them in the root `App.vue` component.
- **Routing:** Established the initial application routes in `router/index.ts`, including lazy loading for the `AboutMeView`.
- **State Management:** Implemented two distinct Pinia stores: `uiStore` for managing global UI state (like modal visibility) and `authStore` as the single source of truth for user authentication.
- **Authentication System:**
  - Developed a reusable `useAuth` composable to encapsulate all Supabase authentication logic.
  - Built a reactive `AuthModal.vue` component for the user login flow.
  - Made the `NavBar.vue` fully reactive to the user's login status.
  - Implemented a global navigation guard to protect routes from unauthenticated access. -->

---

## 💡 Implementation Highlights

_(The "How?")_
This is the most important section for showcasing your work. We'll detail the key architectural decisions and patterns used.

<!-- EXAMPLE FROM PREVIOUS PR:
This PR introduces several key architectural patterns that define the project's structure.

### 1. Application Initialization (`main.ts` & `lib/supabase.ts`)
- The root `main.ts` file now properly initializes and registers both Pinia and Vue Router with the Vue application instance.
- The Supabase client is initialized once in `lib/supabase.ts`, reading from environment variables and exporting a singleton instance for use across the app.

### 2. Core Layout & Routing (`App.vue` & `router/index.ts`)
- `App.vue` acts as the application's root container, holding the persistent `NavBar` and `FooterSection` components, with a `<RouterView />` to render the active page.
- Initial routes (`/` and `/about-me`) are defined, with the "About Me" page demonstrating how to mark a route for protection using `meta: { requiresAuth: true }`.

### 3. The `useAuth` Composable (`composables/useAuth.ts`)
- This is the cornerstone of the authentication system, abstracting all Supabase calls (`signInWithPassword`, `signOut`, `onAuthStateChange`) away from the UI components.
- The `listenForAuthState` function is a critical piece that runs on app startup (`App.vue`), ensuring the Pinia `authStore` is always synchronized with the Supabase session, enabling persistent logins across page reloads.

### 4. Centralized State & Reactive UI
- **Pinia Stores:** The `uiStore` and `authStore` provide a clean, decoupled way to manage global state.
- **`AuthModal.vue`:** Uses the `useAuth` composable within a `try...catch` block for robust error handling.
- **`NavBar.vue`:** Subscribes to the `authStore.isUserLoggedIn` computed property and uses `v-if`/`v-else` to conditionally render the correct login/logout buttons.

### 5. Route Protection via Navigation Guard
- A global `router.beforeEach` guard is registered in `router/index.ts`. It inspects the `to.meta.requiresAuth` field on every navigation attempt. If a route requires auth and the user is not logged in, the navigation is blocked, and the user is redirected to the homepage. -->

---

## 👨‍🏫 Key Learnings & Best Practices

_(The "Showcase")_
Explicitly state the concepts you applied. This demonstrates deep understanding.

<!-- EXAMPLE FROM PREVIOUS PR:
- **State Management:** Applied the Pinia store pattern for managing both ephemeral UI state and persistent data state.
- **Separation of Concerns:** Strictly decoupled UI components from backend services. Components now invoke actions from composables rather than containing business logic themselves.
- **Composable Architecture (DRY):** Abstracted all authentication logic into the `useAuth` composable, making it reusable, testable, and easy to maintain while keeping components lean.
- **Conditional Rendering:** Leveraged `v-if`/`v-else` to build a dynamic UI that immediately reacts to changes in global state.
- **Navigation Guards:** Implemented route-level security using Vue Router's `beforeEach` guard, a fundamental pattern for applications with user permissions.
- **Asynchronous Error Handling:** Handled asynchronous API calls that can fail by using `async/await` within `try...catch` blocks for robust error management. -->

---

## 🧪 How to Test

_(Verifying the work)_
Clear, step-by-step instructions for a reviewer to test the functionality.

<!-- EXAMPLE FROM PREVIOUS PR:
1.  Pull the branch and run `pnpm install` followed by `pnpm run dev`.
2.  **Verify Basic Layout & Routing:**
    -   Confirm the page loads with the `NavBar` at the top and `FooterSection` at the bottom.
    -   The `HomeView` content should be visible.
3.  **Verify Logged Out State & Route Protection:**
    -   Confirm the "Log In" button is visible in the navbar.
    -   Attempt to navigate directly to the `/about-me` page. You should be prevented from doing so and remain on the homepage. Check the browser console for the "You are not authorized" message.
4.  **Test Login Flow:**
    -   Click the "Log In" button to open the modal.
    -   Enter incorrect credentials. Confirm an error message is logged to the console and you remain on the modal.
    -   Enter the correct user credentials. Confirm the modal closes and the navbar instantly updates to show "Log Out".
5.  **Verify Logged In State:**
    -   With the "Log Out" button visible, click the "About Me" link. Confirm you can now access the page successfully.
    -   Refresh the browser page. Confirm that you remain logged in (the "Log Out" button persists).
    -   Click the "Log Out" button. Confirm the navbar returns to the "Log In" state.
    -   Attempt to access `/about-me` again and confirm you are now blocked. -->

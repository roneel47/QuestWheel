# QuestWheel

QuestWheel is a gamified daily task selector application designed to make your daily routine more engaging and fun. Spin the wheel to get a random task, complete tasks to earn XP, and level up!

## Core Features

*   **Roulette Wheel**: A smoothly animated wheel that randomly selects one of your tasks for the day.
*   **Task Manager**: Easily add, view, and delete custom tasks.
*   **XP and Level System**: Earn Experience Points (XP) by completing tasks. Watch your XP bar fill up and level up to mark your progress.
*   **Daily Spin Logic**: Spin the wheel once per day. The app tracks your last spin to ensure fairness.
*   **Gamified UI**: A vibrant, game-inspired interface with 'Space Grotesk' font, XP bars, and engaging visual effects.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
*   **UI Library**: [React](https://reactjs.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Sound Effects**: [Tone.js](https://tonejs.github.io/) (for wheel spins and wins - *requires sound files in `public/sounds/`*)
*   **Local Storage**: Used for persisting tasks, player stats, and activity logs.

## Project Structure

```
/public
  /logo.png
  /sounds/          # (spin.mp3, win.mp3 - add these manually if you want sound)
/src
  /app
    /layout.tsx     # Main layout for all pages
    /page.tsx       # Main QuestWheel game page (/ route)
    /stats/page.tsx # Player statistics page (/stats route)
    /globals.css    # Global styles and ShadCN UI theme variables
  /components
    /layout         # Site-wide components like the header
    /questwheel     # Components specific to the QuestWheel game features
    /stats          # Components used on the statistics page
    /ui             # Reusable ShadCN UI components
  /hooks            # Custom React hooks (e.g., useLocalStorage, useToast)
  /lib              # Utility functions, constants, type definitions
next.config.ts      # Next.js configuration
package.json        # Project dependencies and scripts
tailwind.config.ts  # Tailwind CSS configuration
tsconfig.json       # TypeScript configuration
```

## Getting Started

### Prerequisites

*   Node.js (v18 or newer recommended)
*   npm or yarn (or pnpm)

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd <project-directory-name>
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```
3.  **(Optional) Add Sound Files**:
    If you want sound effects for the roulette wheel:
    *   Create a `public/sounds` directory.
    *   Add `spin.mp3` and `win.mp3` files to this `public/sounds` directory.
    If these files are not present, the app will function without sound, and non-critical warnings might appear in the browser console regarding missing audio files.

### Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```
or
```bash
yarn dev
```

Open [http://localhost:9002](http://localhost:9002) (or the port specified in your `package.json` `dev` script) in your browser to see the application.

## Building for Production

To build the application for production:

```bash
npm run build
```
or
```bash
yarn build
```

This will create an optimized production build in the `.next` folder. You can then start the production server using:

```bash
npm run start
```
or
```bash
yarn start
```

## Customization

*   **Styling**: Modify Tailwind CSS classes directly in your components or update the CSS variables in `src/app/globals.css` for theme-wide changes (colors, radius, etc.).
*   **Game Constants**: Parameters like XP awarded per task or the base XP needed for leveling up can be adjusted in `src/lib/constants.ts`.
*   **Fonts**: The 'Space Grotesk' font is currently used. This is configured in `src/app/layout.tsx` (Google Fonts import) and `tailwind.config.ts` (font family definitions).

# Plant Care Game

A fun and interactive web game built with React where you nurture a virtual plant by matching care icons. The plant grows or withers based on your actions. Test your memory and quick thinking skills as you take care of your plant!

## Key Features & Benefits

*   **Interactive Gameplay:**  Match care icons (e.g., water, sun, love) to keep your plant healthy.
*   **Score Tracking:**  Keeps track of the number of times you successfully care for the plant.
*   **Strikes System:**  If you select the wrong care icon, you get a strike. Three strikes result in a game over.
*   **Dynamic Plant Growth:**  The plant grows as you accumulate points, and shrinks with strikes.
*   **Timer:**  A countdown timer challenges you to act quickly.
*   **Responsive Design:** Uses **React** and **styled-components** to create a smooth and responsive user experience.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

*   **Node.js:**  Version 16 or higher.  Download from [nodejs.org](https://nodejs.org/).
*   **npm (Node Package Manager):**  Usually installed with Node.js.
*   **A code editor:** (e.g., VS Code, Sublime Text, Atom).

This project relies on the following dependencies:

*   **React:** A JavaScript library for building user interfaces.
*   **Styled-components:** A CSS-in-JS solution for styling React components.
*   **use-sound:** A React hook for adding sound effects to the game.
*   **React-bootstrap:** For building responsive, mobile-first UI components.
*   **html-to-image & copy-image-clipboard:** For capturing and sharing the final game result.

## Installation & Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/gabdewsnap/plant-care.git
    cd plant-care
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm start
    ```

    This will start the React development server. Open your browser and navigate to the address displayed in the console (usually `http://localhost:3000/`).

## Usage Examples & Key Components

This project is centered around several React components to manage the game's flow. Below is an overview of key components:

### `App.jsx`

The main component that handles the game logic, including score tracking, strikes, and rendering the gameplay UI.

### `Game.jsx`

Handles the core game logic, including randomizing care icons, managing plant growth, and detecting correct/incorrect answers.

### `GameOver.jsx`

Displays the player's final score after the game ends. It includes the option to share the results or restart the game.

### `Strikes.jsx`

Displays the player's current number of strikes using icons.

### `Timer.jsx`

A countdown timer that shrinks as time runs out, triggering a failed attempt if the player doesn’t act quickly enough.

### `Hint.jsx`

Shows helpful hints to the player, such as how to play and strike warnings.

## Configuration Options

The `vite.config.js` file can be configured for more advanced build settings, though for basic usage no configuration changes are required.

## Contributing Guidelines

Contributions are welcome! Here's how you can contribute:

1. **Fork the repository.**

2. **Create a new branch for your feature or bug fix:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes and commit them:**

   ```bash
   git add .
   git commit -m "Add your commit message"
   ```

4. **Push your changes to your forked repository:**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a pull request.**  Please explain your changes in detail.

Ensure code quality by using ESLint or another code-checking tool before submitting your pull request.

## License Information

This project has no license specified. All rights reserved.

## Acknowledgments

* **React** for building modern, dynamic user interfaces.
* **Styled-components** for allowing us to write CSS in JavaScript.
* **use-sound** for integrating sound effects into the game.
* **React-bootstrap** for responsive UI components that make it easier to create a mobile-friendly game.
* **html-to-image & copy-image-clipboard** for providing functionality to capture and share game results.



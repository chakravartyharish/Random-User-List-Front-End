# Random User List

This project is a React-based web application that displays a list of random users fetched from the [Random User API](https://randomuser.me/). It features a responsive design, dark/light theme toggle, multi-language support, and user detail views.

## Features

- Fetch and display random user data
- Responsive design using Material-UI
- Dark/Light theme toggle
- Multi-language support (English, Spanish, French, German)
- User details modal
- Caching of user data for improved performance
- Force refresh option to fetch new users

## Technologies Used

- React
- TypeScript
- Material-UI
- i18next for internationalization
- Axios for API requests
- React Testing Library for unit tests

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/hkchakravarty/Random-User-List.git
   ```

2. Navigate to the project directory:

   ```
   cd random-user-list
   ```

3. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server:

```
npm start
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `build` directory.

## Project Structure

- `src/`
  - `components/`: React components
  - `context/`: React context providers
  - `services/`: API services
  - `types/`: TypeScript type definitions
  - `locales/`: Translation files
  - `App.tsx`: Main application component
  - `index.tsx`: Entry point
  - `i18n.ts`: Internationalization configuration

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

## Testing

To run the tests:

```
npm test
```

## Internationalization

The application supports multiple languages. To add a new language:

1. Create a new JSON file in the `src/locales` directory (e.g., `it.json` for Italian)
2. Add the translations to the new file
3. Import the new translation file in `src/i18n.ts`
4. Add the new language option to the `LanguageSelector` component

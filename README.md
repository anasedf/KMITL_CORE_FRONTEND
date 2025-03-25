# KMITLCORE FRONTEND

![image](https://github.com/user-attachments/assets/8039684e-f014-48d6-ab89-19f39f694c5a)



## Overview
This is the frontend for the **Course Review** application, built with **React** and **Bootstrap** for styling. It allows users to browse and submit course reviews.

## Technologies Used
- **React 19**
- **React Bootstrap** for UI components
- **React Router DOM** for navigation
- **Axios** for API requests
- **TypeScript** for type safety

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS recommended)
- **npm** or **yarn**

### Installation
Clone the repository and install dependencies:

```sh
# Clone the repository
git clone https://github.com/your-username/course-review-frontend.git
cd course-review-frontend

# Install dependencies
npm install  # or yarn install
```

### Running the Application
Start the development server with:

```sh
npm start  # or yarn start
```

Then open your browser and navigate to **http://localhost:3000**.

## Environment Variables
Before running the application, create a `.env` file in the root directory and add the necessary variables.

### Example `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api  # Backend API endpoint
```

## Scripts
| Command           | Description                                    |
|------------------|--------------------------------|
| `npm start`      | Starts the development server |
| `npm run build`  | Builds the app for production |
| `npm test`       | Runs the test suite           |
| `npm run eject`  | Ejects from Create React App  |

## Folder Structure
```
course-review-frontend/
├── public/       # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Page components
│   ├── services/    # API requests (Axios)
│   ├── styles/      # Global styles
│   ├── App.tsx      # Main App component
│   ├── index.tsx    # Entry point
├── .env            # Environment variables
├── package.json    # Dependencies & scripts
├── README.md       # Documentation
```

## Contributing
Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request.

## License
This project is licensed under the MIT License.

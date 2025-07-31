# Task 1: React Property Listing Dashboard

This project is a single-page application built with React and TypeScript that allows users to view, filter, add, and manage property listings. The application features a modern, responsive interface styled with Tailwind CSS and uses the Context API for state management.

## Live Demo

A live version of this project is deployed here:

**[https://your-task-1-url.vercel.app/](https://property-listing-vedang.vercel.app/)**

## Features

* **Display Property Listings**: Fetches property data from a mock API and displays each property in a clean card layout.
* **Dynamic Filtering & Searching**: Allows users to filter properties by type (e.g., Plot, Shed) and perform a live search by property name or location.
* **Add New Properties**: Includes a form to add new properties. On submission, the data is sent to a POST API endpoint, and the list updates dynamically.
* **View Details Modal**: Users can click on a property to view its full details and a larger image in a modal window.
* **Advanced UI/UX**:
    * **Loading Skeletons**: Displays skeleton loaders while data is being fetched for a smoother user experience.
    * **Toast Notifications**: Provides user feedback for actions like errors.
    * **Optimistic Deletes**: Deleting a property instantly removes it from the UI for a faster feel.

## Tech Stack

* **Frontend**: React, TypeScript
* **Styling**: Tailwind CSS
* **State Management**: React Context API with `useReducer`
* **API Communication**: Axios
* **Mock Backend**: `json-server`

## Project Setup and Installation

Follow these steps to get the project running on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Application

This project requires two terminals to run simultaneously: one for the mock backend and one for the React frontend.

1.  **Start the Mock API Server:**
    *(In your first terminal)*
    ```bash
    npm run server
    ```
    This will start the `json-server` on `http://localhost:3001`.

2.  **Start the React Application:**
    *(In your second terminal)*
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.

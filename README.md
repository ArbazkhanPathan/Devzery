# Test Cases Web Application

## Overview

This web application dynamically renders test cases from a PostgreSQL database table called `testcases`. The application allows users to view and edit test case data in real-time, with changes reflected back in the database.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Flask (Python)
- **Database:** PostgreSQL

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (for running the React frontend)
- Python 3.x (for running the Flask backend)
- PostgreSQL (for the database)

## Setup

### Backend Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ArbazkhanPathan/Devzery.git
    cd Devzery
    ```

2. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

3. **Create and activate a virtual environment:**

    ```bash
    python -m venv venv
    source venv/bin/activate  

    # On Windows use 
    venv\Scripts\activate
    ```

4. **Install the required Python packages:**

    ```bash
    pip install -r requirements.txt
    ```

5. **Configure the database connection:**

    - Create or edit `.env` file in the `backend` directory and add your PostgreSQL connection details:

        ```
        DATABASE_URL=postgresql://username:password@localhost:5432/your_database
        ```

6. **Run the Flask application:**

    ```bash
    python app.py
    ```
    or 
    ```
    python3 app.py
    ```

    The backend server will be running on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2. **Install the required Node.js packages:**

    ```bash
    npm install
    ```

3. **Run the React application:**

    ```bash
    npm start
    ```

    The frontend server will be running on `http://localhost:3000`.

## Usage

1. **Access the web application:**

    Open your web browser and go to `http://localhost:3000`.

2. **View and Edit Test Cases:**

    The application will display test cases fetched from the PostgreSQL database. You can edit the test cases directly on the page, and changes will be saved to the database in real-time.

## Contact

For any questions or issues, please reach out to [arbazkhanpathan0348@gmail.com](mailto:arbazkhanpathan0348@gmail.com).

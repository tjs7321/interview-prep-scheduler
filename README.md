# Interview Prep Scheduler Application
## Introduction

This is a web application that allows users to schedule events, meetings, and appointments using a combination of React, Flask, SQLAlchemy, and the Calendar.io API. This application provides an easy-to-use scheduling interface for both individuals and teams, making it ideal for organizing and managing appointments.

## Features

- **User Authentication**: Users can create accounts, log in, and securely manage their schedules.
- **Calendar Integration**: The application integrates with the Calendar.io API to display and synchronize scheduled events.
- **Event Creation**: Users can create, edit, and delete events, specifying details such as date, time, location, and description.
- **Invitations**: Send and receive event invitations, allowing for easy collaboration with others.
- **Real-time Updates**: Events are updated in real-time, ensuring everyone stays on the same page.

## Technologies Used

- **Frontend**:
  - [React](https://reactjs.org/): A popular JavaScript library for building user interfaces.
  - [Calendar.io](https://calendar.io/): An API for integrating calendar and scheduling functionalities.
  - Other libraries and tools for UI development (e.g., [Material-UI](https://material-ui.com/), [Redux](https://redux.js.org/)).

- **Backend**:
  - [Flask](https://flask.palletsprojects.com/en/2.1.x/): A lightweight Python web framework for building the backend.
  - [SQLAlchemy](https://www.sqlalchemy.org/): An Object-Relational Mapping (ORM) library for working with databases.
  - RESTful API: Provides endpoints for creating, updating, and retrieving events.

- **Database**:
  - [PostgreSQL](https://www.postgresql.org/): A powerful, open-source relational database.

## Setup and Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/yourusername/your-scheduling-app.git
    cd your-scheduling-app
    ```

2. **Set Up the Backend**:
    - Create a virtual environment and activate it:

      ```bash
      python -m venv venv
      source venv/bin/activate  # (Unix) or venv\Scripts\activate (Windows)
      ```

    - Install the required Python packages:

      ```bash
      pipenv install
      ```

    - Apply the database migrations:

      ```bash
      flask db init
      flask db migrate
      flask db upgrade
      ```

    - Start the Flask server:

      ```bash
      pipenv shell
      cd server
      python app.py
      ```

3. **Set Up the Frontend**:

    - Navigate to the main directory

    - Install the required Node.js packages:

      ```bash
      npm install --prefix client
      ```

    - Start the React development server:

      ```bash
      npm start --prefix client
      ```

4. **Access the Application**:

    - Open your web browser and access the application at `http://localhost:4000`.

## API Endpoints

- `/api/events`: CRUD operations for events.
- `/api/auth`: User authentication (login, registration).
- `/api/invitations`: Manage event invitations.

## Contributors

- [Theodore Smith](https://github.com/tjs7321)
- [John Carges](https://github.com/johncarges)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Calendar.io](https://calendar.io/) for providing a powerful scheduling API.
- The open-source community for the tools and libraries used in this project.
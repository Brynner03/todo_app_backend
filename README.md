# ToDo App Backend

This repository contains the backend implementation for a ToDo application. It manages user authentication, boards, tasks, and their associations, serving as the server-side implementation for the ToDo app.

---

## Routes

### BoardRoutes: `/boards`

- **GET `/`** - Retrieves all boards.
- **POST `/`** - Creates a new board.
- **GET `/:boardId/tasks`** - Retrieves tasks for a specific board.
- **GET `/:boardId`** - Retrieves a board by its ID.
- **GET `/user/:userId`** - Retrieves boards for a specific user.
- **PUT `/edit/:boardId`** - Updates board details.
- **DELETE `/:boardId`** - Deletes a board.

### UserRoutes: `/users`

- **GET `/`** - Retrieves all users.
- **POST `/`** - Creates a new user.
- **GET `/:userId`** - Retrieves a user by their ID.
- **GET `/data/all`** - Retrieves all user data (including boards and tasks).
- **PUT `/edit/:userId`** - Updates user details.
- **DELETE `/:userId`** - Deletes a user.

### TaskRoutes: `/tasks`

- **GET `/`** - Retrieves all tasks.
- **POST `/`** - Creates a new task.
- **GET `/:taskId`** - Retrieves a task by its ID.
- **PUT `/edit/:taskId`** - Updates task details.
- **DELETE `/:taskId`** - Deletes a task.

Each route serves a specific purpose, allowing manipulation and retrieval of data related to boards, users, and tasks within the ToDo application's backend.
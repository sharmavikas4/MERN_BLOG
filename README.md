# MERN Blog Website

This project is an interactive and feature-rich blogging website developed using modern web technologies. It allows users to create, edit, and delete blogs, comment on posts, and view trending blogs. Additionally, users can sign in using Google OAuth for easy authentication, upload images via Cloudinary, and manage their blogs through a personalized dashboard.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The aim of this project is to provide users with an interactive platform to share their thoughts, experiences, and ideas through blogs. The website includes features like trending blogs, recent blogs, a user management dashboard, and Google OAuth-based authentication for easy sign-in.

### Key Objectives:
- Develop a user-friendly blogging platform.
- Implement secure user authentication using Passport.js and Google OAuth.
- Integrate Cloudinary for efficient image management.
- Create a trending page to showcase the most liked blogs.
- Design a page to display recently created blogs.
- Provide a dashboard for users to manage their blogs.

## Features

- **User Authentication:** Secure user login and registration using Google OAuth.
- **Blog Management:** Users can create, edit, and delete blogs.
- **Comment System:** Engage in discussions by commenting on blogs.
- **Trending Page:** View the most popular blogs.
- **Recent Blogs Page:** Display newly created blogs.
- **User Dashboard:** Manage and track your blogs in a dedicated dashboard.
- **Image Management:** Upload and manage blog images with Cloudinary.

## Technologies Used

- **Frontend:**
  - React.js
  - Vite.js
  - Material UI (for styling)

- **Backend:**
  - Node.js
  - Express.js

- **Database:**
  - MongoDB

- **Authentication:**
  - Passport.js
  - Google OAuth

- **Image Hosting:**
  - Cloudinary

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/blogging-website.git
    ```

2. Navigate to the project directory:

    ```bash
    cd MERN_BLOG
    ```

3. Install dependencies:

    ```bash
    cd server
    npm install
    cd ..
    cd client
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the server directory and add the following:

    ```bash
    GOOGLE_CLIENT_ID=<your-google-client-id>
    GOOGLE_CLIENT_SECRET=<your-google-client-secret>
    URL=<your-server-url>
    CLIENT_URL=<your-client-url>
    DB=<your-database-connection-string>
    CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_KEY=<your-cloudinary-api-key>
    CLOUDINARY_SECRET=<your-cloudinary-api-secret>
    ```

5. Start the backend server:

    ```bash
    nodemon index.js
    ```

6. Set up environment variables:

    Create a `.env` file in the client  directory and add the following:
   ```bash
    VITE_REACT_APP_SERVER_URL=<your-server-url>
    VITE_REACT_APP_CLIENT_URL=<your-client-url>
    ```
   
8. Start the client side(frontend):
   ```bash
   npm run dev
   ```

## Usage

- Visit the website and sign in using your Google account.
- Create, edit, or delete blogs from your dashboard.
- Explore trending blogs or recent blogs on the respective pages.
- Comment on blogs and engage with the community.

## API Endpoints

- `POST /auth/google`: Google OAuth login.
- `POST /success`: Create a new blog.
- `GET /sucess`: Fetches all blog
- `POST /success/like`: Used to add like to a post.
- `POST /success/comments`: Add a comment to a blog.
- `GET /trending`: Fetch trending blogs based on the likes.
- `GET /new`: Fetch recently created blogs.
- `POST /edit`: Edit a blog.
- `POST /del`: Delete a blog.
- `POST /success/check`: Check whether a user has liked a post or not.
- `POST /blog`: Fetches a particular blog
- `GET /dashboard` : Fetches current user data
- `GET /likePost` : Fetches the post liked by current user.
- `GET /logout`: Logout current user

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## 👀 Our Contributors

- We extend our heartfelt gratitude for your invaluable contribution to our project! Your efforts play a pivotal role in elevating this project to greater heights.
- Make sure you show some love by giving ⭐ to our repository.

<div align="center">

  <a href="https://github.com/sharmavikas4/MERN_BLOG">
    <img src="https://contrib.rocks/image?repo=sharmavikas4/MERN_BLOG&&max=100" />
  </a>
</div>
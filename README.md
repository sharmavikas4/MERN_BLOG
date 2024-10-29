# MERN Blog

An interactive and feature-rich blogging website developed using modern web technologies. This project allows users to create, edit, and delete blogs, comment on posts, and view trending blogs. Users can sign in using Google OAuth for easy authentication, upload images via Cloudinary, and manage their blogs through a personalized dashboard.

## 🚀Featured In

<table>

   <tr>
      <th>Event Logo</th>
      <th>Event Name</th>
      <th>Event Description</th>
   </tr>
   <tr>
      <td><img src="gssoc.jpg" width="200" height="auto" loading="lazy" alt="GSSoC 24"/></td>
      <td>GirlScript Summer of Code 2024</td>
      <td>GirlScript Summer of Code is a three-month-long Open Source Program conducted every summer by GirlScript Foundation. It is an initiative to bring more beginners to Open-Source Software Development.</td>
   </tr>
   </table>

<br />

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Statistics](#statistics)
4. [Technologies Used](#technologies-used)
5. [Installation](#installation)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Contributing](#contributing)
9. [Pull Request Review Criteria](#PullRequestReviewCriteria)
10. [Code Of Conduct](#CodeofConduct)
11. [Contributors](#Contributors)
12. [License](#license)


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

- **User Authentication**: Secure user login and registration using Google OAuth.
- **Blog Management**: Users can create, edit, and delete blogs.
- **Comment System**: Engage in discussions by commenting on blogs.
- **Trending Page**: View the most popular blogs.
- **Recent Blogs Page**: Display newly created blogs.
- **User Dashboard**: Manage and track your blogs in a dedicated dashboard.
- **Image Management**: Upload and manage blog images with Cloudinary.

## Statistics 📊  

<table align="center">
  <thead align="center">
      <tr border: 1px;>
          <td><b>🌟 Stars</b></td>
          <td><b>🍴 Forks</b></td>
          <td><b>🐛 Issues</b></td>
          <td><b>🔔 Open PRs</b></td>
          <td><b>🔕 Closed PRs</b></td>
          <td><b>🛠 Languages</b></td>
          <td><b>🌐 Contributors </b></td>
      </tr>
  </thead>
  <tbody>
      <tr>
          <td><img alt="Stars" src="https://img.shields.io/github/stars/sharmavikas4/MERN_BLOG?style=flat&logo=github"/></td>
          <td><img alt="Forks" src="https://img.shields.io/github/forks/sharmavikas4/MERN_BLOG?style=flat&logo=github"/></td>
          <td><img alt="Issues" src="https://img.shields.io/github/issues/sharmavikas4/MERN_BLOG"/></td>
          <td><img alt="Open Pull Requests" src="https://img.shields.io/github/issues-pr/sharmavikas4/MERN_BLOG"/></td>
          <td><img alt="Closed Pull Requests" src="https://img.shields.io/github/issues-pr-closed/sharmavikas4/MERN_BLOG"/></td>
          <td><img alt="GitHub language count" src="https://img.shields.io/github/languages/count/sharmavikas4/MERN_BLOG"/></td>
          <td><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/sharmavikas4/MERN_BLOG?color=2b9348"/></td>
      </tr>
  </tbody>
</table>

## Technologies Used

### Frontend:

- React.js
- Vite.js
- Material UI (for styling)

### Backend:

- Node.js
- Express.js

### Database:

- MongoDB

### Authentication:

- Passport.js
- Google OAuth

### Image Hosting:

- Cloudinary

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sharmavikas4/MERN_BLOG.git
   ```

2. Navigate to the project directory:
   ```bash
   cd MERN_BLOG
   ```

3. Install dependencies:
   - For the server:
     ```bash
     cd server
     npm install
     ```
   - For the client:
     ```bash
     cd ../client
     npm install
     ```

4. Set up environment variables:
   - Create a `.env` file in the server directory and add:
     ```
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

6. Set up environment variables for the client:
   - Create a `.env` file in the client directory and add:
     ```
     VITE_REACT_APP_SERVER_URL=<your-server-url>
     VITE_REACT_APP_CLIENT_URL=<your-client-url>
     ```

7. Start the client side (frontend):
   ```bash
   npm run dev
   ```

## Usage

1. Visit the website and sign in using your Google account.
2. Create, edit, or delete blogs from your dashboard.
3. Explore trending or recent blogs on their respective pages.
4. Comment on blogs to engage with the community.

## API Endpoints

| Method | Endpoint                       | Description                                    |
|--------|-------------------------------|------------------------------------------------|
| POST   | /auth/google                  | Google OAuth login                             |
| POST   | /success                      | Create a new blog                             |
| GET    | /success                      | Fetch all blogs                               |
| POST   | /success/like                 | Add like to a post                            |
| POST   | /success/comments              | Add a comment to a blog                       |
| GET    | /trending                     | Fetch trending blogs based on likes           |
| GET    | /new                          | Fetch recently created blogs                   |
| POST   | /edit                         | Edit a blog                                   |
| POST   | /del                          | Delete a blog                                 |
| GET    | /dashboard                    | Fetch current user data                       |
| GET    | /likePost                     | Fetch posts liked by current user             |
| GET    | /logout                       | Logout current user                           |



## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add your feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

## Pull Request Review Criteria 🧲

1. Please fill out the PR template properly when creating a pull request.
2. Assign yourself to the issue you’re working on to help us track progress.
3. Never commit to the main branch.
4. Your work must be original and adhere to the project's coding standards.
5. Comment your code where necessary for clarity.
6. Always ensure all tests pass before pushing your changes by running:

```bash
npm run test
```

## Code of Conduct 😇

We strive to create a welcoming and inclusive environment for all contributors and users. By participating in this project, you agree to abide by our Code of Conduct.

### Our Standards

1. **Respect**: Treat everyone with respect, regardless of their background or opinions.
2. **Inclusivity**: Encourage and support diverse perspectives and contributions.
3. **Collaboration**: Be open to constructive feedback and collaboration.
4. **Professionalism**: Maintain professionalism in all interactions, online and offline.

## Contributors

A heartfelt thank you to the following individuals for their valuable contributions to this project! Your support and dedication are greatly appreciated:

<a href="https://github.com/sharmavikas4/MERN_BLOG/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sharmavikas4/MERN_BLOG" />
</a>

## Stargazers 🌟

<div align='center'>

(https://reporoster.com/stars/sharmavikas4/MERN_BLOG)](https://github.com/sharmavikas4/MERN_BLOG/stargazers)

![Stars](https://img.shields.io/github/stars/sharmavikas4/MERN_BLOG?style=social)  
**Total Stars: [![Stars Count](https://img.shields.io/badge/stars-123-yellow)](https://github.com/sharmavikas4/MERN_BLOG/stargazers)**

</div>

## Forkers 🍴

<div align='center'>

(https://reporoster.com/forks/sharmavikas4/MERN_BLOG)](https://github.com/sharmavikas4/MERN_BLOG/network/members)

![Forks](https://img.shields.io/github/forks/sharmavikas4/MERN_BLOG?style=social)  
**Total Forks: [![Forks Count](https://img.shields.io/badge/forks-456-blue)](https://github.com/sharmavikas4/MERN_BLOG/network)**

</div>


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



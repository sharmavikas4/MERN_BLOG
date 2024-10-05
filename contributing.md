<h1 align="center">Contributors Guide for MERN_BLOG⚡</h1>
<h3 align="center">Welcome to MERN_BLOG! Make sure to star this repository😍<br>We appreciate your interest in contributing.😊 <br>This guide will help you get started with the project and make your first contribution.</h3>

---

## Prerequisites 📋

Before getting started, ensure you have the following tools installed:

- **Node.js** (version >= 14.x)
- **npm** (version >= 6.x)

You can check if Node.js and npm are installed by running:
```css
node -v
npm -v
```

## Creating Your First Pull Request 🌟
## 1. Star this repository: Show some love by starring the repository!
## 2. Fork this repository: Click the 'Fork' button at the top right of this page to create a copy of this repository in your account.
## 3. Clone the forked repository:

```css
git clone https://github.com/<your-github-username>/MERN_BLOG.git
```

## 4. Navigate to the project directory

```css
cd MERN_BLOG
```
## 5. Install the dependencies:
```css
    cd server
    npm install
    cd ..
    cd client
    npm install
```
## 6. Set up environment variables:

    Create a `.env` file in the server directory and add the following:

```css
    GOOGLE_CLIENT_ID=<your-google-client-id>
    GOOGLE_CLIENT_SECRET=<your-google-client-secret>
    URL=<your-server-url>
    CLIENT_URL=<your-client-url>
    DB=<your-database-connection-string>
    CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_KEY=<your-cloudinary-api-key>
    CLOUDINARY_SECRET=<your-cloudinary-api-secret>
```

## 7. Start the backend server:

```css
    nodemon index.js
```
    
## 8. Set up environment variables:

    Create a `.env` file in the client  directory and add the following:
```css
    VITE_REACT_APP_SERVER_URL=<your-server-url>
    VITE_REACT_APP_CLIENT_URL=<your-client-url>
 ```
    
## 9. Create a new branch (use descriptive branch names
   feature/<feature_name> or fix/<issue_name>):
```css
git checkout -b feature/<your_branch_name>
```

## 10. Make changes and ensure the app runs correctly:
```css
   npm run dev
```

## 11. Stage your changes and commit (use descriptive commit messages like
   feat: added new feature or fix: corrected issue):
```css
git add .
git commit -m "feat: added new feature"
```
## 12. Push your local commits to the remote repository:
```css
git push -u origin feature/<your_branch_name>
```
## 13. Create a Pull Request (PR):
    Provide a detailed description of the changes you've made.
    If it's a UI change, consider adding screenshots for better understanding.
## 14. Congratulations! 🎉 You've made your contribution.

## Pull Request Review Criteria 🧲

1. Please fill out the PR template properly when creating a pull request.
2. Assign yourself to the issue you’re working on to help us track progress.
3. Never commit to the main branch.
4. Your work must be original and adhere to the project's coding standards.
5. Comment your code where necessary for clarity.
6. Always ensure all tests pass before pushing your changes by running:
```css
npm run test
```

## Communication and Support 💬
1. Join the project's communication channels to interact with other contributors and seek assistance.
2. If you have any questions or need help, don't hesitate to ask in the project's communication channels or comment on the relevant issue.

## Code of Conduct 😇
Please follow our project's code of conduct while contributing. Treat all contributors and users with respect, and create a positive and inclusive environment for everyone.

## License 📄
The project is licensed under MIT. Make sure to review and comply with the license terms.

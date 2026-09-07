# 4orYou — Social Media Web Application

> A modern social media web application built with React, focused on user interaction, content sharing, and a responsive social experience.

[![Live Demo](https://img.shields.io/badge/Live-Demo-2563EB?style=for-the-badge)](https://4or-you.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge\&logo=github)](https://github.com/ma7moudwa1id/4orYou)

---

## 📖 About The Project

**4orYou** is a social media web application built with React.

The project allows users to create an account, log in, create and manage posts, interact with other users' content, add comments, view their profile, and receive notifications.

The main goal of this project was to practice building a more complete React application with real API integration, authentication, protected routes, shared state, forms, and user interactions.

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* Form validation
* Password visibility toggle
* Token-based authentication
* Persistent authentication using Local Storage
* Protected application routes

### 🏠 Home Feed

* Display posts from the API
* Create a new post
* Post text content
* Upload post images
* Loading skeletons while posts are loading
* Responsive feed layout

### 📝 Post Management

Authenticated users can:

* Create posts
* Edit their posts
* Delete their posts
* View post details
* Upload images with posts
* Interact with posts

Post updates and deletions are synchronized with the API.

### ❤️ Social Interactions

Users can interact with posts through:

* Likes
* Comments
* Sharing actions
* Bookmarks UI
* Post details

The application also provides feedback for important actions using toast notifications.

### 💬 Comments

Users can:

* View comments
* Add comments
* Update comments
* Delete comments
* Interact with post discussions

Comments are managed through a dedicated Context to keep the related state organized.

### 👤 User Profile

The profile page provides:

* User information
* Profile image
* Cover image
* User posts
* Post statistics
* Profile-related information
* User post management

The user's posts are loaded dynamically from the API.

### 🔔 Notifications

The application includes a notifications system for user activity.

Supported notification types include:

* ❤️ Post likes
* 💬 Post comments

Users can:

* View notifications
* Filter notifications
* Mark individual notifications as read
* Mark all notifications as read

### ⚙️ Settings

The application includes a dedicated settings page for user-related options.

### 🚫 Error Handling

The application includes:

* Custom 404 page
* Loading states
* Form validation
* API error handling
* User feedback through toast notifications

---

## 🧭 Application Routes

The application uses React Router for navigation and protected routes.

| Route              | Description       | Access    |
| ------------------ | ----------------- | --------- |
| `/`                | Home feed         | Protected |
| `/profile`         | User profile      | Protected |
| `/settings`        | User settings     | Protected |
| `/notifications`   | Notifications     | Protected |
| `/login`           | Login page        | Public    |
| `/signup`          | Registration page | Public    |
| `/postDetails/:id` | Post details      | Public    |
| `/messages`        | Coming soon       | —         |
| `/bookmarks`       | Coming soon       | —         |
| `*`                | Not Found         | Public    |

---

## 🔑 Authentication Flow

The application uses token-based authentication.

After authentication, the token is stored in `localStorage` and used in API requests through the `Authorization` header.

```text
User
 │
 ├── Sign Up
 │
 └── Sign In
       │
       ▼
    API Request
       │
       ▼
   Authentication
       │
       ▼
      Token
       │
       ▼
   Local Storage
       │
       ▼
 Protected Routes
```

Protected pages are wrapped with a dedicated `Protected` component to prevent unauthorized access.

---

## 🌐 API Integration

4orYou communicates with a REST API to manage application data.

The frontend uses **Axios** for HTTP requests.

The application interacts with API resources for:

* Authentication
* User profile data
* Posts
* User posts
* Post details
* Notifications
* Comments
* Post updates
* Post deletion

Authenticated requests include the user's token in the `Authorization` header.

---

## 🧠 State Management

The project uses **React Context API** to manage shared application state.

### User Context

The `UserContext` manages:

* Authentication token
* Current user data
* User posts
* Notifications
* Create post modal
* Update post modal
* Notification actions

### Posts Context

The `PostsContext` manages:

* Posts
* Post details
* Post updates
* Post deletion
* Post fetching
* Selected post data

### Comments Context

A dedicated comments context is used to manage comment-related functionality and state.

This approach helped reduce unnecessary prop drilling and made shared application data easier to access across components.

---

## 🛠️ Tech Stack

### Frontend

* **React 19**
* **React Router**
* **Tailwind CSS**
* **Vite**

### Data & API

* **Axios**
* REST API
* Token-based authentication

### Forms & Validation

* **Formik**
* **Yup**

### UI & Feedback

* **Lucide React**
* **Sonner**

### Development

* **ESLint**

The technologies above are based on the project's current dependencies.

---

## 🧩 Project Structure

The project follows a component-based React architecture.

```text
src/
│
├── Components/
│   ├── Comment/
│   ├── Comment.Context/
│   ├── FreindSuggestion/
│   ├── Post/
│   ├── Posts.Context/
│   ├── Protected/
│   ├── ScrollTo/
│   ├── Shared/
│   └── user.context/
│
├── Layout/
│   ├── Layout.jsx
│   └── SideLayout.jsx
│
├── Pages/
│   ├── Home/
│   ├── Signin/
│   ├── Signup/
│   ├── Profile/
│   ├── PostDetails/
│   ├── NotificationsPage/
│   ├── settings/
│   ├── NotFound/
│   └── WillDeveloped/
│
├── assests/
│   └── images/
│
├── App.jsx
├── main.jsx
└── index.css
```

The project separates pages, reusable components, layouts, and Context providers to keep the application organized.

---

## 📱 Responsive Design

The application is designed to provide a responsive experience across different screen sizes.

The UI adapts to:

* 💻 Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

Tailwind CSS is used to build the responsive layouts and UI components.

---

## 🎨 UI & User Experience

The application uses a modern dark interface with blue and cyan accents.

The UI focuses on:

* Clear navigation
* Readable content
* Consistent spacing
* Responsive layouts
* Interactive states
* Loading skeletons
* Toast feedback
* User-friendly forms

The authentication pages also use a dedicated visual layout to create a stronger first impression for new users.

---

## ⚡ Loading & User Feedback

To improve the user experience, the application includes:

* Loading skeletons for posts
* Toast notifications
* Form validation messages
* Error handling
* Interactive hover and active states

For example, the Home page displays skeleton placeholders while posts are being loaded.

---

## 🧠 What I Learned

Building 4orYou helped me move from basic React projects to a more realistic application with multiple connected features.

During this project, I practiced:

* Building a complete React application
* Working with REST APIs
* Axios requests
* Authentication and authorization
* Protected routes
* React Context API
* State management
* CRUD operations
* Form handling with Formik
* Form validation with Yup
* File uploads
* Dynamic routing
* Reusable components
* Loading states
* Error handling
* User notifications
* Responsive UI design

---

## 🚧 Future Improvements

Some features are planned for future development:

* 💬 Real-time messaging
* 🔖 Fully implemented bookmarks
* 👥 More advanced user connections
* 🔍 Search functionality
* 🌐 Real-time notifications
* 🌓 Improved theme customization
* 📱 Further mobile UX improvements

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm

### 1. Clone the repository

```bash
git clone https://github.com/ma7moudwa1id/4orYou.git
```

### 2. Navigate to the project

```bash
cd 4orYou
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will start using Vite.

---

## 📦 Build For Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

---

## 🌐 Live Demo

Try the application:

👉 **[4orYou Live Demo](https://4or-you.vercel.app/)**

---

## 💻 Repository

View the source code:

👉 **[GitHub Repository](https://github.com/ma7moudwa1id/4orYou)**

---

## 👨‍💻 Author

### Mahmoud Walid

Frontend Developer focused on building modern and responsive web applications.

* GitHub: [@ma7moudwa1id](https://github.com/ma7moudwa1id)

---

## 📄 License

This project was created for learning and portfolio purposes.

---

⭐ If you found this project interesting, feel free to explore the repository and give it a star.

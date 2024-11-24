
# url Manager

URL Manager is a web-based URL shortening and analytics platform built with React, Tailwind, Shadcn/UI, and PostgreSQL from Supabase. It allows users to shorten URLs, customize them, generate QR codes, and analyze link interactions with in-depth metrics.
## Table of Contents

1. &nbsp;[Features](#features)
2. &nbsp;[Demo](#demo)
3. &nbsp;[Tech Stack](#tech-stack)
4. &nbsp;[Installation](#installation)
5. &nbsp;[Description](#description)
6. &nbsp;[Usage](#usage)
7. &nbsp;[Contributing](#contributing)

---
## Features

- **URL Shortening**: Shorten long URLs for easier sharing.
- **Customizable URLs**: Tailor short URLs with custom aliases.
- **QR Code Generation**: Generate QR codes for each short URL with customizable colors and styles.
- **Analytics**: Track key metrics such as:
  - Click count per link
  - Device type used for each click
  - Location of the clicking device
- **Platform-Specific Tracking**: Enable users to append platform-specific extensions to short URLs (e.g., `@xyspadInsta` for Instagram), which are stored in the database for platform-specific analytics.
- **Secure User Authentication**: Protects user data with authentication and row-level security using Supabase.
- **Responsive and User-Friendly**: Designed for optimal user experience on both desktop and mobile.

## Demo:

 You can access the live demo of the project [here](https://youtu.be/je2vJdqPqt0).


## Installation

1. **Clone the repository**:
   ```bash
    git clone https://github.com/yaswanthk03/urlManager.git
    cd urlManager
   ```

2. **Install dependencies:**
```bash
 npm install
```
3. **Set up environment variables:**

- Create a .env file in the root directory.
- Add your Supabase project details:
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_SITE_URL=YOUR_SITE_URL or localhost:5173

4. **Start the application**
```bash
 npm run dev
```
The application should now be running on http://localhost:5173


## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Shadcn/UI
- **Routing**: react-router-dom
- **Backend Database**: PostgreSQL via Supabase
- **APIs**: Supabase for database interactions and analytics

## Description
Each folder and file serves a distinct purpose to ensure the app's maintainability and scalability:

- **public:** Holds static assets like images and logos accessible throughout the app.
- **components:** Houses both custom components and Shadcn/UI components, enabling reusable, modular UI elements.    
- **db:** 
    - The project includes several authentication functions to manage user login, signup, session retrieval, and logout using Supabase. These functions are located in the `apiAuth.js` file within the `db` folder.

        - **`login({ email, password })`**: Authenticates a user with email and password. Throws an error if login fails.
        - **`signup({ name, email, password, profile_pic })`**: Registers a new user with optional profile picture upload. If the password is weak, an error with a detailed message is thrown.
        - **`getCurrentUser()`**: Retrieves the current authenticated user session from Supabase. Returns `null` if no user is logged in.
        - **`logout()`**: Logs out the current user and clears their session.

    - The project includes several functions for managing URLs, including creating, retrieving, and deleting shortened or custom URLs. These functions interact with the Supabase database and handle various errors.These functions are located in the `apiUrls.js` file within the `db` folder.

        - **`getUrls(user_id)`**: Fetches all URLs associated with a specific user ID. Throws an error if the retrieval fails.
        - **`getUrl({ id, user_id })`**: Retrieves a single URL by its ID and user ID, ensuring that users can only access their own URLs.
        - **`getLongUrl(id)`**: Looks up the original long URL by either `short_url` or `custom_url`. If the URL doesn’t exist, it handles the error gracefully.
        - **`createUrl({ title, longUrl, customUrl, user_id })`**: Creates a new shortened or custom URL, assigning a random short URL if a custom one isn’t provided. It also validates custom URLs for unique characters and availability.
        - **`deleteUrl(id)`**: Deletes a URL by its ID. Throws an error if deletion fails.

    - The project includes several functions to handle click analytics, including retrieving click data and storing new click events. These functions interact with Supabase to store device, location, and platform-specific information for each URL click.These functions are located in the `apiClicks.js` file within the `db` folder.

        - **`getClicksForUrls(urlIds)`**: Fetches all click data for a list of URL IDs. Returns `null` if there’s an error.
        - **`getClicksForUrl(url_id)`**: Retrieves click data for a single URL, ordered by the most recent click. Throws an error if data cannot be retrieved.
        - **`storeClicks({ id, originalUrl, short_url })`**: Records a click event for a URL. It collects device and vendor information using `UAParser`, fetches location data from the `ipapi.co` API, and stores this data in the Supabase `clicks` table. This function then redirects the user to the original URL.

- **hooks:**
The `useFetch` hook is a custom hook designed to streamline data fetching in the app. It accepts a callback function (`cb`) and optional configuration parameters (`options`). This hook manages loading, error, and response states, making API calls straightforward and reactive.
    - *Usage*: `useFetch` returns an object containing `data`, `loading`, `error`, and `fn`, a function to trigger the fetch operation.
    - *Example*:
     ```javascript
    const { data, loading, error, fn } = useFetch(apiCallback,  { optionKey: optionValue });
  
    useEffect(() => {
        fn(); // Triggers the fetch operation
    }, []);
    ```
    This hook helps simplify API calls, keeping components clean and reactive.

- **layouts:** Defines the app's layout structure with app-layout.jsx, integrating the header, footer, and main content area.
- **pages:** Contains page components that correspond to different routes in the app, such as landing, dashboard, link, auth, redirect, and error pages.  
- **App.jsx:** 
The main application component, `App`, initializes the routing and context for the project. It uses `react-router-dom` to manage client-side routing and wraps the entire app in `UrlProvider` to provide global access to authentication and user data.
    ##### Routes
    The `createBrowserRouter` function defines the following routes:
    - **`/` (LandingPage)**: The landing page where users are introduced to the app.
    - **`/auth` (Auth)**: The authentication page for user login and signup.
    - **`/dashboard` (Dashboard)**: The main user dashboard, accessible only to authenticated users through the `RequireAuth` component.
    - **`/link/:id` (LinkPage)**: Displays details of a specific shortened link, also protected by `RequireAuth`.
    - **`/:id` (RedirectLink)**: A dynamic route for redirecting users from short or custom URLs to the original link.
    - **`*` (ErrorPage)**: A fallback route that displays a 404 error page if a user attempts to navigate to an undefined route.

    ##### Components and Layout

    - **`AppLayout`**: A layout component that integrates the `Header`, `Outlet` (for nested routes), and `Footer`.
    - **`RequireAuth`**: A higher-order component that restricts access to certain routes, redirecting unauthenticated users to the login page.

    This structure organizes the app into clear, manageable sections and uses context and routing effectively to control access and navigation.

- **context.jsx:** 
    The project uses `UrlContext` to manage and provide user authentication status and data globally across components. This context is set up in `UrlProvider` and leverages the custom `useFetch` hook to retrieve the current authenticated user from the backend.

  - **`UrlProvider`**: Wraps the app, providing `user`, `loading`, `fetchUser`, and `isAuthenticated` values to all components.
  - **`user`**: Contains user information, if authenticated.
  - **`isAuthenticated`**: Boolean indicating if the user is authenticated.
  - **`fetchUser`**: Function to fetch or refresh the current user.
  - **`loading`**: Boolean indicating if the user data is still being fetched.
  
    - **Usage**:
    ```javascript
    const { user, isAuthenticated, loading } = UrlState(); // Access context values
    ```
    This context centralizes user authentication data, making it accessible to any component through UrlState() without prop drilling.

- **main.jsx:** Entry point for rendering the app.

This structure helps keep the codebase organized and enables easy scaling as the app grows in complexity.
## Usage
1. **Register/Login:** Users can create an account or log in via the authentication system managed by Supabase.
2. **Shorten a URL:** Go to the main page and enter a long URL to get a shortened version.
3. **Customize the Short URL:** Provide a custom alias if desired.
4. **Generate and Customize QR Code:** Click on the QR icon to generate a QR code. Customize colors and styles as needed.
5. **View Analytics:** Access detailed analytics on the dashboard for each shortened link, including click count, device type, and location.
6. **Platform-Specific Extensions:** Add a unique identifier to short URLs for different platforms. This enables tracking platform-based engagement analytics.
   
## Contributing

1. **Fork the repository.**

2. **Create a feature branch:**
    ```bash
     git checkout -b feature-name
    ```
3. **Commit your changes:**
    ```bash
     git commit -m "Add new feature"
    ```

4. **Push to the branch:**
    ```bash
     git push origin feature-name
    ```

5. **Create a pull request.**

---
####
Feel free to contribute or report issues to make this platform even better!


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

## Demo

 TODO


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
VITE_SITE_URL=YOUR_SITE_URL

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
  TODO

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

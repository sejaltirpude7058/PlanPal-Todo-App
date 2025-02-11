# PlanPal - Your Smart To-Do Companion

PlanPal is a user-friendly task management application designed to help you organize your daily tasks efficiently. With a clean interface and powerful features, it simplifies planning, tracking, and completing tasks with ease.

## Key Features

- **Task Management** – Create, update, and delete tasks seamlessly.
- **Reminders & Notifications** – Stay on top of your tasks with real-time alerts.
- **User Authentication** – Secure login and personalized task management.
- **Cross-Device Sync** – Access your tasks from multiple devices.
- **Intuitive UI** – A clean and simple interface for effortless navigation.

## Tech Stack

- **Frontend:** React.js, JavaScript, Material UI
- **Backend:** Firebase (Firestore, Authentication, Cloud Messaging)
- **State Management:** Context API 
- **Hosting:** Firebase Hosting

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/planpal.git
   ```

2. Navigate to the project folder:
   ```sh
   cd planpal
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_VAPID_KEY=your_vapid_key
   ```

5. Start the development server:
   ```sh
   npm run dev
   ```

## Deployment

To deploy the application using Firebase Hosting:

1. Build the project:
   ```sh
   npm run build
   ```

2. Login to Firebase CLI:
   ```sh
   firebase login
   ```

3. Initialize Firebase in the project:
   ```sh
   firebase init
   ```
   - Select **Hosting**
   - Choose your Firebase project
   - Set `dist` as the public directory
   - Configure as a single-page app (Yes)

4. Deploy:
   ```sh
   firebase deploy
   ```
## Live Demo 
https://planpal-37385.web.app/

## Screenshots of output UI
https://github.com/sejaltirpude7058/PlanPal-Todo-App/issues/1#issue-2844947765

## Contributing

Feel free to fork the repository, create a new branch, and submit a pull request with your improvements.




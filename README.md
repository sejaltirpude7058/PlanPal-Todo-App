
# PlanPal - Your Smart To-Do Companion

PlanPal is a user-friendly task management application designed to help you organize your daily tasks efficiently. With a clean interface and powerful features, it simplifies planning, tracking, and completing tasks with ease.

## Key Features

- **Task Management** – Create and delete tasks seamlessly.  
- **Categorized Task Organization** – Organize tasks into different categories for better tracking.  
- **Priority Settings** – Set task priorities (Urgent, High, Medium, Low) to manage work efficiently.  
- **Reminders & Notifications** – Get real-time alerts to stay on top of your tasks.  
- **User Authentication** – Secure login system for personalized task management.  
- **Cross-Device Sync** – Access your tasks from multiple devices anytime, anywhere.  
- **Intuitive UI** – A clean, user-friendly interface for effortless navigation and task handling. 

## Tech Stack

- **Frontend:** React.js, JavaScript, Material UI
- **Backend:** Firebase (Firestore, Authentication, Cloud Messaging)
- **State Management:** Context API 
- **Hosting:** Firebase Hosting

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/sejaltirpude7058/planpal.git
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
![Image](https://github.com/user-attachments/assets/6ab5237a-337b-467c-9d9f-499ef459dcff)

![Image](https://github.com/user-attachments/assets/6b897a2c-4f81-4844-b382-af7db35c6ba1)

![Image](https://github.com/user-attachments/assets/cf0ce12b-b76a-45ec-b0b5-b4992b381ac9)

![Image](https://github.com/user-attachments/assets/e33d2928-ad4d-4271-bef2-ab7c54b675ce)





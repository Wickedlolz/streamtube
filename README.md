# 🎬 StreamTube

[![Netlify Status](https://api.netlify.com/api/v1/badges/7d6eb702-6b82-45f0-9c0e-782aa52ffdca/deploy-status)](https://app.netlify.com/sites/streamtubex/deploys)

Welcome to **StreamTube**, the ultimate platform for all your movie-watching needs! This project provides a seamless and engaging user experience for movie enthusiasts to explore, watch, and interact with their favorite films. Whether you're looking to find a new movie to watch, dive into detailed information about movies and actors, or personalize your viewing experience, **StreamTube** has got you covered.

# 🚀 Features

- **Browse & Watch Movies**: Explore our vast library of movies and start streaming your favorites instantly.
- **User Authentication**: Register for an account or log in to access personalized features.
- **Movie Interaction**: Like and unlike movies to curate your personal list of favorites.
- **Trailers & Details**: Watch trailers and view comprehensive details about movies and actors.
- **Search Functionality**: Easily find movies by title or search by genre to discover new films that match your interests.
- **Theme Customization**: Switch between themes to personalize the look and feel of your **StreamTube**.
- **Responsive Design**: Enjoy a seamless viewing experience on any device, whether it's a phone, tablet, or laptop.
- **NEW Email-Sending API in Next.js**: Users can send messages to the site owner directly from the contact page. The form collects the user's name, email, and message. Server-side, an NextJS API handles the email sending using Nodemailer, ensuring reliable and secure message delivery to the owner’s inbox. This feature facilitates easy communication between users and the site owner.

# 🛠️ Technology Stack

- **Frontend**: NextJS, Tailwind CSS, ShadCN

- **Backend**: Firebase, [TMDB API](https://developer.themoviedb.org/v4/reference/intro/getting-started)

- **Streaming**: Integration with streaming service [smashystream.com](https://smashystream.com)

- **Icons & UI Components**: Lucide-react, custom components and [shadcn](https://ui.shadcn.com)

# 🎨 Screenshots

# 🔧 Installation & Setup

To get a local copy up and running, follow these steps:

1. **Clone the repository:**

```
git clone https://github.com/Wickedlolz/streamtube
```

```
cd streamtube
```

2. **Install dependencies:**

```
npm install
```

3. **Set up environment variables:**

Create a `.env.local` file in the root directory based on `.env.example`:

```bash
# TMDB API Configuration
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN=your_tmdb_access_token_here

# Domain Configuration
NEXT_PUBLIC_DOMAIN_URL=http://localhost:3000

# Email Configuration (Server-side only - DO NOT prefix with NEXT_PUBLIC_)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Important Notes:**

- Get your TMDB API key from [TMDB API](https://www.themoviedb.org/settings/api)
- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password
- Firebase credentials can be obtained from your [Firebase Console](https://console.firebase.google.com/)

4. **Start the development server:**

```
npm run dev
```

Navigate to the application:

Open your browser and go to http://localhost:3000

# 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the project
2. Create your feature branch (**git checkout -b feature/AmazingFeature**)
3. Commit your changes (**git commit -m 'Add some AmazingFeature'**)
4. Push to the branch (**git push origin feature/AmazingFeature**)
5. Open a pull request

# 📝 License

Distributed under the MIT License. See LICENSE for more information.

# 📞 Contact

For any questions or feedback, please reach out:

- **Viktor Dimitrov**
- **Email: viktor.dimitrov.dev@gmail.com**
- **GitHub: Wickedlolz**

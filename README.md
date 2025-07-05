# 🎮 Game Explorer

A modern game discovery application built with **Next.js**, **TypeScript**, and **Tailwind CSS**, powered by the [RAWG Video Games Database API](https://rawg.io/apidocs). Explore trending games, detailed game information, screenshots, trailers, achievements, and more.

## 🚀 Features

* 🔍 **Game Search & Filtering** (by genre, platform, tags, etc.)
* 🕹️ **Game Details** (description, rating, release date, platforms, etc.)
* 🖼️ **Game Screenshots**
* 🎬 **Game Trailers**
* 🏆 **Achievements**
* 🏪 **Store Listings**
* 💡 **Game Suggestions**
* 👤 **Top Creators**
* 🛍️ **Supported Stores**
* 🧩 **Tags, Genres & Platforms**

## 🌐 Tech Stack

* **Next.js** 15
* **TypeScript**
* **Tailwind CSS**
* **ShadCN UI**
* **Radix UI**
* **Lucide Icons**
* **RAWG API** for game data

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/dinildamsith/game-explorer.git
cd game-explorer
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_RAWG_API_KEY=your_rawg_api_key_here
```

> 🔐 Get your API key from: [https://rawg.io/apidocs](https://rawg.io/apidocs)

### 4. Run the app locally

```bash
npm run dev
# or
yarn dev
```

Your app should now be running at `http://localhost:3000`

---

## 📁 Project Structure

```bash
/
├── app/                  # Next.js app directory
├── components/           # Reusable UI components
├── lib/                  # Utility functions & API fetchers
├── styles/               # Tailwind CSS and global styles
├── public/               # Static assets
└── .env.local            # Environment config
```

---

## 📦 API Functions (`lib/api.ts`)

These functions interact with the RAWG API:

* `fetchGames(options)`
* `fetchGameDetails(id)`
* `fetchGameScreenshots(id)`
* `fetchGameTrailers(id)`
* `fetchGameAchievements(id)`
* `fetchGameStores(id)`
* `fetchGameSuggestions(id)`
* `fetchCreators()`
* `fetchStores()`
* `fetchGenres()`
* `fetchPlatforms()`
* `fetchTags()`

Each function handles error checking and data parsing to ensure smooth UX.

---

## 📸 Screenshots

> *Add screenshots here showing homepage, filters, game detail modal, etc.*

---

## 📄 License

MIT License © 2025 Dinil Damsith

---

## 📬 Contact

For issues or suggestions, feel free to reach out via [GitHub Issues](https://github.com/dinildamsith/game-explorer/issues) or [LinkedIn](https://www.linkedin.com/in/dinildamsith).


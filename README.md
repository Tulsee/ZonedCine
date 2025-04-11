**zoned_cine - NextJS Movie Database App**

This is a web application built with Next.js (React) that allows users to discover movies using the TMDb API. Users can browse upcoming and top-rated movies, view detailed information, filter by genre, sort results, and search for specific titles.

**Features:**

- **Homepage:** Hero slider showing Now Playing movies, plus sliders for Upcoming and Top Rated movies.
- **Movie Discovery:** Browse movies with genre filters, sorting options (popularity, release date, rating), and pagination.
- **Search:** Use the navigation bar to search for specific movie titles.
- **Movie Details:** View detailed information such as synopsis, cast, trailer, rating, runtime, and release date.
- **Custom Design:** Unique dark theme with a custom color palette, no external UI libraries.

**Tech Stack:**

- **Framework:** Next.js (App Router)
- **Language:** JavaScript (React)
- **State Management & Data Fetching:** Redux Toolkit with RTK Query
- **API:** TMDb API v3
- **Styling:** Custom CSS Modules
- **Sliders:** Swiper.js

**Getting Started:**

1. **Clone the repository:**

   ```
   git clone https://github.com/Tulsee/zoned_cine
   cd zoned_cine
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

3. **Set up environment variables:**

   - Create a `.env.local` file in the root of the project.
   - Add the following:
     ```
     NEXT_PUBLIC_TMDB_API_KEY=YOUR_TMDB_API_KEY_HERE
     NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
     NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/
     ```

4. **Run the development server:**
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```
   Then open `http://localhost:3000` in your browser.

**Links:**

- **Live Demo:** [Link](https://zoned-cine.vercel.app/)

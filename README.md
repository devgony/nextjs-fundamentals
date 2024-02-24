# Nextjs Fundamentals with app-router [Next14]

# 1 INTRODUCTION

## 1.6 Project Setup

```sh
npm init -y
# with MIT license
npm install react@latest next@latest react-dom@latest
# "dev": "next dev"
```

```ts
// mkdir app
// touch app/page.tsx
export default function Tomato() {
  return <h1>Hello!</h1>;
}
```

Right after `npm run dev` and access to `localhost:3000`, next does:
` ⚠ Your page app/page.tsx did not have a root layout. We created app/layout.tsx for you.`

# 2 ROUTING

## 2.1 Defining Routes

- define a page by default exporting a component from a page.{js, jsx, tsx} file.

```sh
mkdir -p app/about-us/company/sales/
touch app/about-us/company/sales/page.tsx
touch app/about-us/company/page.tsx
touch app/about-us/page.tsx
```

## 2.2 Not Found Routes

- `app/not-found.tsx` handles global error

```sh
rm -rf app/about-us/company

mkdir components
touch app/not-found.tsx \
components/navigation.tsx
```

## 2.3 SSR vs CSR

- In SSR, server renders html and gives browser full html
- CSR gets empty html and browser will fill html with js later
- usePathName works only with `use client`
  - but even with `use client`, it is still SSR. it `also` works as `client`

## 2.4 Hydration

- after rendering html, hydrate events with js
- clicking href is hijacked by js and virtually moves url

```
/about-us --> <button>0</button> --SSR-> user👀 --Hydartion-> onClick
```

## 2.5 'use client'

- hydration only affects component with `use client`
- strategy: write component first (as ServerComponent) and only when got below error, put `use client`

```
× You're importing a component that needs useState. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
```

## 2.7 Layouts

```sh
mkdir -p app/about-us/company/jobs/sales
touch app/about-us/company/jobs/sales/layout.tsx \
app/about-us/company/jobs/sales/page.tsx \
app/about-us/company/jobs/sales/layout.tsx
```

- `layout.tsx` defines layout with children and metadata
- `layout.tsx` can be at each page
  - it renders nested layout
  - it merge metadata
- metadata can change title of tab

```ts
// app/layout.tsx
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
```

## 2.8 Metadata

```sh
rm -rf app/about-us/company app/about-us/layout.tsx
```

- logical group `(groupName)` is not recognized as a page but just groups components logically

```sh
mkdir "app/(home)"
mv app/page.tsx "app/(home)"
```

- `template` takes child and merge with format

```ts
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: "%s | Next Movies",
    default: "Next Movies",
  },
  description: "The best movies on the best framework",
};
```

## 2.9 Dynamic Routes

- SSR gives params as default

```sh
mkdir -p "app/(movies)/movies/[id]"
touch "app/(movies)/movies/[id]/page.tsx"
```

```ts
export default function MovieDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  return <h1>Movie {id}</h1>;
}
```

# 3 DATA FETCHING

## 3.1 Client Side

- review client side fetch

```ts
// app/(home)/page.tsx
"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await fetch(
      "https://nomad-movies.nomadcoders.workers.dev/movies"
    );
    const json = await response.json();
    setMovies(json);
    setIsLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return <div>{isLoading ? "Loading..." : JSON.stringify(movies)}</div>;
}
```

## 3.2 Server Side

- no need useState, useEffect, isLoading
- it caches on server so that it loads once a user visits page, later don't need to wait for loading
- but how to handle first loading?

```ts
const URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await fetch(URL);
  const json = await response.json();
  return json;
}

export default async function HomePage() {
  const movies = await getMovies();
  return <div>{JSON.stringify(movies)}</div>;
}
```

## 3.3 Loading Components

- loading.tsx can substitute component until SSR loading is done

```sh
touch app/(home)/loading.tsx
```

## 3.4 Parallel Requests

```sh
touch "app/(movies)/movies/[id]/loading.tsx"
```

- Promise.all await parallel requests

```ts
const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);
```

## 3.5 Suspense

- extract each fetchings to components
- Suspend will indivisually
  - show loading
  - re-render if children fetch data

```sh
touch components/movie-info.tsx \
components/movie-videos.tsx
```

```ts
<Suspense fallback={<h1>Loading movie info</h1>}>
  <MovieInfo id={id} />
</Suspense>
<Suspense fallback={<h1>Loading movie videos</h1>}>
  <MovieVideos id={id} />
</Suspense>
```

## 3.7 Error Handling

- create error.text and it should be client component to recover from error

```ts
// touch "app/(movies)/movies/[id]/error.tsx"
"use client";

export default function ErrorOMG() {
  return <h1>lol something broke....</h1>;
}
```

# 4 DEPLOYMENT

# 4.1 CSS Modules

```sh
mkdir styles
touch styles/global.css \
styles/navigation.module.css
```

- CSS module is out of the box(without any configration)
- In global.css, it can be any css
- In {componentName}.module.css, it should start with class name eg) `.nav ul {}`
  - should end with `module.css`
  - import with anyname (usually `styles`)
  - use with className `<nav className={styles.nav}>`

```ts
import styles from "../styles/navigation.module.css";

export default function Navigation() {
  ..
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
```

## 4.2 Movie Styles

- impl css base
- merge `styles.list` under `stylye.nav`

```sh
touch styles/home.module.css \
styles/movie.module.css \
components/movie.tsx
```

## 4.3 Movie Trailers

```sh
touch styles/movie-info.module.css \
styles/movie-videos.module.css
```

- embed video by iframe

```ts
{
  videos.map((video) => (
    <iframe
      key={video.id}
      src={`https://youtube.com/embed/${video.key}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={video.name}
    />
  ));
}
```

## 4.4 Dynamic Metadata

- `generateMetadata` can set dynamic metadata
- `getMovie` is already cached => good to call again

```ts
export async function generateMetadata({ params: { id } }: IParams) {
  const movie = await getMovie(id);
  return {
    title: movie.title,
  };
}
```

# 4.5 Deployment

- move const to out of page to avoid hard refresh

```sh
touch app/constants.ts
```

- use prefetch to fetch as soon as Link appear on screen in advance of clicking

```ts
<Link prefetch href={`/movies/${id}`}>
```

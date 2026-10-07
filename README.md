# Pixel Perfect Replica

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9ced6755-c1ac-4a90-ac02-71adc3eedccf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploy with Docker

Build and start the production server with Docker Compose:

```sh
docker compose up -d --build
```

The application is available locally at `http://127.0.0.1:3100`, intended to be
used behind a reverse proxy such as Nginx. To use another host port, set
`APP_PORT`:

```sh
APP_PORT=8080 docker compose up -d --build
```

View logs or stop the application:

```sh
docker compose logs -f app
docker compose down
```

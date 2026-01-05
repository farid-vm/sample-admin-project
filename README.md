# Sample Admin Project: API & UI

This repository contains both the **API** and **UI** applications in a single monorepo. Each project is self-contained and can be installed and run independently, but they share the same package manager and setup philosophy.

* **API**: Built with **NestJS**
* **UI**: Built with **Next.js**
* **Package Manager**: **pnpm**

Each project already includes its own framework-generated README with detailed, framework-specific information. This root README focuses on how to get the entire repository up and running.

---

## Repository Structure

```
.
├── api/        # NestJS backend application
│   └── README.md
├── ui/         # Next.js frontend application
│   └── README.md
└── README.md   # (this file)
```

---

## Prerequisites

Make sure you have the following installed on your machine:

* **Node.js** (LTS version recommended)
* **pnpm**

If you don’t have pnpm installed:

```bash
npm install -g pnpm
```

---

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

## Running the Projects

Each project is run independently from its own directory.

### Run the API (NestJS)

```bash
cd api
pnpm install  
pnpm start
```

For development mode or other scripts, refer to `api/README.md`.

---

### Run the UI (Next.js)

```bash
cd ui
pnpm install  
pnpm run dev
```

For build, production, or environment-specific instructions, refer to `ui/README.md`.

---

## Environment Variables

Each project manages its own environment variables:

* **API**: `api/.env`
```bash
SUPABASE_URL=YOUR_URL
SUPABASE_SERVICE_ROLE_KEY=YOUR_API_ROLE_KEY
```
* **UI**: `ui/.env.local`
```bash
NEXT_PUBLIC_API_URL=YOUR_API_URL
```
Refer to the individual README files for required environment variables and examples.

---

## Scripts & Tooling

* **pnpm** is used consistently across the repository
* Each project defines its own scripts in its respective `package.json`
* Linting, testing, and build commands are project-specific

---

## Notes

* There is no additional setup required beyond `pnpm install`
* No shared build step is required between API and UI
* The projects are intentionally decoupled for flexibility

---

## Additional Documentation

* 📘 API documentation: see `api/README.md`
* 🎨 UI documentation: see `ui/README.md`

---

## License

Specify your license here (e.g., MIT, Apache 2.0, proprietary, etc.).

---

Happy coding 🚀

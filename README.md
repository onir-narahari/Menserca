# MENSERCA Website

Official repository for the MENSERCA corporate website: a modern, static multi-page site showcasing capabilities, projects, safety, and contact information.

## Live Website

[menserca.vercel.app](https://menserca.vercel.app)

## Overview

MENSERCA is an industrial contractor providing engineering, procurement, construction, and maintenance services.  
This project contains the complete frontend source for the public website.

## What This Repository Includes

- Multi-page website (`index`, `about`, `capabilities`, `projects`, `safety`, `contact`)
- Dedicated pages for each capability area
- Responsive navigation and mobile drawer UX
- Structured CSS architecture (`tokens`, `base`, `components`, page-level styles)
- JavaScript for interactions, translations, and page-specific behavior
- Project media assets (images and videos)

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Vercel (deployment)

## Project Structure

```text
Menserca/
├── css/            # Design tokens, shared styles, and page styles
├── js/             # Site behavior and utilities
├── images/         # Image assets used across pages
├── videos/         # Video assets
├── partials/       # Reusable HTML fragments
├── templates/      # Template files
├── docs/           # Supporting documentation
├── design/         # Design references and artifacts
├── index.html
├── about.html
├── capabilities.html
├── projects.html
├── safety.html
└── contact.html
```

## Local Development

Because this is a static site, you can run it with any local server.

### Option 1: Python

```bash
python3 -m http.server 8080
```

Then open: [http://localhost:8080](http://localhost:8080)

### Option 2: VS Code Live Server

Open the project in VS Code/Cursor and run the **Live Server** extension on `index.html`.

## Deployment

The site is deployed on Vercel. Any update pushed to the connected branch can trigger a new deployment.

## Contributing

1. Create a feature branch
2. Make your changes
3. Validate pages locally (desktop + mobile)
4. Open a pull request

## License

No license file is currently defined in this repository.

---
name: Offline portfolio architecture
description: The durable constraint and rationale for the portfolio's standalone browser delivery.
---

The portfolio must remain runnable by opening index.html directly, so navigation uses hash routes and browser assets are self-contained rather than fetched from a framework, backend, or package registry.

**Why:** The requested deliverable is a portable three-file website that must work offline as well as in the managed preview.

**How to apply:** Keep future content and interaction changes inside index.html, style.css, and script.js. Treat artifact registration or preview-serving metadata as infrastructure only, and never make the browser runtime depend on it.

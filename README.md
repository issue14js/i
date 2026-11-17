# Ankit Kumar Portfolio

A frontend-only portfolio built with React and Vite.

## Development

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, then preview it with `npm run preview`.

## Contact form

The contact form submits directly to FormSubmit from the browser. If submission fails, it offers a pre-filled email-app link. FormSubmit may require confirming the recipient email the first time it is used.

## SEO files

`robots.txt`, `sitemap.xml`, `llms.txt`, and `llms-full.txt` are served as static files. Set `VITE_SITE_URL` to the deployed site URL when building to generate absolute links and sitemap entries, for example:

```sh
$env:VITE_SITE_URL = "https://example.com"
npm run build
```

The build succeeds without this variable, but the sitemap will have no URL entries until a site URL is configured.

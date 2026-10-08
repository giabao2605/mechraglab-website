# MechRAG Lab website

Static, English-language official site for MechRAG Lab, an independent AI development effort in Vietnam.

## Development

Run `npm run check` (Node.js 20+) to run tests and build the static distribution in `dist/`. Serve `dist/` with a local HTTP server to preview.

## Cloudflare Pages Free

Connect this GitHub repository to Cloudflare Pages through Git integration. Use branch `main`, framework preset **None**, build command `npm run build`, output directory `dist`, root directory repository root. Verify the assigned `*.pages.dev` site before attaching the domain.

In Pages > Custom domains, add `mechraglab.click`. Verify Cloudflare nameservers and DNS/TLS activation; preserve existing DNS records. Confirm HTTPS, sitemap, and canonical URLs. For rollback, use a prior deployment or revert the Git commit.

References: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/ and https://developers.cloudflare.com/pages/configuration/custom-domains/

## Content boundaries

The on-page product demo uses synthetic content. No business contact channel, founder name, paid plans, production SLA or legal entity information has been verified. The website does not claim that Claude is integrated, that enterprise pilots have completed, or that the product is production-ready. No proprietary documents or internal data from ChatbotProject are used.

Cloudflare deployment requires separate access and is not claimed here.

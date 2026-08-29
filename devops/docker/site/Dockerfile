# Build the Astro site, then serve the static output from nginx.
#
# Two stages so node and the dependency tree stay out of the published image:
# what ships is nginx plus the contents of dist/.
#
# Built by the avtandigital-site Tekton pipeline. The build context is the
# repository root; this file is selected via the pipeline's dockerfile-dir
# param, matching how devops/docker/api works in the VibeCheck repo.

FROM node:22-alpine AS build
WORKDIR /src

# Manifests first, so a content-only change reuses the install layer.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1-alpine

ARG GIT_REVISION=unknown
LABEL org.opencontainers.image.revision="${GIT_REVISION}"
LABEL org.opencontainers.image.source="https://github.com/Avtuka/avtuka.github.io"

# Only the build output. The repo also carries a copy of the generated HTML at
# its root for GitHub Pages, and that copy is currently stale -- it predates
# src/pages/PassionPlay. Taking dist/ means the image always reflects src/,
# never that copy.
COPY --from=build /src/dist /usr/share/nginx/html

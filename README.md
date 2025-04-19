OpenAI Express Server

1. Express Server (MVP)

POST /chat

Accepts JSON { "message": "..." }

Forwards message to OpenAI GPT and returns response

Uses dotenv for OPENAI_API_KEY

2. Dockerization

Dockerfile for single-container

docker-compose.yml for local testing

docker-compose up exposes /chat on port 3000

3. CI/CD (GitHub Actions)

Workflow (.github/workflows/ci-cd.yml):

Build multi-arch image

Push to Docker Hub

SSH to Linode

Pull image, stop & remove old container

Run new container

4. Linode VPS Setup

Provision Ubuntu

Harden SSH:

Disable password login

Key-based auth only

UFW: allow 22,80,443

Install & enable fail2ban

5. Deployment Script

On VPS, deploy.sh:

#!/usr/bin/env bash
set -e
IMAGE="<DOCKERHUB_USER>/openai-express:latest"

docker pull "$IMAGE"
docker stop openai-express || true
docker rm   openai-express || true

docker run -d \
  --name openai-express \
  --restart=always \
  --env OPENAI_API_KEY="$OPENAI_API_KEY" \
  -p 3000:3000 \
  "$IMAGE"

Security

SSH key auth only

No root SSH login

UFW: only 22,80,443

fail2ban installed & tested

.env / secrets not committed



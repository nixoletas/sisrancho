#!/bin/bash
cd /home/sti/intranet-gitea

fnm use --install-if-missing 20

git pull

npm run build

docker compose down -v && docker compose up -d
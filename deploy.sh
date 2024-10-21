#!/bin/bash
cd /home/sti/intranet-gitea

git pull

npm run build

docker compose down -v && docker compose up -d
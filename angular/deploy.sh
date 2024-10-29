#!/bin/bash
cd /home/sti/intranet-gitea

git pull

export PATH=/home/sti/.local/state/fnm_multishells/166162_1729539262280/bin:$PATH

npm run build

docker compose down -v && docker compose up -d

#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$ROOT_DIR/.env"

read_env_value() {
  local key="$1"
  grep -E "^${key}=" "$ENV_FILE" | head -n 1 | cut -d '=' -f2-
}

if [[ ! -f "$ENV_FILE" ]]; then
  echo ".env file not found at $ENV_FILE" >&2
  exit 1
fi

DB_HOST="${DB_HOST:-$(read_env_value DB_HOST)}"
DB_PORT="${DB_PORT:-$(read_env_value DB_PORT)}"
DB_USER="${DB_USER:-$(read_env_value DB_USER)}"
DB_PASS="${DB_PASS:-$(read_env_value DB_PASS)}"
DB_NAME="${DB_NAME:-$(read_env_value DB_NAME)}"

: "${DB_HOST:?DB_HOST is required}"
: "${DB_PORT:?DB_PORT is required}"
: "${DB_USER:?DB_USER is required}"
: "${DB_PASS:?DB_PASS is required}"
: "${DB_NAME:?DB_NAME is required}"

PGPASSWORD="$DB_PASS" psql \
  "host=$DB_HOST port=$DB_PORT dbname=$DB_NAME user=$DB_USER sslmode=require" \
  -v ON_ERROR_STOP=1 \
  -f "$SCRIPT_DIR/seed-techniques-sociales.sql"

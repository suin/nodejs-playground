#!/usr/bin/env bash

set -eu

function step {
  echo "$(tput setaf 4)${1}$(tput sgr 0)"
}

step "Cleaning up repositories..." && {
  bash -eux -c "git clean -fdx ."
}

step "Install" && {
  bash -eux -c "pnpm install"
}

step "Run command across packages" && {
  bash -eux -c "pnpm run -r test"
}

step "Run command across packages in parallel" && {
  bash -eux -c "pnpm run -r --parallel test"
}

step "Run command of specific packages" && {
  bash -eux -c "pnpm run -r --filter '@suin/module-a' test"
}

#!/bin/bash
echo "Scanning for hardcoded secrets..."
if grep -r -E "API_KEY.*FAKE-API-KEY-12345" . --exclude-dir={node_modules,.git,scripts}; then
  echo "Error: Hardcoded secret detected! Failing the build."
  exit 1
else
  echo "No hardcoded secrets found. Proceeding with build."
  exit 0
fi

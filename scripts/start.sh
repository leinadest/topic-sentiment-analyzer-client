#!/bin/sh

# Fetch the Identity Token for authorizing requests to the backend server
export AUTH_TOKEN=$(curl -s -H 'Metadata-Flavor: Google' 'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience='$API_URL || echo "none")

# Start the nginx server
./docker-entrypoint.sh nginx -g 'daemon off;'
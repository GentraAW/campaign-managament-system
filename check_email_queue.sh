#!/bin/bash

# Cek antrian email
echo "Checking emailQueue:"
redis-cli LRANGE emailQueue 0 -1

# Memeriksa status email
echo "Checking emailStatus:"
redis-cli HGETALL emailStatus

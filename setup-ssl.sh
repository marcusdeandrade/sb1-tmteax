#!/bin/bash

# Install Certbot
apt-get update
apt-get install -y certbot python3-certbot-nginx

# Obtain SSL Certificate
certbot --nginx -d your-domain.com --non-interactive --agree-tos --email your-email@example.com

# Reload Nginx
systemctl reload nginx
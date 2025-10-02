#!/usr/bin/env bash
set -euo pipefail

# Netlify DNS and HTTP Setup Verification Script
# Default domain: adgenxai.com

DOMAIN="${1:-adgenxai.com}"

echo "🔍 Netlify DNS & HTTP Verification for: $DOMAIN"
echo "================================================"
echo ""

# DNS Checks
echo "📡 DNS Records:"
echo "----------------"

# Check A records
echo "A Records:"
dig +short A "$DOMAIN" | while read -r ip; do
    echo "  ✓ $ip"
done

# Check CNAME records
echo ""
echo "CNAME Records:"
dig +short CNAME "$DOMAIN" | while read -r cname; do
    echo "  ✓ $cname"
done

# Check www subdomain
echo ""
echo "WWW Subdomain:"
dig +short "www.$DOMAIN" | while read -r record; do
    echo "  ✓ $record"
done

# Check nameservers
echo ""
echo "Nameservers:"
dig +short NS "$DOMAIN" | while read -r ns; do
    echo "  ✓ $ns"
done

echo ""
echo "================================================"
echo ""

# HTTP/HTTPS Checks
echo "🌐 HTTP/HTTPS Status:"
echo "---------------------"

# Check HTTPS with redirect following
echo "HTTPS Check (https://$DOMAIN):"
if curl -s -o /dev/null -w "  Status: %{http_code}\n  Final URL: %{url_effective}\n  Response Time: %{time_total}s\n" -L "https://$DOMAIN" --max-time 10; then
    echo "  ✓ HTTPS connection successful"
else
    echo "  ✗ HTTPS connection failed"
fi

echo ""

# Check HTTP to HTTPS redirect
echo "HTTP to HTTPS Redirect Check (http://$DOMAIN):"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L "http://$DOMAIN" --max-time 10 || echo "000")
HTTP_REDIRECT=$(curl -s -o /dev/null -w "%{url_effective}" -L "http://$DOMAIN" --max-time 10 || echo "failed")

if [[ "$HTTP_REDIRECT" == https://* ]]; then
    echo "  ✓ HTTP redirects to HTTPS"
    echo "  Status: $HTTP_STATUS"
    echo "  Final URL: $HTTP_REDIRECT"
else
    echo "  ⚠ HTTP does not redirect to HTTPS"
    echo "  Status: $HTTP_STATUS"
    echo "  Final URL: $HTTP_REDIRECT"
fi

echo ""

# Check WWW subdomain
echo "WWW Subdomain Check (https://www.$DOMAIN):"
WWW_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L "https://www.$DOMAIN" --max-time 10 || echo "000")
WWW_REDIRECT=$(curl -s -o /dev/null -w "%{url_effective}" -L "https://www.$DOMAIN" --max-time 10 || echo "failed")

echo "  Status: $WWW_STATUS"
echo "  Final URL: $WWW_REDIRECT"

if [[ "$WWW_STATUS" == "200" ]]; then
    echo "  ✓ WWW subdomain accessible"
else
    echo "  ⚠ WWW subdomain status: $WWW_STATUS"
fi

echo ""
echo "================================================"
echo ""

# SSL Certificate Check
echo "🔒 SSL Certificate Info:"
echo "------------------------"
if timeout 5 openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer -dates 2>/dev/null; then
    echo "  ✓ SSL certificate verified"
else
    echo "  ⚠ Could not retrieve SSL certificate info"
fi

echo ""
echo "================================================"
echo "✅ Verification complete for $DOMAIN"

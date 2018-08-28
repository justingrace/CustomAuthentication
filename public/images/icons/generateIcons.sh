#!/bin/bash

files='icon-57x57.png icon-72x72.png icon-96x96.png icon-128x128.png icon-144x144.png icon-152x152.png icon-167x167.png icon-180x180.png icon-192x192.png icon-384x384.png'
for size in 57 72 96 128 144 152 167 180 192 384
do
sips --resampleWidth $size icon-512x512.png --out "icon-${size}x${size}.png"
done

#!/bin/bash
for i in *.png; do
	mv "$i" icon-$(echo "$i" | cut -d'-' -f 2).png
done
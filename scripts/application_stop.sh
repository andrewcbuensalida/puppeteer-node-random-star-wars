#!/bin/bash
#Stopping existing node servers
# echo "Stopping any existing node servers"
# pkill node
npm i forever -g
echo "stopping forever"
forever stopall
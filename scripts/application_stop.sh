#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers"
pkill node
echo "stopping forever"
forever stopall
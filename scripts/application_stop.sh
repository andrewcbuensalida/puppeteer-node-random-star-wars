#!/bin/bash
#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)


#Stopping existing node servers
# echo "Stopping any existing node servers"
# pkill node
# npm i forever -g
echo "stopping forever 1"
forever stopall
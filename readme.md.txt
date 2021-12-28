https://www.youtube.com/watch?v=KoNWlnx6E1I
trying to use code deploy from github to aws ec2.
didnt work because his doesnt have node
now trying https://www.youtube.com/watch?v=Buh3GjHPmjo
this methods works but it sucks because the other app deployed with this method the naked
domain doesnt work because it it redirects to https. had to do an extra step
on authenticating im the owner, search ssl in aws, and even that stopped working.

installing forever has to be npm i forever -g
to start forever, forever start <name of server.js>

to run puppeteer on node on linux
https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-on-aws-ec2-instance-running-amazon-linux
have to install sudo amazon-linux-extras install epel -y
and sudo yum install -y chromium
the path to scripts in linux /opt/codedeploy-agent/deployment-root/430cc14f-3952-4b4a-a230-aed64b38294a/d-SD5HRMFDC/deployment-archive/scripts/
but i think above is just a log
had to do the kitchen sink method in stop script
setting port in server.js to 80 doesnt work
to remove the :5000 at the end of the url, have to point a url to that one, 
which ive done. now trying something else.
when trying to fetch puppeteer while on localhost, cors problem, so trying to 
use cors middleware and it worked.
to remove the port 5000 from the url, try 
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
from https://stackoverflow.com/questions/16573668/best-practices-when-running-node-js-with-port-80-ubuntu-linode
but it doesnt work
now trying https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-configuring-proxies.html
did the elastic ip bull and it worked but still with the port at the end of the url
NEVER AGAIN DO EC2 METHOD
the only project where https works is the one on amplify, which creates a cloudfront
the ec2 projects are the ones with :port at the end of the url

todo app is probably more up to date when it comes to cicd.

NOW MIGRATING TO EC2 WITH DOCTORDB AND BOOKS, then why isnt it there?

dont forget # sudo amazon-linux-extras install epel -y
# sudo yum install -y chromium



now migrating to ec2 t2 micro.
nginx config:

sudo nano /etc/nginx/sites-available/starwars.anhonestobserver.com.conf

nginx now looks like
server {
    listen 80;
    server_name starwars.anhonestobserver.com www.starwars.anhonestobserver.com;

    location / {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

have to do the sim link thing sudo ln -s /etc/nginx/sites-available/starwars.anhonestobserver.com.conf /etc/nginx/sites-enabled/
sudo systemctl reload nginx to make sure it's working
because certbot was previously installed, it redirected books.anhonest to doctordb.anhonest. to fix, just run sudo certbot --nginx again to expand the certificates. dont be alarmed if the pem name is still doctordb. it still works.

to install puppeteer:
npm install -g puppeteer --unsafe-perm=true -allow-root && sudo apt install chromium-browser -y

puppeteer not working

so trying 
sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

hanged so refreshed page,

now 
sudo apt install -y libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxi-dev libxtst-dev libnss3 libcups2 libxss1 libxrandr2 libasound2 libatk1.0-0 libatk-bridge2.0-0 libpangocairo-1.0-0 libgtk-3-0 libgbm1

not sure if the extraneous installs were needed, but what solved it was removing the executablePath in the puppeteer.launch.

pm2 start server.js --watch --name starwars

fetching crashes the server, so did sudo apt remove chromium-browser
and
sudo apt remove puppeteer
then
sudo apt autoremove

now reinstalling it

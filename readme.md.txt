https://www.youtube.com/watch?v=KoNWlnx6E1I
trying to use code deploy from github to aws ec2.
didnt work because his doesnt have node
now trying https://www.youtube.com/watch?v=Buh3GjHPmjo
this method sucks because the other app deployed with this method the naked
domain doesnt work because it it redirects to https. had to do an extra step
on authenticating im the owner, search ssl in aws, and even that stopped working.
installing forever has to be npm i forever -g
to start forever, forever start <name of server.js>
applicationstop script is the one that was loaded before the new one currently
being deployed.
to run puppeteer on node on linux
https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-on-aws-ec2-instance-running-amazon-linux
have to install sudo amazon-linux-extras install epel -y
and sudo yum install -y chromium
the path to scripts in linux /opt/codedeploy-agent/deployment-root/430cc14f-3952-4b4a-a230-aed64b38294a/d-SD5HRMFDC/deployment-archive/scripts/
had to do the kitchen sink method in stop script
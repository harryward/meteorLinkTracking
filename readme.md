## Meteor Analytics tracking

I used a package that allowed me to do this for short urls, but later I found out that it was creating a unique mongo record for each pageview... and once I hit about 40,000 records it started to crash my application

therefore, I would like to share this code because instead of creating a unique mongo record - it just creates one Analytics object per id that you want to track

included is a client and server example

Harry Ward
http://twitter.com/harryward05

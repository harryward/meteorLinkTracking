## Meteor Analytics tracking

I used a package that allowed me to do this for short urls, but later I found out that it was creating a unique mongo record for each pageview... and once I hit about 40,000 records it started to crash my application

therefore, I would like to share this code because instead of creating a unique mongo record - it just creates one Analytics object per id that you want to track

included is a client and server example

example of this working on a production application
http://lystify.miny.io/p/listMod?id=adQFwqAa6YDNgMzN8&slide=6&prod=true

* in this example i'm calling the trackPageview() function each time the next, previous or more buttons are clicked.

<img src="https://s3.amazonaws.com/f.cl.ly/items/1R0q3s302a1q0Y3n2z1N/Screen%20Shot%202015-08-11%20at%206.15.46%20PM.png">

Harry Ward
http://twitter.com/harryward05

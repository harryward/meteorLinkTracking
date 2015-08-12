
// meteor add mantarayar:shortid

// is a package I suggest to create unique short ids which you can use as your 'someUniqueId'

// ShortId.generate()

// Blah.insert({
//     '_id':ShortId.generate(), // lets pretend this came out to DKDKDK
//     'title':'my title',
//     'body':'test body',
//     'created':new Date(),
// })

// in this example to track pageviews for this post i would use
//
// Meteor.call("trackPageview",'DKDKDK')


// https://atmospherejs.com/mantarayar/shortid


Analytics = new Mongo.Collection("analytics") // mongo collection for tracking pageviews


// WITH IRON ROUTER CALL THE METHOD AND PASS THE UNIQUE ID

Router.route("p/:template", {
    Meteor.call("trackPageview", someUniqueId, function(error, result){
        if(error){
            console.log("error", error);
        }
        if(result){
            console.log('SUCCESS ',result)
        }
    });
    // example /p/home?id=343434343

    this.render(this.params.template)
    // going to /p/home would render the home template
});




Meteor.methods({
    trackPageview:function(someUniqueId){

        // ANALYTICS is the mongo collection created that stores a single analytics object for each shortlink you create
        AnalyticsObject = Analytics.find(someUniqueId).fetch()

        if (AnalyticsObject) {
            console.log('analytics object found for '+ someUniqueId,AnalyticsObject)
            var theNum = 0
            var ThePost = Analytics.findOne(someUniqueId)
            var totes = parseInt(Analytics.findOne(someUniqueId).pageviews)

            console.log('pageviews BEFORE ',totes)

            Analytics.update({
                '_id': someUniqueId
            }, {
                $set: {
                    'pageviews': parseInt((totes + 1)) // add 1 pageview to the current pageview total
                }
            })

            console.log('pageviews AFTER ',Analytics.findOne(someUniqueId)) // for testing, you can comment this out
            return 'pageview tracked'

        } else {
            // there is no analytics object for this id so create one
            Analytics.insert({
                '_id': someUniqueId,
                'pageviews': parseInt(1)
            })

            console.log('analytics object created with one pageView', Analytics.findOne(someUniqueId)) // for testing, you can comment this out

            return 'pageview tracked and analytics object created'

        }
    }


    }
});

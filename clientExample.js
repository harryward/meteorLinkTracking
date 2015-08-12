
// meteor add mantarayar:shortid

// is a package I suggest to create unique short ids which you can use as your 'someUniqueId'

// ShortId.generate()

// https://atmospherejs.com/mantarayar/shortid


Router.route("p/:template", {
    Session.set('someUniqueId',this.params.query)
    // example /p/home?id=343434343

    this.render(this.params.template)
    // going to /p/home would render the home template
});


if (Meteor.isClient) {

    Meteor.startup(function(){

    // CLIENT SIDE IMPLEMENTATION


    trackPageview = function(someUniqueId) {
        // ANALYTICS is the mongo collection created that stores a single analytics object for each shortlink you create
        AnalyticsObject = Analytics.find(someUniqueId).fetch()

        if (AnalyticsObject) {
            console.log('analytics object found for '+ someUniqueId,AnalyticsObject)
            var theNum = 0
            var totes = parseInt(AnalyticsObject.pageviews)

            console.log('pageviews BEFORE ',totes)

            Analytics.update({
                '_id': someUniqueId
            }, {
                $set: {
                    'pageviews': parseInt((totes + 1)) // add 1 pageview to the current pageview total
                }
            })

            console.log('pageviews AFTER ',Analytics.findOne(someUniqueId)) // for testing, you can comment this out

        } else {
            // there is no analytics object for this id so create one
            Analytics.insert({
                '_id': someUniqueId,
                'pageviews': parseInt(1)
            })

            console.log('analytics object created with one pageView', Analytics.findOne(someUniqueId)) // for testing, you can comment this out

        }
    }
});

// replace 'name' with your template name
Template.name.created = function(){
trackPageview(Session.get('someUniqueId').id)
};


}

sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/base/Log"
], function(MockServer, Log) {
    "use strict";

    return {
        init: function() {
            var mockServer = new MockServer({
				rootUri: "/"
			});

            mockServer.simulate("../localService/metadata.xml", {
				sMockdataBaseUrl: "../localService/mockdata",
				bGenerateMissingMockData: true
			});

            mockServer.attachAfter("GET", function(event) {
                const xhr = event.getParameter("oXhr");
                if(xhr && xhr.url.indexOf("first") > -1) {
                    event.getParameter("oFilteredData").results.splice(3, 100);
                }
            }, "Meetups");

            mockServer.start();
            Log.info("Running the app with mock data");
        }
    };
});
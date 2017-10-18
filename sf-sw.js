<apex:page showHeader="false" standardStylesheets="false" contentType="text/javascript" >
var version = "1.0";
console.log('version',version);
    self.addEventListener('install', function(event) {
        event.waitUntil(self.skipWaiting());
        console.log("SW installed");
    
    });
    
    self.addEventListener('activate',function(event) {
        event.waitUntil(self.clients.claim());
        console.log("sw activated");
    });
    
    self.addEventListener('fetch', function (event) {
    var url = decodeURIComponent(event.request.url);
    if(url.indexOf('/apex/') > -1) {
    
    event.respondWith(
        fetch(event.request)
        .then(function(Response) {return response.text();})
        .then(function(textBody) {
            return new Response(textBody.replace('<script src="/static/11213/js/perf/stub.js" type="text/javascript"></script>',""), {headers: {"Content-Type":'text/html'}});
        })
        
    );
    });
</apex:page>

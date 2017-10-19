# serviceworker
Getting started with service worker
Read more: <https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API>

## Examples
* Basic example of a service worker, and displaying a custom offline page

* Open up index.hmtml, check console for any errors (Service workers only run over HTTPS)
* Check for service worker installation and cache details in chrome dev tools,
* Once the cache had details, go offline , try to navigate to page.html
* page3.html will not load because its not initiall cached
* Be online, now navigate to page3.html, at this stage service worker intercepts the network
request and adds its to the cache, so you can navigate to page3.html while being offline


### Service woker for Salesforce, visualforce

* Create a new vf page, and name is `sw` and paste the contents of sf-sw.js, and dont try put
the js as a static resource , this wont work because the scope of the service worker changes, 
it has to be in '/apex/..'
* Create one more vf page and paste the contents of `sf-page`, this is will install the service 
worker 

#### More details to follow on caching and other patterns and usage

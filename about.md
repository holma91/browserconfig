## Inspiration

As someone who lives in the EU, the web is nowadays cluttered with "accept cookies" popups everywhere. Every website you go to ask the same thing, you can either "accept all cookies", or you can "reject all cookies", or customize your cookie preferences. This is super bad UX! Why not configure your preferences once, and then use the configuration everywhere? This also lead us to think about other settings that are often universal across websites, such as avatar, display name and email.

## What it does

browserconfig.xyz removes the friction in using the web. Instead of configuring your settings on every separate website, you can just go to our web app and create your config and then use it everywhere. The config gets pinned to IPFS, and the IPFS content ID gets saved in a browser extension.
When you visit a website that use our package, you won't need to answer questions such as "accept cookies", because they will already know what cookies you accept and don't accept by reading the config! (by getting the IPFS CID from the browser storage, and then sending a request to IPFS to get the config)

## How we built it

**/webapp**: The web app is where you create your config and pin it to IPFS. It's also where you activate the config, which saves the IPFS content id to the browser extension. It's a next.js app written in typescript. Link to the code: [Web App](https://github.com/holma91/browserconfig/tree/main/webapp).

**/extension**: The chrome browser extension that acts as a global storage for the IPFS content ID. When you activate the config at browserconfig.xyz, the content id is saved in the browser storage. When you visit any other website, they can read the config from your storage and set preferences accordingly. Link to the code: [Extension Code](https://github.com/holma91/browserconfig/tree/main/extension).

**/package**: The npm package for websites that want to integrate our product. You just install the package, and then use the useBrowserConfig hook with your domain as the only argument. If your user has created and activated a config at browserconfig.xyz, you won't need to ask them to "accept cookie", because the useBrowserConfig hook will return the user's preferences! Link to the code: [NPM Package](https://github.com/holma91/browserconfig/tree/main/package).

## Challenges we ran into

Apparently, it is really difficult for a user to share a variable across different domains (for good reasons). Initially, we thought that the browser's local storage could be used for storing the IPFS content ID, but we soon realized that the local storage is unique to every domain! So if you store something in local storage at domain x, you cannot access it at domain y. This was a huge problem since we now didn't know how we would expose the users content id in the npm package. We realized that it was necesseary to create a browser extension to act as a global storage, and that is what we did and it works as expected!

Another challenge was how to calculate the IPFS content ID without pinning to IPFS. First we thought that the content ID was only the hash of the content, and then it would be easy to just apply the same hashing algorithm on the client. We then learned that the process IPFS goes through when creating the content ID is much more advanced than just a hash.

## Accomplishments that we're proud of

The web app UI turned out really good, the code for the npm package is clean but what we are most proud of is the creation of the browser extension since that was done in the last minute. As mentioned earlier, we didn't think it would be necessary because we have local storage but that wasn't the case.

## What we learned

- How to create a npm package
- How to create a browser extension
- How to use the web3.storage API for pinning content on IPFS
- How IPFS creates content IDs.

## What's next for Browserconfig - Custom browser profiles

- develop a small UI for the chrome extension
- develop an algorithm that verifies that the config a website gets from IPFS is in the correct format
- talk with website owners and see if they would like to use our npm package

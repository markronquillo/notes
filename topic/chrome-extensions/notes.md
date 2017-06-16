## Chrome Extensions

_https://developer.chrome.com/extensions/getstarted_

What are extensions? -- these are small software prgrams that can modify and enhance the functionality of the Chrome browser.

#### Creating our first chrome extension

First, create your manifest file. The `manifest.json` file is just a file that contains metadata information. For the full documentation of the format go to _https://developer.chrome.com/extensions/manifest_.

`icon.png` - 19px-square PNG file

`popup.html` - will be rendered inside the popup window that's created in response to a user's click on the browser action.

`popup.js` - The actual logic of rendering the content of the popup is implemented by this file.

#### Load the extension

Extensions that you download from the Chrome web store are packaged up as .crx files, which is great for distribution but not so great for development

To try what you did in development,

1. Visit `chrome://extensions` in your browser
2. Check `Developer mode`
3. Click `Load unpacked extensions`.
4. Navigate to the directory in whcih your extension files live and select it.

----


Notes:

Basically, creating a chrome extension needs a `manifest.json` file that defines configurations and informations about your chrome extension. 

In the `Show Pussy Cat` chrome extension, we want to display a cat image in the popup html. To do this we provide an html that loads a random image using the `lorempixel.com/200/200/cats` url. This will ensure that everytime we refresh we get a new cat picture. Curious on how chrome knows what html file to load? It is defined in your `manifest.json` file. Under the `browser_actions.default_popup` configuration you can see that we defines `index.html` to be our default popup html file. For JS files, we can include it in the `index.html` file now. So whether we deploy a traditional JS site or using frameworks, it doesn't matter. It will work.

For the development setup, in your browser, access `chrome://extensions` to view the list of your chrome extensions. We can try our extension by ticking the `Developer Mode` and clicking the `Load unpacked extensions`. This button will show an upload popup, select your project folder, where the `manifest.json` is in the root directory. This will add your extension in the browser. If you update the code, refresh the browser to see the changes.










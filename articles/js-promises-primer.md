https://developers.google.com/web/fundamentals/getting-started/primers/promises

JS is single threaded, meaning that two bits of script cannot run at the same time; they hav e to run one after the other.


At their most basic, promises are a bit like event listeners except:
- A promise can only succeed or fail once, It cannot succeed or fail twice, neither can it switch from success to failure or vice versa.

- If a promize has succeeded or failed and you later add a success/failer callback, the correct callback will be called, even though the event took place earlier.




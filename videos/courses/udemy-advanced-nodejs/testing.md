```javascript

test('We can launch a browser', async () => {
	cosnt text = await page.$eval('a.brand-logo', el => el.innerHTML);
	expect(text).toEqual('Blogster');
});
```
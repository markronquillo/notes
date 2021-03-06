const puppeteer = require('puppeteer');
const sessionFactory = require('./factories/sessionFactory');

let browser, page;

beforeEach(async () => {
	browser = await puppeteer.launch({
		headless: false
	})
	page = await browser.newPage();
	await page.goto('localhost:3000')
})

afterEach(async () => {
	await browser.close()
})

test('the header has the correct text', async () => {
	const text = await page.$eval('a.brand-logo', el => el.innerHTML);
	expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow', async () => {
	await page.click('.right a');
	const url = await page.url();

	expect(url).toMatch(/accounts\.google\.com/);
});

test.only('when signed in, show logout button', async () => {

	const { session, sig } = sessionFactory();

	// we set the cookies
	await page.setCookie({ name: 'session', value: session });
	await page.setCookie({ name: 'session.sig', value: sig });

	// then simulate refresh page
	await page.goto('localhost:3000');

	await page.waitFor('a[href="/auth/logout"]');

	const logout = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
	expect(logout).toEqual('Logout');
})



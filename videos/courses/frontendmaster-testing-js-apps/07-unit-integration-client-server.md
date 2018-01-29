Mocking axios

```javascript
import axios from 'axios';

jest.mock('axios', () => {
	return {
		create() {
			return { get, put, post, delete };
		}
	}
});
```

What axios does is it moves the `jest.mock` code before the import so that jest can mock it before we load the real axios.





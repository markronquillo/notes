const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const {Todo} = require('../models/todo');

const todos = [{
  text: 'First'
}, {
  text: 'Second'
}]

beforeEach((done) => {
	Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Test todo text';
		request(app)
			.post('/todos')
			.send({ text })
			.expect(200)	
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				Todo.find().then((todos) => {
					// expect(todos.length).toBe(1);
					// expect(todos[0].text).toBe(text);
					done();
				})
				.catch((e) => done(e));
			})
	});

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .expect(400)  
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          // expect(todos.length).toBe(0);
          done();
        })
        .catch((e) => done(e));
      })
  });
});

describe('GET /todos', () => {
  it('should get all the todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(() => {
        Todo.find()
          .then((todos) => {
            expect(todos.length).toBe(2);
          })
      })
      .end(done)
  });
});

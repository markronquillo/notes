# Chapter 11: The Container


The `Laravel container` or `Dependency Injection Container` is a simple tool you can use to bind and resolve concrete instances of classes and interfaces, and at the same time its a powerful and nuanced manager of a network of interrelated dependencies.

Other names

1. Application container
2. Inversion of Control container
3. Service container
4. Dependency injection container

_Dependency injection means that, rather than being instantiated within a class, each class's dependencies will be injected in from the outside._

`constructor` and `setter` injection.

The primary benefits of dependency injection are that it gives us the freedom to change what we're injecting, mock dependencies for testing, and instantiate shared dependencies just once for shared use.

The simplest way to `make` a concrete instance is to use the global helper and pass the class or interface name directly to the helper -- using `app('FQCN')`.


By using the container, we can make a concrete instance of the class, but the question is what if there are classes that have constructor dependencies?

The app container uses a technique called `Autowiring` where it resolves dependencies using typehinted parameters - _resolving instances based on type-hints without the developer nedding to explicitly bind those classes in the container_.

```php
class Bar { ... }
class Baz { ... }
class Foo {
    public function __construct(Bar $bar, Baz $baz)
}
$foo = app(Foo::class);
```

This is easy but how about those classes with dependencies that can't be typehinted? In these cases, we need to explicitly bind something to the container.

1. Binding to a closure

    ```php
    public function register()
    {
        $this->app->bind(Logger::class, function($app) {
            return new Logger('\log\path\here', 'error');
        });
    }
    ```

    There is an appropriate place to bind the container, and it is in the service provider's `register()` method.

2. Binding to Singletons, Aliases, and Instances

    The repercussions about passing a closure in binding to the container, is that everytime we call the `app('FQCN')` it calls the closure. If we want the result to be cached so that this closure is run only once, you can use the Singleton pattern. `$this->app->singleton()`

    ```php
    public function register() {
        $this->app->singleton(Logger::class, function() {
            return new Logger(...);
        })        
    }
    ```

3. Binding a Concrete Instance to an Interface

    We can also bind to an interface. This is powerful in such case that we can typehint interfaces instead of class names.

    ```php
    use Interfaces\Mailer;

    class UserMailer {
        public function __construct(Mailer $mailer) { ... }
    }

    public function register()
    {
        $this->app->bind(\Interfaces\Mailer::class, function() {
            return MailgunMailer(...);
        });
    }
    ```

    We can register an interface and resolves to a class conforming to that interface in the app container.

    Facades translate static calls to normal method calls on instances.

    __How Facades Work__
    
    Every facade has a single method `getFacadeAccessor()`. This defines the key that Laravel should use to look up this facade's backing instance form the container.

    ```php
    // so when we 
    Log::error('Help!');

    // inside it does this
    app('log')->error('Help!);
    ```

    __How to make your own Facades__
    - Create a class that extends `Illuminate\Support\Facades\Facade` and give it a `getFacadeAccesor()` method which returns a string that can be use to resolve your backing class from the container. 
    - Lastly, register your facade by adding it the aliases array in `config/app.php`.

    Facades are simple shortcuts that make it easy to use static calls on a root namespaces class to call nonstatic methods on classes resolved out of the container.

# Chapter 12: Testing

### Tools

`PHPUnit`, `Mockery`, `PHPSpec`

### Terms

`Unit Tests` - targets small, relatively isolated units -- a class or method usually

`Integration tests` - test the way individual units work together and pass messages.

`Application tests` - often called acceptance or functional tests, application tests the entire behavior of the application, usually at an outer boundary by employing somethign like a document object model (DOM) crawler

### Testing Traits

`WithoutMiddleware` - this will disable all middleware for any test in that class. This means you won't have to worry about the authentication middleware or CSRF protection.

`DatabaseMigrations` - If you import this trait, it will run your entire set of database migrations up before each test and down after each test.

`DatabaseTransactions` - this trait expects your database to be properly migrated before tests start. Then it wraps every test in a database transaction which it rolls back at the end of test.

---

`TestCase`

`$this->visit($uri)`

Mockery -- shouldIgnoreMissing
```php
class SlackClient
{
    public function send(...) {...}
}

class Notifier
{
    private $slack;
    public function __construct(SlackClient $slack) 
    {
        $this->slack = $slack;
    }

    public function notifyAdmins($message)
    {
        $this->slack->send($message, 'admins');
    }
}

// tests/NotifierTest.php
public function test_notifier_notifies_admins()
{
    $slack = Mockery::mock(SlackClient::class)->shouldIgnoreMissing();

    $notifier = new Notifier($slackMock);
    $notifier->notifyAdmins('Test');
}
```

Given the `test_notifier_notifies_admins` test above, no matter what `Notifier` calls on `$slackMock` it'll just accept it and return null.

If we want to actually assert that a call was made to the send() method of Slack client we should use the code below.

```php
public function test_notifier_notifies_admins()
{
    $slackMock = Mockery::mock(SlackClient::class);
    $slackMock->shouldReceive('send')->once();

    $notifier = new Notifier($slackMock);
    $notifier->notifyAdmins('Test message');
}
```

What if we wanted to use the `IoC` container to resolve our instance of the Notifier?

```php
public function test_notifier_notifies_admins()
{
    $slackMock = Mockery::mock(SlackClient::class);
    $slackMock->shouldReceive('send')->once();

    app()->isntance(SlackClient::class, $slackMock);
    $notifier = app(Notifier::class);
    $notifier->notifyAdmins('Test message');
}
```

How about `mocking facades`? We want to test that controller method, and assert that the facade call should be made

```php
// PeopleController
public function index()
{

}

public function test_all_people_route_should_be_cached()
{
    $person = factory(Person::class)->make();
    Cache::shouldReceive('remember')
        ->once()
        ->andReturn(collection([$person]));
    $this->visit('people')->seeJson(['name' => $person->name ]);
}
```

# Writing API
Read this last

# Storage and Retrieval

This chapter covers filesystem and in-memory storage, file uploads and manipulations, nonrelational data stores, sessions the cache and full-text search.

`Storage` facade

`Flysystem`

`config/filesystems.php`

Using the Storage Facade

```php
Storage::disk('s3')->get('file.jpg');
// look at the whole Storage facade interface in the docs
```

Basic File Uploads and Manipulation

```php
// Common user upload workflow
class DogsController
{
    public function updatePicture(Request $request, Dog $dog)
    {
        Storage::put('dogs/' . $dog->id,
        file_get_contents($request->file('picture')->getRealPath()));

        // look for Laravel 5.3 store() and storeAs()
    }
}
```

`Intervention` - an image library.

`session()->get('key')`

The difference between `cache` and `session` is that session is per user basis while cache is per application.

`Cache::get('users')` or `cache()->put('key', 'value', Carbon::now()->addDay())`

### Cookies in Laravel

Cookies can exist in three places in Laravel. They can come in via the request, which means the user had the cookie when she visited the page. 

You can get and set cookies in three places. the `Cookie` facade, the `cookie()` global helper and the request and response objects.

Review the `CookieJar` queue.

Setting cookies on response objects.
```php
...
$cookie = cookie('saw-dashboard', true);
return Response::view('dashboard')
    ->cookie($cookie);
```

### Full-Text Search with Laravel Scout

`Laravel Scout` is a separate pacakge that you can bring into your Laravel apps to add full-text search to your Eloquent models. Scout makes it easy to index and search the contents of your Eloquent models, Algolia and ElasticSearch.

`composer require algolia/algoliasearch-client-php`

__Marking Your Model for Indexing__

First, import `Laravel\Scout\Searchable` trait.

Scout subscribes to the create/delete/update events on your marked models. When you create, update or delete any rows, Scout will sync those changes up to Algolia. It'll either make those changes synchronously with your updates or if you configure Scout to use a queue, queue the updates.

`Review::search('Llew')->get();`

# Mail and Notifications

### Mail

`SwiftMailer`

`config/services.php` and `config/services.php`

### Notifications

`php artisan make:notification WorkoutAvailable`

- Sending notifications using the `Laravel\Notifications\Notifiable` trait.

    Assuming that App\User has the Notifiable trait, we can
    `$user->notify(new WorkoutAvailable($workout));`

- Sending notifications with the Notification facade

    Notification::send(User::all(), new WorkoutAvailable($workout));

## Queues, Job, Events, Broadcasting and the Scheduler







 






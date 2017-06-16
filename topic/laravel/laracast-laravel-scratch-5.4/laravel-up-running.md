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











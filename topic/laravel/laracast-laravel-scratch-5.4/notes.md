## 9 Route Model Binding 

We can automatically get the corresponding Model in the given route parameter via Route Model Binding. The criteria is that the parameter name defined in the routes should be the same with the parameter in your controller method.

```php
// in routes.php/web.php
Route::get('/tasks/{task}', 'TasksController@show)');
// in controllers.php
public function show(Task $task)
{
    return $task;
}
```


## 12 Form Validation 101

```php
public function store()
{
    $this->validate(request()->all(), [
        'username' => 'required'
    ]);
}
```

## 17 Rapid Authentication and Configuration

Run `php artisan make:auth` to create pre-built authentication module.

When you set mail config to log, you can view it in the logs folder.

## 21 View Composers

If we want to attach data to all (or views that uses a sub-view template), we can use view composers to achieve that.

```php
// inside AppServiceProvider.php
public function boot()
{
    view()->composer('layouts.sidebar', function($view) {
        $view->with('archives', \App\Post::archives());
    });
}
```

## 23 DI, Auto Resolutions and Repositories

Repository - a collection of things, 

## 24 Service Containers

The service container is the heart of Laravel, any and all registered dependencies will be resolved out of it.

If we want to include `Stripe` class in our service container.

```php
// bind to the container
App::bind('App\Billing\Stripe', function() {
    return \App\Billing\Stripe(config('...'));
});

// or
resolve('App\Billing\Stripe');


// resolve
$stripe = App::make('App\Biling\Stripe');
```

The problem is that we shouldn't just bind our classes to the container anywhere in our code. There is a proper place for the binding.

## 25 Service Provider.

```php
// in AppServiceProvider.php
public function register()
{
    // insert bind code here
    $this->app->bind(...);
}
```

Inside your Provider file, you can set a property of `$defer = true` to lazy load that file/class. But you cannot do this if you have a boot method defined.

## 25 Sending Email


## 26 Markdown Mail

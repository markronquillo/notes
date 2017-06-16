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

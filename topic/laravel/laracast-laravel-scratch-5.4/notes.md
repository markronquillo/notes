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

`php artisan make:mail Welcome`

\Mail::to($user)->send(new Welcome);

`Mail Trap`

## 26 Markdown Mail

`php artisan make:mail WelcomeAgain --markdown="emails.welcome-again"`

If we want to customize the style of the email, we should run the command below and this will copy the mail blade files + css to our resources/.

`php artisan vendor:publish --tag=laravel-mail`

After that we need to specify in `mail.php` that we are using the customized resources and not the default.

Check the documentation for more information. 


### Form Requests and Form Objects

```php
public function rules()
{
    return [
        'name' => 'required'
        ...
    ]
}

public function persist()
{
    $user = User::create(
        $this->only(['name', 'email', 'password'])
    );

    auth()->login($user);
    Mail::to($user)->send(new Welcome($user));
}

```

### Session handling and Flash messaging

```php
session()->flash('message');
```

### Tags and Pivot Tables

```php
Schema::create('post_tag', function(Blueprint $table) {
    $table->integer('post_id');
    $table->integer('tag_id');
    $table->primary(['post_id', 'tag_id']);
});

// Post.php

public function tags()
{
    return $this->belongsToMany(\App\Tag::class);
}

// usage
$post->tags->pluck('name'); // will return list of tag names

// n + 1 problem, for every query row, we then query another because we are inefficient haha
```

### Sorting Posts by Tags


### Eventing

`EventServiceProvider.php`

`php artisan make:event`

`php artisan make:listener`








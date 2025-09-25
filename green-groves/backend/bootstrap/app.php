<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Register custom middleware
        $middleware->alias([
            'api.auth' => \App\Http\Middleware\ApiAuth::class,
            'admin.auth' => \App\Http\Middleware\AdminAuth::class,
            'cors' => \App\Http\Middleware\CorsMiddleware::class,
        ]);

        // Apply CORS middleware globally
        $middleware->web(append: [
            \App\Http\Middleware\CorsMiddleware::class,
        ]);

        $middleware->api(append: [
            \App\Http\Middleware\CorsMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();

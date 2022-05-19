<?php

namespace App\Http\Middleware;

use Closure;

class CheckTypeUser2
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ( !auth()->check() )
          return redirect()->route('login');
          $type = auth()->user()->type;

          if ( $type == 2 || $type == 3 )
            return redirect('/');

        return $next($request);
    }
}

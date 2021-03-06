<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">


    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <link rel="icon" href="/images/logo.svg" type="image/svg" />

    <style>
        div.card-header {
            background-color: #0d6efd;
            color: white;
        }
    </style>
</head>

<body>
    <div id="app">

        <a href="/"><button class="btn btn-outline-light" style="position: absolute; display: flex;
    align-items: center; color: #222222f0; top: 10px; left: 10px; border: 1px solid #222222f0; border-radius: 22px;"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#222222f0" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H6M12 5l-7 7 7 7" />
                </svg>Back</button></a>


        <main>
            @yield('content')
        </main>
    </div>
</body>

</html>
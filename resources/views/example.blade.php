<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrfToken" content="{{ csrf_token() }}">

    <title>placeBook</title>
    <link rel="icon" href="/images/logo.svg" type="image/svg" />
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">


    <!-- Styles -->

    <style>
        html {
            scroll-behavior: auto !important;
        }

        body {
            font-family: 'Nunito', sans-serif;
        }
    </style>
</head>

<body class="antialiased">

    <div id="main"></div>
    <script>
        let authUser = null;
        if ('{!! Auth::check() !!}') {
            authUser = JSON.parse('{!! Auth::user() !!}')
        }
    </script>
    <script src="{{asset('js/app.js')}}">
    </script>
</body>

</html>
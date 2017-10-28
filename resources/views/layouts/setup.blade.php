<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="content-type" content="text/html; charset=utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<meta name="apple-mobile-web-app-title" content="Statman">
		<meta name="application-name" content="Statman">
		<meta name="theme-color" content="#000000">
		<link rel="shortcut icon" href="{{ secure_asset("/resources/assets/img/favicon.ico") }}">
		<title>Statman</title>
		<link rel="stylesheet" href="{{ secure_asset("/resources/assets/css/app.css") }}">
	</head>
	<body onload="loadPage()" class="setup">
			<div class="container">
				@yield('content')
			</div>
		<script src={{ secure_asset("/resources/assets/js/app.js") }}></script>
	</body>
</html>

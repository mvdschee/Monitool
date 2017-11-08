<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="content-type" content="text/html; charset=utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="robots" content="index, follow">
		<meta property="og:type" content="website">
		<meta property="og:url" content="https://statman.nl/">
		<meta property="og:locale" content="nl_NL">
		<meta property="og:site_name" content="Statman">
		<meta property="og:title" content="Statman">
		<meta property="og:description" content="Tracking and managing your story can be challenging, in order to help you engage with your story on a deeper level we developed a tool. The tool allows you to track your story on multiple platforms.">
		<meta property="og:image" content="{{ URL::asset("/resources/assets/img/statman.svg") }}">
		<meta name="description" content="Tracking and managing your story can be challenging, in order to help you engage with your story on a deeper level we developed a tool. The tool allows you to track your story on multiple platforms.">
		<meta name="keywords" content="statman,analytics,tracking,social media">
		<meta name="author" content="YumYum">
		<meta itemprop="name" content="Statman">
		<meta itemprop="headline" content="Statman">
		<meta itemprop="description" content="Tracking and managing your story can be challenging, in order to help you engage with your story on a deeper level we developed a tool. The tool allows you to track your story on multiple platforms.">
		<meta itemprop="image" content="{{ URL::asset("/resources/assets/img/statman.svg") }}">
		<link rel="shortcut icon" href="{{ URL::asset("/resources/assets/img/statman-line.svg") }}">

		<title>Statman | Home</title>

		<link rel="stylesheet" href="{{ URL::asset("/resources/assets/css/home.css") }}">

		<script type="text/javascript">
			var _paq = _paq || [];
			_paq.push(['trackPageView']);
			_paq.push(['enableLinkTracking']);
			(function() {
				var u="https://analytics.ewake.nl/";
				_paq.push(['setTrackerUrl', u+'piwik.php']);
				_paq.push(['setSiteId', '6']);
				var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
				g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
			})();
		</script>
		<noscript><p><img src="https://analytics.ewake.nl/piwik.php?idsite=6&rec=1" style="border:0;" alt="" /></p></noscript>
	</head>

	<body id="top" class="home">
		<header id="scroll" class="header" itemscope itemtype="https://schema.org/WPHeader">
			<h1 class="hide-from-layout">Statman</h1>
			<a class="logo" href="/">Statman</a>

			<input type="checkbox" id="hamburger" class="trigger_1">
			<label for="hamburger" class="execute_1 execute_2"></label>

			<nav class="navigation execute_1 execute_2" itemscope itemtype="https://schema.org/SiteNavigationElement">
				<h2 class="nocontent hide-from-layout">Navigation</h2>
				<ul class="navigation-group">
					@if (Route::has('login'))
							@if (Auth::check())
								<li class="navigation-item"><a href="{{ url('/story-list') }}" itemprop="url">Dashboard</a></li>
							@else
								<li class="navigation-item"><a href="{{ url('/login') }}" itemprop="url">Login</a></li>
								<li class="navigation-item last"><a href="{{ url('/register') }}" itemprop="url">Sign up</a></li>
							@endif
					@endif
				</ul>
			</nav>
		</header>
		<span class="trigger_2 black-filter execute_1 execute_2"></span>
		<div class="content-wrapper">
			<main class="main" itemprop="mainContentOfPage">
				@yield('content')
			</main>
		</div>

		<footer class="footer" itemscope itemtype="https://schema.org/WPFooter">
			<h2 class="nocontent hide-from-layout">Footer</h2>
			<ul class="navigation-group">
				<li class="navigation-item"><a href="#" itemprop="url">Privacy</a></li>
				<li class="navigation-item"><a href="#" itemprop="url">About</a></li>
				<li class="navigation-item"><a href="#" itemprop="url">Terms</a></li>
				<li class="navigation-item"><a href="#" itemprop="url">Contact</a></li>
				<li class="navigation-item"><a href="#" itemprop="url">Help</a></li>
			</ul>
			<h3>Statman</h3>
			<p><img src="{{ URL::asset("/resources/assets/img/heart.png") }}" alt="heart"> YumYum</p>
		</footer>
		<script src={{ URL::asset("/resources/assets/js/resources/classtoggle.min.js") }}></script>
		<script src={{ URL::asset("/resources/assets/js/home.js") }}></script>
	</body>
</html>

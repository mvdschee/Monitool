@extends('layouts.master')
@section('content')

<!-- Fonts -->
<link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
<div class="panel">
   @if(isset($posts))
      @foreach($posts as $accounts)
         @foreach($accounts->data as $post)
            {{-- {{dd($post)}} --}}
            <div><p>likes: {{$post->likes->count}}</p></br>
               <p>comments: {{$post->comments->count}}</p>
               <img src="{{$post->images->standard_resolution->url}}">
            </div>
         @endforeach
      @endforeach
   @endif
</div>
<script type="text/javascript" src="{{ URL::asset("assets/js/lib/jquery-3.2.1.js") }}"></script>
<script type="text/javascript" src="{{ URL::asset("assets/js/dashboards/connect.js") }}"></script>
@endsection

@extends('app')

@section('aimeos_head')
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
@stop

@section('aimeos_styles')
    <link rel="stylesheet" href="{{ asset('themes/skybloom/common.css') }}" />
    <link rel="stylesheet" href="{{ asset('themes/skybloom/aimeos.css') }}" />
@stop

@section('aimeos_scripts')
    <script type="text/javascript" src="{{ asset('themes/jquery-ui.custom.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('themes/aimeos.js') }}"></script>
    <script type="text/javascript" src="{{ asset('themes/skybloom/aimeos.js') }}"></script>
@stop

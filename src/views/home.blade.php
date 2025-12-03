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

@section('content')
<div class="aimeos sky-bloom-theme">
    <!-- Hero Section -->
    <section class="hero-section sky-gradient text-center py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-8">
                    <h1 class="fade-in">
                        {{ trans('messages.Welcome') }}
                        <span class="floral-decoration">✿</span>
                    </h1>
                    <h2 class="slide-up">{{ trans('messages.Thejoflowers') }}</h2>
                    <p class="lead slide-up">{{ trans('messages.Korean Florist') }}</p>
                    <div class="hero-actions slide-up">
                        <a href="{{ url('shop') }}" class="btn btn-primary">
                            {{ trans('messages.Shop') }}
                        </a>
                        <a href="{{ url('collections') }}" class="btn btn-secondary">
                            {{ trans('messages.Collections') }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products py-5">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="text-center mb-4">
                        {{ trans('messages.Fresh Flowers') }}
                        <span class="floral-decoration">✿</span>
                    </h2>
                </div>
            </div>
            <div class="product-list">
                <!-- Product 1 -->
                <div class="col-12 col-md-4 fade-in">
                    <div class="card floral-border">
                        <div class="product-image">
                            <img src="https://via.placeholder.com/300x200/F3E8D3/A97C50?text=Rose+Bouquet" alt="Rose Bouquet" />
                        </div>
                        <div class="product-name">
                            {{ trans('messages.Beautiful Bouquets') }}
                        </div>
                        <div class="product-price">
                            ₩49,000
                        </div>
                        <div class="product-description">
                            {{ trans('messages.Fresh Flowers') }} with premium quality
                        </div>
                        <button class="btn btn-primary btn-quick-add" data-product-id="1">
                            {{ trans('messages.Add to Basket') }}
                        </button>
                    </div>
                </div>

                <!-- Product 2 -->
                <div class="col-12 col-md-4 fade-in">
                    <div class="card floral-border">
                        <div class="product-image">
                            <img src="https://via.placeholder.com/300x200/D7ECFA/A7D8F0?text=Spring+Collection" alt="Spring Collection" />
                        </div>
                        <div class="product-name">
                            {{ trans('messages.Spring Collection') }}
                        </div>
                        <div class="product-price">
                            ₩59,000
                        </div>
                        <div class="product-description">
                            {{ trans('messages.Floral Arrangements') }} for special moments
                        </div>
                        <button class="btn btn-primary btn-quick-add" data-product-id="2">
                            {{ trans('messages.Add to Basket') }}
                        </button>
                    </div>
                </div>

                <!-- Product 3 -->
                <div class="col-12 col-md-4 fade-in">
                    <div class="card floral-border">
                        <div class="product-image">
                            <img src="https://via.placeholder.com/300x200/B7D8A8/F6B6A5?text=Wedding+Package" alt="Wedding Package" />
                        </div>
                        <div class="product-name">
                            {{ trans('messages.Wedding Flowers') }}
                        </div>
                        <div class="product-price">
                            ₩159,000
                        </div>
                        <div class="product-description">
                            Complete {{ trans('messages.Wedding Flowers') }} package
                        </div>
                        <button class="btn btn-primary btn-quick-add" data-product-id="3">
                            {{ trans('messages.Add to Basket') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services-section meadow-gradient py-5">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="text-center mb-4">
                        {{ trans('messages.Services') }}
                        <span class="floral-decoration">✿</span>
                    </h2>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-4 text-center">
                    <div class="service-card">
                        <div class="service-icon">🚚</div>
                        <h3>{{ trans('messages.Same Day Delivery') }}</h3>
                        <p>{{ trans('messages.Order') }} before 2 PM for {{ trans('messages.Same Day Delivery') }}</p>
                    </div>
                </div>
                <div class="col-12 col-md-4 text-center">
                    <div class="service-card">
                        <div class="service-icon">💝</div>
                        <h3>{{ trans('messages.Special Occasions') }}</h3>
                        <p>{{ trans('messages.Beautiful Bouquets') }} for {{ trans('messages.Special Occasions') }}</p>
                    </div>
                </div>
                <div class="col-12 col-md-4 text-center">
                    <div class="service-card">
                        <div class="service-icon">⭐</div>
                        <h3>{{ trans('messages.Premium Quality') }}</h3>
                        <p>{{ trans('messages.Fresh Flowers') }} with guaranteed quality</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter-section sunshine-gradient py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 text-center">
                    <h2 class="mb-3">{{ trans('messages.Newsletter') }}</h2>
                    <p class="mb-4">{{ trans('messages.Subscribe to our newsletter') }}</p>
                    <form class="newsletter-form">
                        <div class="form-group">
                            <input type="email" class="form-control" placeholder="{{ trans('messages.Enter your email') }}" required>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            {{ trans('messages.Subscribe') }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Information -->
    <section class="contact-section py-5">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-4">
                    <div class="contact-card">
                        <h3>{{ trans('messages.Contact Us') }}</h3>
                        <p>📧 hello@thejoflowers.com</p>
                        <p>📞 +82 2-1234-5678</p>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="contact-card">
                        <h3>{{ trans('messages.Opening Hours') }}</h3>
                        <p>{{ trans('messages.Monday - Friday') }}: 9AM - 8PM</p>
                        <p>{{ trans('messages.Saturday') }}: 10AM - 6PM</p>
                        <p>{{ trans('messages.Sunday') }}: {{ trans('messages.Closed') }}</p>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="contact-card">
                        <h3>{{ trans('messages.Follow Us') }}</h3>
                        <div class="social-links">
                            <a href="#" class="social-link">{{ trans('messages.Instagram') }}</a>
                            <a href="#" class="social-link">{{ trans('messages.Facebook') }}</a>
                            <a href="#" class="social-link">{{ trans('messages.Twitter') }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection

@section('aimeos_scripts')
    <script type="text/javascript" src="{{ asset('themes/jquery-ui.custom.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('themes/aimeos.js') }}"></script>
    <script type="text/javascript" src="{{ asset('themes/skybloom/aimeos.js') }}"></script>

    <script>
        // Initialize Sky Bloom Garden theme
        $(document).ready(function() {
            if (window.SkyBloomGarden) {
                window.SkyBloomGarden.init();
            }
        });
    </script>
@endsection
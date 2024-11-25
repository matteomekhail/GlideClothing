    <?php

    use App\Http\Controllers\ProfileController;
    use Illuminate\Foundation\Application;
    use Illuminate\Support\Facades\Route;
    use Inertia\Inertia;
    use App\Http\Controllers\CheckoutController;
    use App\Http\Controllers\BlogPostController;
    use App\Http\Controllers\CartController;

    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });

    Route::get('/FAQ', function () {
        return Inertia::render('FAQ', [
        ]);
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('/blog', [BlogPostController::class, 'index'])->name('blog.index');
    Route::get('/blog/{slug}', [BlogPostController::class, 'show'])->name('blog.show');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::post('/create-checkout-session', [CheckoutController::class, 'createCheckoutSession'])->withoutMiddleware(['web']);

    Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
    Route::get('/purchase/confirmation', function () {
        return view('purchase.confirmation');
    })->name('purchase.confirmation');
    Route::get('/purchase/error', function () {
        return view('purchase.error');
    })->name('purchase.error');

    Route::get('/checkout/cancel', [CheckoutController::class, 'cancel'])->name('checkout.cancel');

    Route::get('/login-register', function () {
        return Inertia::render('LoginRegister', [
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    })->middleware('guest')->name('login-register');

    Route::post('/cart', [CartController::class, 'store']);

    require __DIR__ . '/auth.php';

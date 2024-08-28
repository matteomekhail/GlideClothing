<!-- resources/views/purchase/confirmation.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purchase Confirmation - ShadowStack</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 dark:bg-gray-900">
    <div class="min-h-screen flex items-center justify-center">
        <div class="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <div class="text-center">
                <svg class="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <h2 class="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">Purchase Successful!</h2>
                <p class="mt-3 text-xl text-gray-600 dark:text-gray-300">
                    Thank you for purchasing ShadowStack. We're excited to have you on board!
                </p>
            </div>

            <div class="mt-10">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">Next steps:</h3>
                <ul class="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                    <li class="flex items-start">
                        <svg class="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Check your email for access to the private repository.
                    </li>
                    <li class="flex items-start">
                        <svg class="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Follow the instructions in the email to set up your development environment.
                    </li>
                    <li class="flex items-start">
                        <svg class="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Explore the included documentation to start using ShadowStack.
                    </li>
                </ul>
            </div>

            <div class="mt-10 flex justify-center">
                <a href="/" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Return to Homepage
                </a>
            </div>

        </div>
    </div>
</body>
</html>

const faqData = [
  {
    question: "What is this boilerplate for?",
    answer: "This boilerplate is designed to quickly set up a modern web application using Laravel as the backend framework, React for the frontend, Inertia.js for seamless single-page app-like experiences, and Shadcn UI for beautiful, accessible components."
  },
  {
    question: "How do I get started with this boilerplate?",
    answer: "To get started, clone the repository, run `composer install` to install PHP dependencies, `npm install` for JavaScript dependencies, set up your `.env` file, run migrations with `php artisan migrate`, and then start the development server with `php artisan serve` and `npm run dev`."
  },
  {
    question: "What are the main features of this boilerplate?",
    answer: "Key features include: Laravel 10+ for robust backend logic, React 18+ for dynamic UIs, Inertia.js for seamless frontend-backend integration, Shadcn UI for customizable UI components, TypeScript support, and pre-configured authentication."
  },
  {
    question: "How can I customize the Shadcn UI components?",
    answer: "Shadcn UI components are highly customizable. You can modify the base styles in the `tailwind.config.js` file, and each component can be further customized by editing its respective file in the `components/ui` directory."
  },
  {
    question: "Is this boilerplate suitable for large-scale applications?",
    answer: "Yes, this boilerplate is designed to scale. Laravel provides a solid foundation for complex backend logic, while React and Inertia offer excellent performance and maintainability for large frontend applications."
  },
  {
    question: "How do I add new pages or components?",
    answer: "To add new pages, create a new component in the `resources/js/Pages` directory and define a route for it in `routes/web.php`. For new components, add them to the `resources/js/Components` directory and import them where needed."
  },
  {
    question: "Can I use this boilerplate with a different database than the default?",
    answer: "Absolutely! Laravel supports various databases. You can change the database configuration in the `.env` file and update the `config/database.php` file if necessary to switch to a different database system."
  },
  {
    question: "How do I deploy this application?",
    answer: "Deployment will depend on your hosting solution. Generally, you'll need to set up a web server (like Nginx or Apache), ensure PHP and Node.js are installed, set up your environment variables, run migrations, and build your assets for production with `npm run build`."
  },
  {
    question: "Is there built-in support for API development?",
    answer: "Yes, Laravel provides excellent tools for API development. You can create API routes in `routes/web.php` and use Laravel's built-in features like API resources and Sanctum for authentication."
  },
];

export default faqData;

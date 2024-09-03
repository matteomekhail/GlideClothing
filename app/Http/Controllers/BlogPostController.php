<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::latest('published_at')->paginate(10);
        return Inertia::render('Blog/Index', ['posts' => $posts]);
    }

    public function show($slug)
    {
        $post = BlogPost::where('slug', $slug)->firstOrFail();
        return Inertia::render('Blog/Show', ['post' => $post]);
    }
}
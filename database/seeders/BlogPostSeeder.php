<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BlogPost;


class BlogPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BlogPost::create([
            'title' => 'Il nostro primo post',
            'content' => '<p>Benvenuti nel nostro blog!</p>',
            'slug' => 'il-nostro-primo-post',
            'published_at' => now(),
        ]);
    }
}

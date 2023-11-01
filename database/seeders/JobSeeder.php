<?php

namespace Database\Seeders;

use App\Models\Job;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $jobs = json_decode(file_get_contents(__DIR__ . '/jobs.json'), true);

        foreach ($jobs as $job) {
            $newJob = new Job();
            $newJob->company =  $job['company'];
            $newJob->title = $job['title'];
            $newJob->url = $job['url'];
            $newJob->time = $job['time'];
            $newJob->description = $job['description'];
            $newJob->location = $job['location'];
            $newJob->category_id = $job['category_id'];
            $newJob->save();
        }
    }
}

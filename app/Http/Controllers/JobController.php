<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Http\Requests\StoreJobRequest;
use App\Http\Requests\UpdateJobRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Auth::check()) {
            $user = Auth::user();
            $jobs = Job::where('user_id', $user->id)->orderBy('time', 'desc')->get();
            return response()->json($jobs);
        } else {

            return response()->json(['error' => 'Unauthenticated'], 401);
        }
    }

    //continue: show, create and update only with connection to the user
    public function jobsByCategory(Request $request)
    {
        $categoryId = $request->route('category_id');
        $jobs = Job::where('user_id', Auth::id())
            ->where('category_id', $categoryId)
            ->orderBy('time', 'desc')
            ->get();

        return response()->json($jobs);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreJobRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreJobRequest $request)
    {
        $valData = $request->validated();
        $valData['category_id'] = $request->input('category_id');

        $valData['user_id'] = Auth::id();
        $job = Job::create($valData);
        return response()->json(['job' => $job, 'message' => 'Job Added Successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function show(Job $job)
    {
        if ($job->user_id != Auth::id()) {
            return response()->json(['error' => 'You do not have permission to view this job.'], 403);
        }
        $job = Job::find($job->id);
        return response()->json($job);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function edit(Job $job)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateJobRequest  $request
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateJobRequest $request, Job $job)
    {
        $job = Job::find($job->id);
        $valData = $request->validated();
        $valData['category_id'] = $request->input('category_id');

        if ($job->user_id != Auth::id()) {
            return response()->json(['error' => 'You do not have permission to update this job.'], 403);
        }
        $job->update($valData);
        return response()->json(['job' => $job, 'message' => 'Job Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function delete(Job $job)
    {
        $job = Job::find($job->id);

        if ($job->user_id != Auth::id()) {
            return response()->json(['error' => 'You do not have permission to delete this job.'], 403);
        }
        $job->delete();
        return response()->json(['message' => 'Job deleted Successfully']);
    }
}

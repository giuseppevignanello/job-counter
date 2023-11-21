<?php

namespace App\Http\Controllers;

use App\Models\Target;
use App\Models\Job;
use App\Http\Requests\StoreTargetRequest;
use App\Http\Requests\UpdateTargetRequest;
use Illuminate\Support\Facades\Auth;

class TargetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $target = Target::where('user_id', $user->id)->get();
        return response()->json($target);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTargetRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTargetRequest $request)
    {

        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }
        $valData = $request->validated();
        $user = Auth::user();
        $valData['user_id'] = $user->id;
        $target = Target::create($valData);
        return response()->json($target);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Target  $target
     * @return \Illuminate\Http\Response
     */
    public function show(Target $target)
    {
        if ($target->user_id != Auth::id()) {
            return response()->json(['error' => 'You do not have permission to view this target.'], 403);
        }

        $target = Target::find($target->id);
        return response()->json($target);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Target  $target
     * @return \Illuminate\Http\Response
     */
    public function edit(Target $target)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTargetRequest  $request
     * @param  \App\Models\Target  $target
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTargetRequest $request, Target $target)
    {

        $user = Auth::user();
        if ($user->id !== $target->user_id) {
            return response()->json(['error' => 'You do not have permission to update this target.'], 403);
        }

        $target = Target::find($target->id);
        $valData = $request->validated();
        $target->update($valData);
        return response()->json(['target' => $target, 'message' => 'Target Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Target  $target
     * @return \Illuminate\Http\Response
     */
    public function delete(Target $target)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }
        $target = Target::find($target->id);
        $target->delete();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Target;
use App\Models\Job;
use App\Http\Requests\StoreTargetRequest;
use App\Http\Requests\UpdateTargetRequest;

class TargetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $target = Target::all();
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
        $valData = $request->validated();
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
        //
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
        $target = Target::find($target->id);
        $valData = $request->validated();
        $target->update($valData);
        return response()->json($target);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Target  $target
     * @return \Illuminate\Http\Response
     */
    public function delete(Target $target)
    {
        $target = Target::find($target->id);
        $target->delete();
    }
}

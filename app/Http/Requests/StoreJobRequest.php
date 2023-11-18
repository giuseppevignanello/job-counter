<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'company' => 'required',
            'title' => 'required',
            'url' => 'required',
            'time' => 'required',
            'description' => 'nullable',
            'location' => 'nullable',
            'category_id' => ['exists:categories,id'],
            'user_id' => ['exists:user,id']
        ];
    }
}

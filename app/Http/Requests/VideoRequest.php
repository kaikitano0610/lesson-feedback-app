<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VideoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'youtube_link' => 'required|url',
            'subject' => 'required|string|max:255',
            'school_type' => 'required|string|max:255',
            'grade' => 'required|string|max:255',
            'pdf_path' => 'required|string|max:255'
        ];
    }
}

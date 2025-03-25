<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
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
        $rules = [
            'time' => 'required',
            'evaluation' => 'required|in:good,improvement',
            'feedback_category' => 'required|in:speech/communication,board/materials,activity/development',
            'comment_content' => 'required|string|max:140',
            'x_coordinate' => 'required|numeric',
            'y_coordinate' => 'required|numeric',
        ];
        if ($this->isMethod('post')) { // store メソッド用
            $rules['video_id'] = 'required|exists:videos,id';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'comment_content.max' => 'コメントは140文字以内で入力してください。',
        ];
    }
}

<?php

namespace App\Http\Controllers\Auth;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|between:3,25',
            'email' => 'required|email',
            'password' => "required|min:8|regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&'])/|confirmed"
        ], [
            'name.between' => 'The name field must be between 3 and 25 characters.',
            'email.email' => 'The email must be a valid email address.',
            'password.regex' => 'The password must contain at least one uppercase letter, one number, and one special character.',
            'password.min' => 'The password must be at least 8 characters.',
            'password.confirmed' => 'The password confirmation does not match.'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        return response($user, Response::HTTP_CREATED);
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ], [
            'email.email' => 'The email must be a valid email address.',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $user = Auth::user();
            if ($user instanceof User) {
                $token = $user->createToken('token')->plainTextToken;
                $cookie = cookie('cookie_token', $token, 60 * 24);
                return response(["token" => $token], Response::HTTP_OK)->withCookie($cookie);
            } else {
                return response("Error: User not found");
            };
        } else {
            return response(["message" => "Invalid Credentials"], Response::HTTP_UNAUTHORIZED);
        }
    }
    public function userProfile(Request $request)
    {
        return response()->json([
            "message" => "UserProfile Ok",
            "userData" => auth()->user()
        ], Response::HTTP_OK);
    }
    public function logout()
    {
        $cookie = Cookie::forget('cookie_token');
        return response(['message' => "Logout OK"], Response::HTTP_OK)->withCookie($cookie);
    }
}

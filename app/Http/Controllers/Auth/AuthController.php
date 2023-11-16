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
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed'
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

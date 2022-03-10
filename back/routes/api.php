<?php

use App\Http\Controllers\API\AuthenticationController;
use App\Http\Controllers\API\SurveyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\SessionController;
use App\Http\Controllers\API\ResponseController;
use App\Http\Controllers\API\QuestionController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\UserResponseController;
use App\Http\Controllers\API\AddressController;
use App\Http\Controllers\API\CampaignController;
use App\Http\Controllers\API\MetricsController;
use App\Http\Controllers\API\UserSessionController;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/create-account', [AuthenticationController::class, 'createAccount']);

Route::post('/login', [AuthenticationController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', function (Request $request) {
        $user = auth()->user();
        return User::with('address')->where('id', '=', $user->id)->first();
    });

    Route::post('/logout', [AuthenticationController::class, 'logout']);

    Route::apiResource("users", UserController::class); // Les routes "users.*" de l'API
    Route::apiResource("sessions", SessionController::class);
    Route::apiResource("responses", ResponseController::class);
    Route::apiResource("questions", QuestionController::class);
    Route::apiResource("user-responses", UserResponseController::class);
    Route::apiResource("addresses", AddressController::class);
    Route::apiResource("users-sessions", UserSessionController::class);
    Route::apiResource("campaigns", CampaignController::class);
    Route::get("campaigns/{campaign}/requests", [CampaignController::class, 'requests']);
    Route::post("campaigns/{campaign}/request", [CampaignController::class, 'request']);

    Route::get('/get-sessions-users', [SessionController::class, 'getSessionsWithUsers']);
    Route::get('/get-session-user/{session}', [SessionController::class, 'getSessionsWithUsersById']);
    Route::post('/sessions/{session}/accept-user', [SessionController::class, 'acceptUser']);

    Route::get('/survey/{session}', [SurveyController::class, 'show']);
    Route::post('/upload-survey', [SurveyController::class, 'store']);
    Route::post('/answer', [SurveyController::class, 'answer']);

    Route::get('/metrics/{session}', [MetricsController::class, 'getSessionMetrics']);
});


Route::apiResource("products", ProductController::class);


    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer 3|CKHql4fj1xPHuvmggN8hHC8FQrK2LXXVI4dwv4JH");

    // var formdata = new FormData();
    // formdata.append("survey", fileInput.files[0], "DataSBS-TuboVivoV4_vsv.xlsx - Questions - DataSBS-TuboVivoV4_vsv.xlsx - Questions.csv");
    // formdata.append("product_id", "1");

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: formdata,
    //   redirect: 'follow'
    // };

    // fetch("http://hackathon.alexis-guay.fr/api/upload-survey", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));


    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer 3|CKHql4fj1xPHuvmggN8hHC8FQrK2LXXVI4dwv4JH");

    // var requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow'
    // };

    // fetch("http://hackathon.alexis-guay.fr/api/survey/1", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

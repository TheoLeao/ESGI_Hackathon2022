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
// var myHeaders = new Headers();
// myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjZGR1hDazljNXBRTms0T1h0MXBnTlE9PSIsInZhbHVlIjoiTXBHUm43RHZZa2NSaUx5MGsydVN0dXhhUVQvOEdnRXI3ZVhQd01QUWRMUDRyc3BqWnZ3RGRSdXd3enZHM1FSeTJWZFBQZDVHZkZmMEVDMk8rVnFlazc0Z0h1VXJJVEdiU2hzMlJVb0MyWEl4K0tGVm0rZWF0YjNlUjFISTc4TzIiLCJtYWMiOiJkOTdlYWNhZDU2MGRiNjU3NjIyYzQxNjZmYmRmN2FiYzJlODc2MGUzOGMxNjE2MTliZTkxYjY2YzdlZmFiN2IxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjJ0ZHdNbHQ1QkdaZjY1Z0xtV2RCdWc9PSIsInZhbHVlIjoidkRtQTlndEJ3VUFKd3U3bUd4WkJGZXZWK1NsOE9qc0VUTnlHOHVEV2xWVzNqeHBTczVPU0ZCbjk1eStEU3AyUlJxQkp5L2psQmJuRXdGeGVDMjlkVzkxZmcwMzU5MXdubS9rTHYyZUVkdWhPN0J3a2VKRTdkUlZFL09ReXVxWmgiLCJtYWMiOiJlM2E5NGMwNmQ0NjgxZWMyNGZiMDBmMTNmNzg2NjBhZmJjOGU3NjFiNmJjMDhmMzM3OWEwMzc0Zjk5YjljNWM3IiwidGFnIjoiIn0%3D");

// var formdata = new FormData();
// formdata.append("name", "test123");
// formdata.append("password", "test123");
// formdata.append("email", "test123@gmail.com");
// formdata.append("password_confirmation", "test123");

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: formdata,
//   redirect: 'follow'
// };

// fetch("http://hackathon.alexis-guay.fr/api/create-account", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

Route::post('/login', [AuthenticationController::class, 'login']);
// var myHeaders = new Headers();
// myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjZGR1hDazljNXBRTms0T1h0MXBnTlE9PSIsInZhbHVlIjoiTXBHUm43RHZZa2NSaUx5MGsydVN0dXhhUVQvOEdnRXI3ZVhQd01QUWRMUDRyc3BqWnZ3RGRSdXd3enZHM1FSeTJWZFBQZDVHZkZmMEVDMk8rVnFlazc0Z0h1VXJJVEdiU2hzMlJVb0MyWEl4K0tGVm0rZWF0YjNlUjFISTc4TzIiLCJtYWMiOiJkOTdlYWNhZDU2MGRiNjU3NjIyYzQxNjZmYmRmN2FiYzJlODc2MGUzOGMxNjE2MTliZTkxYjY2YzdlZmFiN2IxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjJ0ZHdNbHQ1QkdaZjY1Z0xtV2RCdWc9PSIsInZhbHVlIjoidkRtQTlndEJ3VUFKd3U3bUd4WkJGZXZWK1NsOE9qc0VUTnlHOHVEV2xWVzNqeHBTczVPU0ZCbjk1eStEU3AyUlJxQkp5L2psQmJuRXdGeGVDMjlkVzkxZmcwMzU5MXdubS9rTHYyZUVkdWhPN0J3a2VKRTdkUlZFL09ReXVxWmgiLCJtYWMiOiJlM2E5NGMwNmQ0NjgxZWMyNGZiMDBmMTNmNzg2NjBhZmJjOGU3NjFiNmJjMDhmMzM3OWEwMzc0Zjk5YjljNWM3IiwidGFnIjoiIn0%3D");

// var formdata = new FormData();
// formdata.append("password", "test123");
// formdata.append("email", "test123@gmail.com");

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: formdata,
//   redirect: 'follow'
// };

// fetch("http://hackathon.alexis-guay.fr/api/login", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', function (Request $request) {
        return auth()->user();
    });
    //     var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer 3|CKHql4fj1xPHuvmggN8hHC8FQrK2LXXVI4dwv4JH");
    // myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjZGR1hDazljNXBRTms0T1h0MXBnTlE9PSIsInZhbHVlIjoiTXBHUm43RHZZa2NSaUx5MGsydVN0dXhhUVQvOEdnRXI3ZVhQd01QUWRMUDRyc3BqWnZ3RGRSdXd3enZHM1FSeTJWZFBQZDVHZkZmMEVDMk8rVnFlazc0Z0h1VXJJVEdiU2hzMlJVb0MyWEl4K0tGVm0rZWF0YjNlUjFISTc4TzIiLCJtYWMiOiJkOTdlYWNhZDU2MGRiNjU3NjIyYzQxNjZmYmRmN2FiYzJlODc2MGUzOGMxNjE2MTliZTkxYjY2YzdlZmFiN2IxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjJ0ZHdNbHQ1QkdaZjY1Z0xtV2RCdWc9PSIsInZhbHVlIjoidkRtQTlndEJ3VUFKd3U3bUd4WkJGZXZWK1NsOE9qc0VUTnlHOHVEV2xWVzNqeHBTczVPU0ZCbjk1eStEU3AyUlJxQkp5L2psQmJuRXdGeGVDMjlkVzkxZmcwMzU5MXdubS9rTHYyZUVkdWhPN0J3a2VKRTdkUlZFL09ReXVxWmgiLCJtYWMiOiJlM2E5NGMwNmQ0NjgxZWMyNGZiMDBmMTNmNzg2NjBhZmJjOGU3NjFiNmJjMDhmMzM3OWEwMzc0Zjk5YjljNWM3IiwidGFnIjoiIn0%3D");

    // var requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow'
    // };

    // fetch("http://hackathon.alexis-guay.fr/api/user", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

    Route::post('/logout', [AuthenticationController::class, 'logout']);

    //     var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer 3|CKHql4fj1xPHuvmggN8hHC8FQrK2LXXVI4dwv4JH");
    // myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjZGR1hDazljNXBRTms0T1h0MXBnTlE9PSIsInZhbHVlIjoiTXBHUm43RHZZa2NSaUx5MGsydVN0dXhhUVQvOEdnRXI3ZVhQd01QUWRMUDRyc3BqWnZ3RGRSdXd3enZHM1FSeTJWZFBQZDVHZkZmMEVDMk8rVnFlazc0Z0h1VXJJVEdiU2hzMlJVb0MyWEl4K0tGVm0rZWF0YjNlUjFISTc4TzIiLCJtYWMiOiJkOTdlYWNhZDU2MGRiNjU3NjIyYzQxNjZmYmRmN2FiYzJlODc2MGUzOGMxNjE2MTliZTkxYjY2YzdlZmFiN2IxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjJ0ZHdNbHQ1QkdaZjY1Z0xtV2RCdWc9PSIsInZhbHVlIjoidkRtQTlndEJ3VUFKd3U3bUd4WkJGZXZWK1NsOE9qc0VUTnlHOHVEV2xWVzNqeHBTczVPU0ZCbjk1eStEU3AyUlJxQkp5L2psQmJuRXdGeGVDMjlkVzkxZmcwMzU5MXdubS9rTHYyZUVkdWhPN0J3a2VKRTdkUlZFL09ReXVxWmgiLCJtYWMiOiJlM2E5NGMwNmQ0NjgxZWMyNGZiMDBmMTNmNzg2NjBhZmJjOGU3NjFiNmJjMDhmMzM3OWEwMzc0Zjk5YjljNWM3IiwidGFnIjoiIn0%3D");

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   redirect: 'follow'
    // };

    // fetch("http://hackathon.alexis-guay.fr/api/logout", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

    Route::apiResource("users", UserController::class); // Les routes "users.*" de l'API
    Route::apiResource("sessions", SessionController::class);
    Route::apiResource("responses", ResponseController::class);
    Route::apiResource("questions", QuestionController::class);
    Route::apiResource("user-responses", UserResponseController::class);
    Route::apiResource("addresses", AddressController::class);
    Route::apiResource("users-sessions", UserSessionController::class);
    Route::apiResource("campaign", CampaignController::class);

    Route::get('/get-all-campaigns', [CampaignController::class, 'getAllCampaigns']);
    Route::get('/get-campaign/{campaign}', [CampaignController::class, 'getCampaign']);
    Route::get('/survey/{product}', [SurveyController::class, 'show']);
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

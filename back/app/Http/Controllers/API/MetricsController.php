<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Session;
use Illuminate\Http\Request;

class MetricsController extends Controller
{
    public function getSessionMetrics(Session $session)
    {
        $countUsers = $session->userSession()->count();
    }
}

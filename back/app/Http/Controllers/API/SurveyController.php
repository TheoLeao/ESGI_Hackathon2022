<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Question;
use App\Models\Response;
use Illuminate\Http\Request;

class SurveyController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attr = $request->validate([
            'product_id' => 'required',
        ]);

        $file = $request->file('survey');

        if (false === $file) {
            return;
        }

        $tempPath = $file->getRealPath();

        $file_csv = fopen($tempPath, "r");
        $output = array();
        $i = 0;
        while (($data = fgetcsv($file_csv, 1000, ',')) !== false) {
            $num = count($data);
            if ($i == 0) {
                $i++;
                continue;
            }
            for ($c = 0; $c < $num; $c++) {
                if (empty($data[$c])) {
                    continue;
                }
                if ($c % 3 == 0) {
                    $output[$c]['question'] = $data[$c];
                } else if ($c % 3 == 1) {
                    $output[$c - 1]['response'][$data[$c]] = '';
                } else {
                    $output[$c - 2]['response'][$data[$c - 1]] = $data[$c];
                }
            }
            $i++;
        }

        foreach ($output as $key => $value) {
            $question = new Question(['question' => $value['question']]);
            $question->product()->associate($attr['product_id']);
            $question->save();
            foreach ($value['response'] as $key => $value) {
                $response = new Response(['response' => $key, 'value' => $value]);
                $response->question()->associate($question->id);
                $response->save();
            }
        }
        fclose($file_csv);
        return response()->json($output);
    }

    /**
     * Display the specified resource.
     *
     * @param  Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $product->questions()->get();
    }
}

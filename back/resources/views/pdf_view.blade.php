<div class="container">
    <h1>Résultats</h1>
    <p>Utilisateurs : {{$data['totalUsers']}}</p>

    @foreach ($questions as $key => $item)
    @php
    $i = 'https://quickchart.io/chart?title="'.$key.'"&c={type:"bar",data:{labels:' . $item['responses'].',datasets:[{label:"Réponses",data:'.$item['values'].'}]},options:{title:{display:true,text:"'.$key.'"}'.'}'.'}'
    @endphp
    <img width="100%" src="{{$i}}">
    @endforeach
</div>
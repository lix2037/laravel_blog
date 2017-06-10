@extends('layouts.admin')
@section('content')

<div class="margin10px">
    <table class="mytable">
        <tr>
            <th>服务器信息</th><th>
        </tr>
        @foreach($info as $key => $value)
            <tr>
                <td width="220" class="tdf">{{$key}}</td>
                <td>{{$value}}</td>
            </tr>
        @endforeach
    </table>
</div>
@endsection




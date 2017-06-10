<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class Node extends Model
{
    //
    protected $table = 'node';
    protected $primaryKey = 'node_id';
    public $timestamps=false;
    protected $fillable = ['node_pid'];

    public function getNodeList($search)
    {
        $node = $this->where($search)->orderBy('node_pid', 'desc')->get();

        return $node->toArray();
    }
}

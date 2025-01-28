<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Accounts extends Model
{
    use HasUuids;

    protected $fillable = [
        'id',
        'title',
        'description',
        'origin',
        'value',
        'type',
        'due_date',
        'is_fixed',
        'is_paid',
        'category_id',
        'user_id'
    ];

    protected $table = 'accounts';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'id';

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

}

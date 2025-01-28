<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Accounts;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Category extends Model
{

    use HasUuids;

    protected $fillable = ['id', 'title'];

    protected $table = 'categories';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'id';

    public function accounts(): HasMany
    {
        return $this->hasMany(Accounts::class);
    }
}

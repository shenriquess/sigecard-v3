<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call('UsersTableSeeder');
    }
}

class UsersTableSeeder extends Seeder {

    public function run()
    {
        DB::table('users')->delete();

        User::create([
            'name'=>'Saulo Henrique',
            'username'=>'shenriquess',
            'crn'=>'CRN9-1111',
            'email'=>'sktsaulo@hotmail.com',
            'type'=>'1',
            'password'=>bcrypt('admin'),
        ]);
    }

}

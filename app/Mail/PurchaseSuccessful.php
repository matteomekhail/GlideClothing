<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PurchaseSuccessful extends Mailable
{
    use Queueable, SerializesModels;

    public $repoUrl;

    public function __construct($repoUrl)
    {
        $this->repoUrl = $repoUrl;
    }

    public function build()
    {
        return $this->view('emails.purchase-successful')
                    ->subject('Thank you!');
    }
}

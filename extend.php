<?php

/*
 * This file is part of iamdarkle/fancybox
 *
 * Copyright (c) 2022 Tomás Romero.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Flarum\Extend;
use Flarum\Frontend\Document;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),
    
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),
    (new Extend\Settings())
        ->serializeToForum('tohsakarat-fancybox-plus.use-cdnUrl', 'tohsakarat-fancybox-plus.use-cdnUrl', 'boolval', false)
        ->serializeToForum('tohsakarat-fancybox-plus.pic-cdnUrl', 'tohsakarat-fancybox-plus.pic-cdnUrl', 'strval', '')
        ->serializeToForum('tohsakarat-fancybox-plus.use-resize', 'tohsakarat-fancybox-plus.use-resize', 'boolval', false),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Frontend('forum'))
        ->content(function (Document $document) {
            $document->head[] = '<meta name="referrer" content="no-referrer">';
        })

];

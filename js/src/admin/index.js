import app from 'flarum/admin/app';

app.initializers.add('tohsakarat-fancybox-plus', () => {
    app.extensionData
        .for('tohsakarat-fancybox-plus')
        .registerSetting(
            {
            setting: 'tohsakarat-fancybox-plus.pic-cdnUrl',
            type: 'string',
            label: app.translator.trans('fancybox-plus.admin.settings.cdnURL'),
            }
        );

        app.extensionData
        .for('tohsakarat-fancybox-plus')
        .registerSetting({
            setting: 'tohsakarat-fancybox-plus.use-cdnUrl',
            type: 'bool',
            default:false,
            label: app.translator.trans('fancybox-plus.admin.settings.use-cdnUrl'),
        });

        app.extensionData
        .for('tohsakarat-fancybox-plus')
        .registerSetting({
            setting: 'tohsakarat-fancybox-plus.use-resize',
            type: 'bool',
            default:false,
            label: app.translator.trans('fancybox-plus.admin.settings.use-resize'),
        });
    });
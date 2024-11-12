(function() {
    const __ = wp.i18n.__;
    const { addFilter } = wp.hooks;
    const { InspectorControls } = wp.blockEditor;
    const { PanelBody, TextControl } = wp.components;
    const { Fragment, createElement } = wp.element;

    addFilter(
        'blocks.registerBlockType',
        'piotrpress-hubspot-form/goToWebinarWebinarKey-attribute',
        function(settings, name) {
            if (name !== 'piotrpress/hubspot-form') return settings;

            settings.attributes = {
                ...settings.attributes,
                goToWebinarWebinarKey: {
                    type: 'string'
                },
            };

            return settings;
        }
    );

    addFilter(
        'editor.BlockEdit',
        'piotrpress-hubspot-form/goToWebinarWebinarKey-control',
        function(BlockEdit) {
            return function(props) {
                if (props.name !== 'piotrpress/hubspot-form') return createElement(BlockEdit, props);

                const { attributes, setAttributes } = props;
                const { goToWebinarWebinarKey } = attributes;

                return createElement(
                    Fragment,
                    {},
                    createElement(BlockEdit, props),
                    createElement(
                        InspectorControls,
                        {},
                        createElement(
                            PanelBody,
                            { title: __('GoToWebinar', 'piotrpress-hubspot-form') },
                            createElement(TextControl, {
                                label: __('Webinar Key', 'piotrpress-hubspot-form'),
                                value: goToWebinarWebinarKey,
                                onChange: function(webinarKey) {
                                    setAttributes({ goToWebinarWebinarKey: webinarKey });
                                }
                            })
                        )
                    )
                );
            };
        }
    );
})();
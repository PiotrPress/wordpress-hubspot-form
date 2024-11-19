(function() {
    const __ = wp.i18n.__;
    const createElement = window.wp.element.createElement;
    const { useBlockProps, BlockControls, InspectorControls } = window.wp.blockEditor
    const { PanelBody, TextControl, Button } = window.wp.components
    const registerBlockType = window.wp.blocks.registerBlockType;

    registerBlockType( 'piotrpress/hubspot-form', {
        icon: createElement( 'svg', { viewBox: '0 0 24 24' },
            createElement( 'path', { d: 'M18.164 7.931V5.085a2.198 2.198 0 0 0 1.266-1.978V3.04A2.199 2.199 0 0 0 17.238.847h-.067a2.199 2.199 0 0 0-2.193 2.192v.067a2.196 2.196 0 0 0 1.252 1.973l.013.006v2.852a6.22 6.22 0 0 0-2.969 1.31l.012-.009-7.828-6.096a2.497 2.497 0 1 0-1.157 1.515l-.012.006 7.696 5.991a6.176 6.176 0 0 0-1.038 3.446c0 1.343.425 2.588 1.147 3.606l-.013-.019-2.342 2.342a1.968 1.968 0 0 0-.58-.095h-.002a2.033 2.033 0 1 0 2.033 2.033 1.978 1.978 0 0 0-.099-.595l.004.014 2.317-2.317a6.247 6.247 0 1 0 4.782-11.133l-.036-.005zm-.964 9.377a3.206 3.206 0 1 1 3.214-3.206v.002a3.206 3.206 0 0 1-3.206 3.206z' } )
        ),
        edit: function( { attributes, setAttributes } ) {
            const {portalId} = attributes;
            const {formId} = attributes;
            const targetId = `hubspot-form-${portalId}-${formId}`;

            return createElement(
                'div',
                useBlockProps(),
                BlockControls,
                createElement(
                    InspectorControls,
                    {},
                    createElement(
                        PanelBody,
                        {
                            title: __('Settings', 'piotrpress-hubspot-form')
                        },
                        createElement(
                            TextControl,
                            {
                                label: __('Portal ID', 'piotrpress-hubspot-form'),
                                value: portalId,
                                onChange: (portalId) => { setAttributes({portalId: portalId}); }
                            }
                        ),
                        createElement(
                            TextControl,
                            {
                                label: __('Form ID', 'piotrpress-hubspot-form'),
                                value: formId,
                                onChange: (formId) => { setAttributes({formId: formId}); }
                            }
                        ),
                        createElement(
                            Button,
                            {
                                isPrimary: true,
                                onClick: () => {
                                    if(window.hbspt && window.hbspt.forms) {
                                        const { className, lock, metadata, ...formConfig } = attributes;
                                        formConfig.target = `#${targetId}`;
                                        try {
                                            window.hbspt.forms.create(formConfig);
                                            document.getElementById(targetId).className = '';
                                        } catch(error) {
                                            document.getElementById(targetId).className = 'components-placeholder';
                                            document.getElementById(targetId).innerHTML = __('Error while loading HubSpot form.', 'piotrpress-hubspot-form');
                                        }
                                    } else console.log(__('HubSpot forms library is not loaded.', 'piotrpress-hubspot-form'));
                                }
                            },
                            __('Render Form', 'piotrpress-hubspot-form')
                        )
                    )
                ),
                createElement(
                    'div',
                    {
                        id: targetId,
                        className: 'components-placeholder'
                    },
                    createElement(
                        'div',
                        { className: 'components-placeholder__label' },
                        __('HubSpot Form', 'piotrpress-hubspot-form')
                    ),
                    createElement(
                        'div',
                        { className: 'components-placeholder__fieldset' },
                        __('Enter Portal ID and Form ID in block settings sidebar to load the form.', 'piotrpress-hubspot-form')
                    )
                )
            );
        },
        save: function ({attributes}) {
            const { className, lock, metadata, ...formConfig } = attributes;
            const sortedFormConfig = Object.keys(formConfig).sort().reduce((acc, key) => {
                    acc[key] = formConfig[key];
                    return acc;
                }, {});

            return createElement(
                'script',
                {
                    dangerouslySetInnerHTML: {
                        __html: `hbspt.forms.create(${JSON.stringify(sortedFormConfig)});`
                    }
                }
            );
        }
    } );
})();
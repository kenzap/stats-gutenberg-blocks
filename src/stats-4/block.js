import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
import { blockProps, ContainerSave } from '../commonComponents/container/container';
import { getTypography } from '../commonComponents/typography/typography';
import Edit from './edit';

/**
 * Provides the initial data for new block
 */
export const defaultItem = {
    title: __( 'Creative', 'kenzap-stats' ),
    sign: '75',
    color: '#333',
    color2: '#333',
};

export const defaultSubBlocks = JSON.stringify( [
    {
        title: __( 'Creative', 'kenzap-stats' ),
        sign: '75',
        color: '#333',
        color2: '#333',
        key: new Date().getTime() + 1,
    }, {
        title: __( 'Illustrative', 'kenzap-stats' ),
        sign: '50',
        color: '#333',
        color2: '#333',
        key: new Date().getTime() + 2,
    }, {
        title: __( 'Beautiful', 'kenzap-stats' ),
        sign: '90',
        color: '#333',
        color2: '#333',
        key: new Date().getTime() + 3,
    }, {
        title: __( 'Easy and Fun', 'kenzap-stats' ),
        sign: '83',
        color: '#333',
        color2: '#333',
        key: new Date().getTime() + 3,
    },
] );

/**
 * Generate inline styles for custom settings of the block
 * @param {Object} attributes - of the block
 * @returns {Node} generated styles
 */
export const getStyles = attributes => {
    const kenzapContanerStyles = {
        maxWidth: `${ attributes.containerMaxWidth === '100%' ? '100%' : attributes.containerMaxWidth + 'px' }`,
        '--maxWidth': `${ attributes.containerMaxWidth === '100%' ? '100wh' : attributes.containerMaxWidth + ' ' } `,
    };

    const vars = {
        '--paddings': `${ attributes.containerPadding }`,
        '--paddings2': `${ attributes.containerSidePadding }px`,
    };

    return {
        vars,
        kenzapContanerStyles,
    };
};

/**
 * Define typography defaults
 */
export const typographyArr = JSON.stringify([
    {
        'title': __( '- Title', 'kenzap-stats' ),
        'font-size': 19,
        'font-weight': 6,
        'line-height': 19,
        'margin-bottom': 10,
        'color':'-'
    },
    {
        'title': __( '- Number', 'kenzap-stats' ),
        'font-size': 19,
        'font-weight': 6,
        'line-height': 19,
        'margin-bottom': 0,
        'color':'-'
    },
]);

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'kenzap/stats-4', {
    title: __( 'Kenzap Bars 1', 'kenzap-stats' ),
    icon: 'clock',
    category: 'layout',
    keywords: [
        __( 'Stats', 'kenzap-stats' ),
        __( 'Bars', 'kenzap-stats' ),
        __( 'Timer', 'kenzap-stats' ),
    ],
    anchor: true,
    html: true,
    supports: {
        align: [ 'full', 'wide' ],
    },
    attributes: {
        ...blockProps,

        elements: {
            type: 'number',
            default: 4,
        },

        barThickness: {
            type: 'number',
            default: 3,
        },

        // fontWeight: {
        //     type: 'number',
        //     default: 7,
        // },

        // showTitle: {
        //     type: 'boolean',
        //     default: true,
        // },

        items: {
            type: 'array',
            default: [],
        },

        typography: {
            type: 'array',
            default: [],
        },

        isFirstLoad: {
            type: 'boolean',
            default: true,
        },

        blockUniqId: {
            type: 'number',
            default: 0,
        },

        randomValue: {
            type: 'string',
            default: '',
        },
    },

    edit: ( props ) => {
        if ( props.attributes.items.length === 0 && props.attributes.isFirstLoad ) {
            props.setAttributes( {
                items: [ ...JSON.parse( defaultSubBlocks ) ],
                isFirstLoad: false,
            } );

            props.attributes.items = JSON.parse( defaultSubBlocks );
            if ( ! props.attributes.blockUniqId ) {
                props.setAttributes( {
                    blockUniqId: new Date().getTime(),
                } );
            }
        }
        
        setTimeout(function(){launchBars($);},500);

        return ( <Edit { ...props } /> );
    },

    /**
     * The save function defines the way in which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     * @param {Object} props - attributes
     * @returns {Node} rendered component
     */
    save: function( props ) {
        const {
            className,
            attributes,
        } = props;

        const { vars, kenzapContanerStyles } = getStyles( props.attributes );

        return (
            <div className={ className ? className : '' } style={ vars }>
                <ContainerSave
                    className={ `kenzap-progressbar-1 block-${ attributes.blockUniqId }` }
                    attributes={ attributes }
                    style={ vars }
                    withBackground
                    withPadding
                    >
        
                    <div className="kenzap-container kp-bar-cont" style={ kenzapContanerStyles }>
                        { attributes.nestedBlocks == 'top' && <InnerBlocks.Content /> }
                        { attributes.items && attributes.items.map( ( item, index ) => (

                            <div>
                                <h3 style={ { ...getTypography( attributes, 0 ), ...{ color: item.color2 } } }>
                                { item.title+" " }
                                    <span className="percentCountTitle">
                                        { "- "+item.sign }%
                                    </span>
                                </h3>
                                <div class="kp-bar-1" data-border={ attributes.barThickness } data-color={ item.color } data-color2={ item.color2 } data-percent={ item.sign }>
                                    <div class="progressbar" >
                                        <div class="proggress" style={ { ...getTypography( attributes, 1 ), ...{ color: item.color2 } } }>
                                            <div class="percentCount"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ) ) }
                        { attributes.nestedBlocks == 'bottom' && <InnerBlocks.Content /> }
                    </div>

                </ContainerSave>
            </div>
        );
    },
} );

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
import { blockProps, ContainerSave } from '../commonComponents/container/container';
import { getTypography } from '../commonComponents/typography/typography';
import Edit from './edit';

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

    if(attributes.textOutColor){ vars['--textOutColor'] = attributes.textOutColor; }

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
        'title': __( '- Countdown', 'kenzap-stats' ),
        'font-size': 60,
        'font-weight': 6,
        'line-height': 60,
        'margin-bottom': 10,
    },
    {
        'title': __( '- Title', 'kenzap-stats' ),
        'font-size': 15,
        'font-weight': 4,
        'line-height': 26,
    },
]);

/**
 * Converts CSS styles object into inline CSS string
 * @param {String} attributes - attributes
 * @returns {Integer} i - typographyArr index
 */
export const getInline = ( attributes, i ) => {
    let t = getTypography( attributes, i );
    let t_ = "";
    Object.getOwnPropertyNames(t).forEach(key => { t_ += key+":"+t[key]+";" });
    return t_;
};

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
registerBlockType( 'kenzap/stats-1', {
    title: __( 'Kenzap Countdown 1', 'kenzap-stats' ),
    description: __( 'Note! Some changes of this block can be only previewed on front-end.', 'kenzap-stats' ),
    icon: 'backup',
    category: 'layout',
    keywords: [
        __( 'Stats', 'kenzap-stats' ),
        __( 'Countdown', 'kenzap-stats' ),
        __( 'Timer', 'kenzap-stats' ),
    ],
    anchor: true,
    html: true,
    supports: {
        align: [ 'full', 'wide' ],
    },
    attributes: {
        ...blockProps,

        date: {
            type: 'string',
            default: '',
        },

        cbYear: {
            type: 'boolean',
            default: false,
        },

        cbMonth: {
            type: 'boolean',
            default: true,
        },

        cbDay: {
            type: 'boolean',
            default: true,
        },

        cbHour: {
            type: 'boolean',
            default: true,
        },

        cbMinute: {
            type: 'boolean',
            default: true,
        },

        cbSecond: {
            type: 'boolean',
            default: true,
        },

        textOutColor: {
            type: 'string',
            //default: '#333',
        },

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
    },

    edit: ( props ) => {

        setTimeout(function(){launchCountdown($);},500);

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
                    className={ `kenzap-countdown-1 block-${ attributes.blockUniqId }` }
                    attributes={ attributes }
                    style={ vars }
                    withBackground
                    withPadding
                    >
                    <div className="kenzap-container" style={ kenzapContanerStyles }>
                        { attributes.nestedBlocks == 'top' && <InnerBlocks.Content /> }
                        <div class="kp-countdown" data-t0={ getInline( attributes, 0 ) } data-t1={ getInline( attributes, 1 ) } data-yeart={ __( 'Years' ) } data-yeart={ __( 'Years' ) } data-montht={ __( 'Months' ) } data-dayt={ __( 'Days' ) } data-hourt={ __( 'Hours' ) } data-minutet={ __( 'Minutes' ) } data-secondt={ __( 'Seconds' ) } data-time={ attributes.date } data-year={ attributes.cbYear } data-month={ attributes.cbMonth } data-day={ attributes.cbDay } data-hour={ attributes.cbHour } data-minute={ attributes.cbMinute } data-second={ attributes.cbSecond } ></div>
                        { attributes.nestedBlocks == 'bottom' && <InnerBlocks.Content /> }
                    </div>
                </ContainerSave>
            </div>
        );
    },
} );

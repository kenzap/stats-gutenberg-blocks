/**
 * BLOCK: stats-1
 *
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

import { blockProps, ContainerSave } from '../commonComponents/container/container';
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
        '--paddingsMin': `${ attributes.containerPadding / 4 }`,
        '--paddingsMinPx': `${ attributes.containerPadding / 4 }px`,
        '--textColor': `${ attributes.textColor }`,
        '--textColor2': `${ attributes.textColor2 }`,
        '--textOutColor': `${ attributes.textOutColor }`,
        '--textThickness': `${ parseInt(attributes.textThickness) * 100 }`,
        '--titleSize': `${ attributes.titleSize }`,
        '--descriptionSize': `${ attributes.descriptionSize }`,
    };

    return {
        vars,
        kenzapContanerStyles,
    };
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
    icon: 'backup',
    category: 'layout',
    keywords: [
        __( 'Stats', 'kenzap-stats' ),
        __( 'Countdown', 'kenzap-stats' ),
        __( 'Timer', 'kenzap-stats' ),
    ],
    anchor: true,
    html: true,
    attributes: {
        ...blockProps,

        date: {
            type: 'string',
            default: '',
        },

        titleSize: {
            type: 'number',
            default: 90,
        },

        descriptionSize: {
            type: 'number',
            default: 15,
        },

        textThickness: {
            type: 'number',
            default: 5,
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

        textColor: {
            type: 'string',
            default: '#333',
        },

        textColor2: {
            type: 'string',
            default: '#333',
        },

        textOutColor: {
            type: 'string',
            default: '#333',
        },

        items: {
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
                        <div class="kp-countdown" data-yeart={ __( 'Years' ) } data-montht={ __( 'Months' ) } data-dayt={ __( 'Days' ) } data-hourt={ __( 'Hours' ) } data-minutet={ __( 'Minutes' ) } data-secondt={ __( 'Seconds' ) } data-time={ attributes.date } data-year={ attributes.cbYear } data-month={ attributes.cbMonth } data-day={ attributes.cbDay } data-hour={ attributes.cbHour } data-minute={ attributes.cbMinute } data-second={ attributes.cbSecond } ></div>
                    </div>
                </ContainerSave>
            </div>
        );
    },
} );

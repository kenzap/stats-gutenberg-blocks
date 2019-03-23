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
 * Provides the initial data for new block
 */
export const defaultItem = {
    title: __( '$789', 'kenzap-stats' ),
    description: __( 'Total Payments', 'kenzap-stats' ),
    sign: __( '$', 'kenzap-stats' ),
};

export const defaultSubBlocks = JSON.stringify( [
    {
        title: __( '$789', 'kenzap-stats' ),
        description: __( 'Total Payments', 'kenzap-stats' ),
        sign: __( '$', 'kenzap-stats' ),
        key: new Date().getTime() + 1,
    }, {
        title: __( '678', 'kenzap-stats' ),
        description: __( 'Clients served', 'kenzap-stats' ),
        sign: __( '$', 'kenzap-stats' ),
        key: new Date().getTime() + 2,
    }, {
        title: __( '9000', 'kenzap-stats' ),
        description: __( 'Projects Done', 'kenzap-stats' ),
        sign: __( '', 'kenzap-stats' ),
        key: new Date().getTime() + 3,
    }, {
        title: __( '100%', 'kenzap-stats' ),
        description: __( 'Satisfied employees', 'kenzap-stats' ),
        sign: __( '', 'kenzap-stats' ),
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
 * Extracts numeric value only from the text string provided
 * @param {String} value - of the block
 * @returns {String} clean number
 */
export const getCounterValue = value => {

    let number = value.match(/\d/g); 
    if(number!=null){
         number = number.join("");
    }else{
        number = "";
    }
    return number;
} 

/**
 * Extracts prefix in front of numeric value
 * @param {String} value - of the block
 * @returns {String} string prefix before number
 */
export const getCounterPrefix = value => {

    let number = value.match(/\d/g); 
    let temp = "";
    if(number!=null) {
        number = number.join("");
        temp = value.substring(0, value.indexOf(number));
        if(temp==value) temp = "";
    }

    return temp;
}

/**
 * Extracts postfix after numeric value
 * @param {String} value - of the block
 * @returns {String} string postfix after number
 */
export const getCounterPostfix = value => {

    let number = value.match(/\d/g); 
    let temp = "";
    if(number!=null) {
        number = number.join("");
        temp = value.substring(value.indexOf(number)+number.length, value.length);
        if(temp==value) temp = "";
    }

    return temp;
}

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
registerBlockType( 'kenzap/stats-2', {
    title: __( 'Kenzap Counter 1', 'kenzap-stats' ),
    icon: 'clock',
    category: 'layout',
    keywords: [
        __( 'Stats', 'kenzap-stats' ),
        __( 'Counter', 'kenzap-stats' ),
        __( 'Timer', 'kenzap-stats' ),
    ],
    anchor: true,
    html: true,
    attributes: {
        ...blockProps,

        elements: {
            type: 'number',
            default: 4,
        },

        titleSize: {
            type: 'number',
            default: 64,
        },

        descriptionSize: {
            type: 'number',
            default: 16,
        },

        textThickness: {
            type: 'number',
            default: 5,
        },

        showDesc: {
            type: 'boolean',
            default: true,
        },

        time: {
            type: 'number',
            default: 1500,
        },

        delay: {
            type: 'number',
            default: 25,
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
            // TODO It is very bad solution to avoid low speed working of setAttributes function
            props.attributes.items = JSON.parse( defaultSubBlocks );
            if ( ! props.attributes.blockUniqId ) {
                props.setAttributes( {
                    blockUniqId: new Date().getTime(),
                } );
            }
        }
        
        setTimeout(function(){kenzapBanner2($);},500);

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
                    className={ `kenzap-counter-1 block-${ attributes.blockUniqId }` }
                    attributes={ attributes }
                    style={ vars }
                    withBackground
                    withPadding
                    >

                    <div className="kenzap-container" style={ kenzapContanerStyles }>

                        <div class="kenzap-row kp-counter" data-time={ attributes.time } data-delay={ attributes.delay }>
                            { attributes.items && attributes.items.map( ( item, index ) => (

                                <div class="kenzap-col-3">
                                    <div class="kp-counter-box">
                                        <strong>{ getCounterPrefix(item.title) }<span class="kp-counter-val">{ getCounterValue(item.title) }</span>{ getCounterPostfix(item.title) }</strong>
                                        { attributes.showDesc && 
                                        <p>{ item.description }</p> 
                                        }
                                    </div>
                                </div>

                            ) ) }
                        </div>

                    </div>
                </ContainerSave>
            </div>
        );
    },
} );

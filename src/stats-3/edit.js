const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.editor;
const { RangeControl, TextControl, TextareaControl, ToggleControl, PanelBody } = wp.components;

import { defaultItem, getStyles } from './block';
import { InspectorContainer, ContainerEdit } from '../commonComponents/container/container';

/**
 * Keys for new blocks
 * @type {number}
 */
let key = 0;


/**
 * The edit function describes the structure of your block in the context of the editor.
 * This represents what the editor will render when the block is used.
 *
 * The "edit" property must be a valid function.
 * @param {Object} props - attributes
 * @returns {Node} rendered component
 */
export default class Edit extends Component {
    state = {
        activeSubBlock: -1,
        showError: false,
    };

    timerId = 0;

    /**
     * Change any property of item
     * @param {string} property - editable field
     * @param {string} value - for field
     * @param {number} index - of items array
     * @param {boolean} withMutation - in some cases we should avoid mutation for force rerender component
     */
    onChangePropertyItem = ( property, value, index, withMutation = false ) => {
        const items = withMutation ? [ ...this.props.attributes.items ] : this.props.attributes.items;
        items[ index ][ property ] = value+"";
        this.props.setAttributes( { items: items } );
        this.props.setAttributes( { randomValue: new Date().getTime()+"" } );
    };

    /**
     * Remove item
     * It also add default item if we remove all elements from array
     * @param {number} index - of item
     */
    removeItem = ( index ) => {
        const items = [ ...this.props.attributes.items ];
        if ( items.length === 1 ) {
            this.props.setAttributes( { items: [ defaultItem ] } );
        } else {
            items.splice( index, 1 );
            this.props.setAttributes( { items: items } );
        }
    };

    updateItems = ( el, value ) => {

        const items = [ ...this.props.attributes.items ];

        //add elements to item array
        if(value > items.length){

            key++;
            this.props.setAttributes( {
                items: [ ...this.props.attributes.items, {
                    ...defaultItem,
                    title: defaultItem.title,
                    description: defaultItem.description,
                    key: 'new ' + new Date().getTime(),
                } ],
            } );
        }

        //remove elements from item array
        if(value < items.length){
    
            if ( items.length === 1 ) {
                this.props.setAttributes( { items: [ defaultItem ] } );
            } else {
                items.splice( items.length-1, 1 );
                this.props.setAttributes( { items: items } );
            }
        }

        this.props.setAttributes( { "elements": value } );

    };

    render() {
        const {
            className,
            attributes,
            setAttributes,
            isSelected,
        } = this.props;

        const { vars, kenzapContanerStyles } = getStyles( attributes );

        return (
            <div>
                <InspectorControls>

                    <PanelBody
                        title={ __( 'General', 'kenzap-stats' ) }
                        initialOpen={ false }
                        >

                        <RangeControl
                            label={ __( 'Items', 'kenzap-stats' ) }
                            value={ attributes.elements }
                            onChange={ ( elements ) => {
                                this.updateItems( 'elements', elements );
                            } }
                            min={ 1 }
                            max={ 8 }
                            help={ __( 'Number of circles to display.', 'kenzap-stats' ) }
                        />

                        <RangeControl
                            label={ __( 'Circle size', 'kenzap-stats' ) }
                            value={ attributes.circleSize }
                            onChange={ ( circleSize ) => setAttributes( { circleSize } ) }
                            min={ 100 }
                            max={ 250 }
                        />

                        <RangeControl
                            label={ __( 'Number size', 'kenzap-stats' ) }
                            value={ attributes.numberSize }
                            onChange={ ( numberSize ) => setAttributes( { numberSize } ) }
                            min={ 10 }
                            max={ 50 }
                        />

                        <ToggleControl
                            label={ __( 'Show title', 'kenzap-stats' ) }
                            checked={ attributes.showTitle}
                            onChange={ (showTitle) => setAttributes( { showTitle } ) }
                        />

                        { attributes.showTitle &&
                        <RangeControl
                            label={ __( 'Title size', 'kenzap-stats' ) }
                            value={ attributes.titleSize }
                            onChange={ ( titleSize ) => setAttributes( { titleSize } ) }
                            min={ 10 }
                            max={ 130 }
                            help={ __( 'Size is adjusted proportionally screen width.', 'kenzap-stats' ) }
                        />
                        }

                        <ToggleControl
                            label={ __( 'Show description', 'kenzap-stats' ) }
                            checked={ attributes.showDesc}
                            onChange={ (showDesc) => setAttributes( { showDesc } ) }
                        />

                        { attributes.showDesc &&
                        <RangeControl
                            label={ __( 'Description size', 'kenzap-stats' ) }
                            value={ attributes.descriptionSize }
                            onChange={ ( descriptionSize ) => setAttributes( { descriptionSize } ) }
                            min={ 10 }
                            max={ 130 }
                            help={ __( 'Size is adjusted proportionally screen width.', 'kenzap-stats' ) }
                        />
                        }

                        <RangeControl
                            label={ __( 'Line thickness', 'kenzap-stats' ) }
                            value={ attributes.textThickness }
                            onChange={ ( textThickness ) => setAttributes( { textThickness } ) }
                            min={ 1 }
                            max={ 15 }
                        />

                        <RangeControl
                            label={ __( 'Font weight', 'kenzap-stats' ) }
                            value={ attributes.fontWeight }
                            onChange={ ( fontWeight ) => setAttributes( { fontWeight } ) }
                            min={ 1 }
                            max={ 8 }
                        />

                        <PanelColorSettings
                            title={ __( 'Colors', 'kenzap-stats' ) }
                            initialOpen={ false }
                            colorSettings={ [
                                {
                                    value: attributes.textColor,
                                    onChange: ( value ) => {
                                        return setAttributes( { textColor: value } );
                                    },
                                    label: __( 'Title', 'kenzap-stats' ),
                                },
                                {
                                    value: attributes.textColor2,
                                    onChange: ( textColor2 ) => {
                                        return setAttributes( { textColor2 } );
                                    },
                                    label: __( 'Description', 'kenzap-stats' ),
                                },
                            ] }
                        />
                    </PanelBody>

                    <PanelBody
                        title={ __( 'Texts', 'kenzap-stats' ) }
                        initialOpen={ true }
                        >
                        
                            { attributes.items && attributes.items.map( ( item, index ) => (

                                <PanelBody
                                    title={ __( 'Text ', 'kenzap-stats' ) + " " + (index+1) }
                                    initialOpen={ false }
                                    >

                                    <RangeControl
                                        label={ __( 'Number value', 'kenzap-stats' ) }
                                        value={ parseInt( item.sign ) }
                                        onChange={ ( sign ) => {
                                            this.onChangePropertyItem( 'sign', sign, index, true );
                                        } }
                                        min={ 0 }
                                        max={ 100 }
                                    />

                                    <TextControl
                                        label={ __( 'Title', 'kenzap-stats' ) + " " + (index+1) }
                                        value={ item.title }
                                        onChange={ ( value ) => {
                                            this.onChangePropertyItem( 'title', value, index, true );
                                        } }
                                    />

                                    <TextareaControl
                                        label={ __( 'Description', 'kenzap-stats' ) + " " + (index+1) }
                                        value={ item.description }
                                        onChange={ ( value ) => {
                                            this.onChangePropertyItem( 'description', value, index, true );
                                        } }
                                    />

                                    <PanelColorSettings
                                        title={ __( 'Custom color', 'kenzap-stats' ) }
                                        initialOpen={ false }
                                        colorSettings={ [
                                            {
                                                value: item.color,
                                                onChange: ( value ) => {
                                                    this.onChangePropertyItem( 'color', value, index, true );
                                                },
                                                label: __( 'Circle', 'kenzap-stats' ),
                                            },
                                            {
                                                value: item.color2,
                                                onChange: ( value ) => {
                                                    this.onChangePropertyItem( 'color2', value, index, true );
                                                },
                                                label: __( 'Number', 'kenzap-stats' ),
                                            }
                                        ] }
                                    />

                                </PanelBody>

                            ) ) }

                    </PanelBody>

                    <InspectorContainer
                        setAttributes={ setAttributes }
                        { ...attributes }
                        withPadding
                        withWidth100
                        withBackground
                        withAutoPadding
                    />
                </InspectorControls>
                <div className={ className ? className : '' } style={ vars } >
                    <ContainerEdit
                        className={ `kenzap-stats-1 block-${ attributes.blockUniqId } ${ isSelected ? 'selected' : '' } ` }
                        attributes={ attributes }
                        withBackground
                        withPadding
                        >

                        <div className="kenzap-container" style={ kenzapContanerStyles }>
                            <div class="kenzap-row kp-circle-cont" data-time={ __( 'Time' ) } data-delay={ __( 'Delay' ) }>
                            { attributes.items && attributes.items.map( ( item, index ) => (

                                <div class="kenzap-col-4">
                                    <div class="stat-box" title={ __( 'Adjust values on the right' ) }>

                                        <div class="kp-circle" data-size={ attributes.circleSize } data-border={ attributes.textThickness } data-color={ item.color } data-color2={ item.color2 } data-value={ parseInt(item.sign)/100 }>
                                            <canvas className="kp-rem" width={ attributes.circleSize } height={ attributes.circleSize } ></canvas>
                                            <strong style={{ color: item.color2 }}></strong>
                                        </div>
                                        { attributes.showTitle && <h3>{ item.title }</h3> }
                                        { attributes.showDesc &&  <p>{ item.description }</p> }

                                    </div>
                                </div>

                            ) ) }
                            </div>
                        </div>

                    </ContainerEdit>
                </div>
            </div>
        );
    }
}

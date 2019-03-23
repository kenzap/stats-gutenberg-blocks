const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.editor;
const { RangeControl, TextControl, ToggleControl, PanelBody } = wp.components;

import { defaultItem, getStyles, getCounterValue, getCounterPrefix, getCounterPostfix } from './block';
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
                            help={ __( 'Amount of number blocks to display.', 'kenzap-stats' ) }
                        />

                        <RangeControl
                            label={ __( 'Number size', 'kenzap-stats' ) }
                            value={ attributes.titleSize }
                            onChange={ ( titleSize ) => setAttributes( { titleSize } ) }
                            min={ 10 }
                            max={ 130 }
                            help={ __( 'Size is adjusted proportionally screen width.', 'kenzap-stats' ) }
                        />

                        <ToggleControl
                            label={ __( 'Show title', 'kenzap-stats' ) }
                            checked={ attributes.showDesc}
                            onChange={ (showDesc) => setAttributes( { showDesc } ) }
                        />

                        { attributes.showDesc &&
                        <RangeControl
                            label={ __( 'Title size', 'kenzap-stats' ) }
                            value={ attributes.descriptionSize }
                            onChange={ ( descriptionSize ) => setAttributes( { descriptionSize } ) }
                            min={ 10 }
                            max={ 130 }
                            help={ __( 'Size is adjusted proportionally screen width.', 'kenzap-stats' ) }
                        />
                        }

                        <RangeControl
                            label={ __( 'Font weight', 'kenzap-stats' ) }
                            value={ attributes.textThickness }
                            onChange={ ( textThickness ) => setAttributes( { textThickness } ) }
                            min={ 1 }
                            max={ 8 }
                            help={ __( 'Note. Actual boldness may vary depending on the theme and fonts used.', 'kenzap-stats' ) }
                        />

                        <RangeControl
                            label={ __( 'Refresh speed (miliseconds)', 'kenzap-stats' ) }
                            value={ attributes.delay }
                            onChange={ ( delay ) => setAttributes( { delay } ) }
                            min={ 10 }
                            max={ 1000 }
                        />

                        <RangeControl
                            label={ __( 'Duration (miliseconds)', 'kenzap-stats' ) }
                            value={ attributes.time }
                            onChange={ ( time ) => setAttributes( { time } ) }
                            min={ 500 }
                            max={ 5000 }
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
                                    label: __( 'Numbers color', 'kenzap-stats' ),
                                },
                                {
                                    value: attributes.textOutColor,
                                    onChange: ( textOutColor ) => {
                                        return setAttributes( { textOutColor } );
                                    },
                                    label: __( 'Numbers outline color', 'kenzap-stats' ),
                                },
                                {
                                    value: attributes.textColor2,
                                    onChange: ( textColor2 ) => {
                                        return setAttributes( { textColor2 } );
                                    },
                                    label: __( 'Title color', 'kenzap-stats' ),
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
                                    initialOpen={ true }
                                    >

                                    <TextControl
                                        label={ __( 'Number value', 'kenzap-stats' ) + " " + (index+1) }
                                        value={ item.title }
                                        onChange={ ( value ) => {
                                            this.onChangePropertyItem( 'title', value, index, true );
                                        } }
                                    />

                                    <TextControl
                                        label={ __( 'Number description', 'kenzap-stats' ) + " " + (index+1) }
                                        value={ item.description }
                                        onChange={ ( value ) => {
                                            this.onChangePropertyItem( 'description', value, index, true );
                                        } }
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
                <div className={ className ? className : '' } style={ vars }>
                    <ContainerEdit
                        className={ `kenzap-counter-1 block-${ attributes.blockUniqId } ${ isSelected ? 'selected' : '' } ` }
                        attributes={ attributes }
                        withBackground
                        withPadding
                        >

                        <div className="kenzap-container" style={ kenzapContanerStyles }>
                            <div class="kenzap-row kp-counter" data-time={ attributes.time } data-delay={ attributes.delay }>
                            { attributes.items && attributes.items.map( ( item, index ) => (

                                <div class="kenzap-col-3">
                                    <div class="kp-counter-box" title={ __( 'Adjust values on the right' ) }>
                                        <strong>{ getCounterPrefix(item.title) }<span class="kp-counter-val-edit">{ getCounterValue(item.title) }</span>{ getCounterPostfix(item.title) }</strong>
                                        { attributes.showDesc && 
                                        <p>{ item.description }</p>
                                        }
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

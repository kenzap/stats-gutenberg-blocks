const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, PanelColorSettings, InnerBlocks } = wp.editor;
const { CheckboxControl, PanelBody, DateTimePicker, PanelRow } = wp.components;
const { __experimentalGetSettings } = wp.date;
import { getStyles, getInline, typographyArr } from './block';
import { InspectorContainer, ContainerEdit } from '../commonComponents/container/container';
import { TypographyContainer, getTypography } from '../commonComponents/typography/typography';

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

    render() {
        const {
            className,
            attributes,
            setAttributes,
            isSelected,
        } = this.props;

        const { vars, kenzapContanerStyles } = getStyles( attributes );
        const settings = __experimentalGetSettings();
        const is12HourTime = /a(?!\\)/i.test(
            settings.formats.time
                .toLowerCase() // Test only the lower case a
                .replace( /\\\\/g, '' ) // Replace "//" with empty strings
                .split( '' ).reverse().join( '' ) // Reverse the string and test for "a" not followed by a slash
        );

        //generate date now + 1 month if first load
        const _twoDigits = function(str){str+="";if(str.length==1){ return "0"+str; }else{ return str; } }
        if ( attributes.date == '' ){
            var d2 = new Date(); d2.setMonth(d2.getMonth() + 1);
            attributes.date = d2.getFullYear()+"-"+_twoDigits(d2.getMonth()+1)+"-"+_twoDigits(d2.getDate())+"T23:59:59";
        }

        return (
            <div>
                <InspectorControls>
                    <PanelBody
                        title={ __( 'General', 'kenzap-stats' ) }
                        initialOpen={ false }
                        >
                                        
                        <PanelRow>
                            { __( 'Countdown expiration time', 'kenzap-stats' ) } 
                        </PanelRow>

                        <DateTimePicker
                            currentDate={ attributes.date }
                            onChange={ ( date ) => setAttributes( { date } ) }
                            is12Hour={ is12HourTime }
                        />

                        <CheckboxControl
                            heading={ __( 'Show in countdown', 'kenzap-stats' ) }
                            label={ __( 'Year', 'kenzap-stats' ) }
                            checked={ attributes.cbYear }
                            onChange={ ( cbYear ) => setAttributes( { cbYear } ) }
                        />

                        <CheckboxControl
                            label={ __( 'Month', 'kenzap-stats' ) }
                            checked={ attributes.cbMonth }
                            onChange={ ( cbMonth ) => setAttributes( { cbMonth } ) }
                        />

                        <CheckboxControl
                            label={ __( 'Day', 'kenzap-stats' ) }
                            checked={ attributes.cbDay }
                            onChange={ ( cbDay ) => setAttributes( { cbDay } ) }
                        />

                        <CheckboxControl
                            label={ __( 'Hour', 'kenzap-stats' ) }
                            checked={ attributes.cbHour }
                            onChange={ ( cbHour ) => setAttributes( { cbHour } ) }
                        />

                        <CheckboxControl
                            label={ __( 'Minute', 'kenzap-stats' ) }
                            checked={ attributes.cbMinute }
                            onChange={ ( cbMinute ) => setAttributes( { cbMinute } ) }
                        />

                        <CheckboxControl
                            label={ __( 'Second', 'kenzap-stats' ) }
                            checked={ attributes.cbSecond }
                            onChange={ ( cbSecond ) => setAttributes( { cbSecond } ) }
                        />

                        <PanelColorSettings
                            title={ __( 'Colors', 'kenzap-stats' ) }
                            initialOpen={ false }
                            colorSettings={ [
                                {
                                    value: attributes.textOutColor,
                                    onChange: ( textOutColor ) => {
                                        return setAttributes( { textOutColor } );
                                    },
                                    label: __( 'Outline color', 'kenzap-stats' ),
                                },
                            ] }
                        />
                    </PanelBody>
                    
                    <TypographyContainer
                        setAttributes={ setAttributes }
                        typographyArr={ typographyArr }
                        { ...attributes }
                    />

                    <InspectorContainer
                        setAttributes={ setAttributes }
                        { ...attributes }
                        withPadding
                        withNested
                        withWidth100
                        withBackground
                        withAutoPadding
                    />
                </InspectorControls>
                <div className={ className ? className : '' } style={ vars }>
                    <ContainerEdit
                        className={ `kenzap-countdown-1 block-${ attributes.blockUniqId } ${ isSelected ? 'selected' : '' } ` }
                        attributes={ attributes }
                        withBackground
                        withPadding
                        >

                        <div className="kenzap-container" style={ kenzapContanerStyles }>
                            { attributes.nestedBlocks == 'top' && <InnerBlocks /> }
                            <div class="kp-countdown" data-t0={ getInline( attributes, 0 ) } data-t1={ getInline( attributes, 1 ) } data-yeart={ __( 'Years' ) } data-montht={ __( 'Months' ) } data-dayt={ __( 'Days' ) } data-hourt={ __( 'Hours' ) } data-minutet={ __( 'Minutes' ) } data-secondt={ __( 'Seconds' ) } data-year={ attributes.cbYear } data-month={ attributes.cbMonth } data-day={ attributes.cbDay } data-hour={ attributes.cbHour } data-minute={ attributes.cbMinute } data-second={ attributes.cbSecond } data-time={ attributes.date }></div>
                            { attributes.nestedBlocks == 'bottom' && <InnerBlocks /> }
                        </div>
                    </ContainerEdit>
                </div>
            </div>
        );
    }
}

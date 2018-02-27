/**
 * Projection sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, Zoom, Legend,
    ProjectionType
} from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { World_Map } from './MapData/WorldMap';
import { randomcountriesData } from './MapData/salesCountry';
import { SliderComponent, Slider, SliderChangeEventArgs } from '@syncfusion/ej2-react-inputs';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    .slider-content-wrapper {
        width: 40%;
        margin: 0 auto;
        min-width: 185px;
    }

    .slider-userselect {
        -webkit-user-select: none;
        /* Safari 3.1+ */
        -moz-user-select: none;
        /* Firefox 2+ */
        -ms-user-select: none;
        /* IE 10+ */
        user-select: none;
        /* Standard syntax */
    }

    .slider-labeltext {
        text-align: -webkit-left;
        font-weight: 500;
        font-size: 13px;
        padding-bottom: 10px;
    }

    .slider_container {
        margin-top: 40px;
    }

    .e-bigger .slider-content-wrapper {
        width: 80%;
    }

    #height_slider .e-tab-handle::after {
        background-color: #f9920b;
    }

    #height_slider.e-control.e-slider .e-slider-track {
        height: 8px;
        top: calc(50% - 4px);
        border-radius: 0;
    }
    .highcontrast #height_slider.e-control.e-slider .e-slider-track {
        height: 10px;
        top: calc(50% - 5px);
        border-radius: 0;
    }
    .fabric .slider_container .e-slider-hover .e-slider-track, .fabric .slider_container .e-slider-container:active .e-slider-track,
    .fabric .slider_container .e-slider-container .e-slider .e-tab-track{
        background-color: #c8c8c8;
    }

    #gradient_slider.e-control.e-slider .e-range {
        height: 6px;
        top: calc(50% - 3px);
        border-radius: 5px;
        background: linear-gradient(to top left, #f9f9f9 25%, #f9920b 90%);
    }

    .fabric .slider_container .e-slider-hover .e-slider-track,
    .fabric .slider_container .e-slider-container:active .e-slider-track,
    .fabric .slider_container .e-slider-container .e-slider .e-tab-track {
        background-color: #c8c8c8;
    }

    #gradient_slider.e-control.e-slider .e-slider-track {
        height: 8px;
        top: calc(50% - 4px);
        border-radius: 5px;
    }`;
export class ZoomingMaps extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    public sliderchange(args: SliderChangeEventArgs): void {
        this.mapInstance.zoomModule.toolBarZooming(args.value as number, 'ZoomIn');
    }
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        {/* <SliderComponent id='height_slider' value={1} min={1} max={10} step={0.1} showButtons={true} tooltip={{
                            isVisible: true, placement: 'before', showOn: 'focus'
                        }} change={this.sliderchange.bind(this)}
                        >
                        </SliderComponent> */}
                        <MapsComponent id="maps" loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m}
                            zoomSettings={{
                                enable: true,
                                pinchZooming: true,
                                toolbars: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
                            }}
                        >
                            <Inject services={[Zoom]} />
                            <LayersDirective>
                                <LayerDirective shapeData={World_Map}
                                    shapePropertyPath='continent'
                                    shapeDataPath='continent'
                                    dataSource={randomcountriesData}
                                    shapeSettings={{
                                        autofill: true,
                                        colorValuePath: 'color'
                                    }}
                                >
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div>Zooming</div>
                                    </td>
                                    <td>
                                        <div>
                                            <input type="checkbox" onClick={this.zooming.bind(this)} defaultChecked={true} id="zoom" style={{ marginTop: '15px' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div>Mouse wheel zoom</div>
                                    </td>
                                    <td>
                                        <div>
                                            <input type="checkbox" onClick={this.mousewheel.bind(this)} defaultChecked={true} id="mousewheel" style={{ marginTop: '15px' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div>Pinch zoom</div>
                                    </td>
                                    <td>
                                        <div>
                                            <input type="checkbox" onClick={this.pinching.bind(this)} defaultChecked={true} id="pinch" style={{ marginTop: '15px' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div>Single click zoom</div>
                                    </td>
                                    <td>
                                        <div>
                                            <input type="checkbox" onClick={this.singletap.bind(this)} id="singletap" style={{ marginTop: '15px' }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div>Double click zoom</div>
                                    </td>
                                    <td>
                                        <div>
                                            <input type="checkbox" onClick={this.doubletab.bind(this)} id="doubletap" style={{ marginTop: '15px' }} />
                                        </div>
                                    </td>
                                </tr>

                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                    This sample depicts the zooming and panning options in the maps. You can customize these options by changing the zooming option to Zooming, Mouse wheel zoom, Pinch zoom, Single-click zoom, and Double-click zoom in the Properties panel. Slider control has been placed to zoom the map at the bottom.
                    </p>
                </div>
                <div id="description">
                <p>
                    In this example, you can see how to zoom and pan the map. The support has been provided for zooming with toolbar, rectangle zoom, pinch zoom, mouse wheel zoom, single-click and double-click zoom 
                </p>
                <br/>
                  <p style={{fontweight: 500}}>Injecting Module</p>
                     <p>
                           Maps component features are segregated into individual feature-wise modules. To use the zooming feature, inject the <code>zoom</code> module using the Maps.Inject(zoom) method.
                     </p>
                </div>
            </div>
        )
    }
    public onMapsLoad(args: ILoadedEventArgs): void {
        let maps: Element = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as MapsTheme;
    };
    
    public mousewheel(): void {
        let element: HTMLInputElement = (document.getElementById('mousewheel')) as HTMLInputElement;
        this.mapInstance.zoomSettings.mouseWheelZoom = element.checked;
        this.mapInstance.refresh();
    }
    public pinching(): void {
        let element: HTMLInputElement = (document.getElementById('pinch')) as HTMLInputElement;
        this.mapInstance.zoomSettings.pinchZooming = element.checked;
        this.mapInstance.refresh();
    }
    public zooming(): void {
        let element: HTMLInputElement = (document.getElementById('zoom')) as HTMLInputElement;
        this.mapInstance.zoomSettings.enable = element.checked;
        this.mapInstance.refresh();
    }
    public doubletab(): void {
        let element: HTMLInputElement = (document.getElementById('doubletap')) as HTMLInputElement;
        this.mapInstance.zoomSettings.doubleClickZoom = element.checked;
        this.mapInstance.zoomSettings.zoomOnClick = (!element.checked);
        let ele1: HTMLInputElement = document.getElementById('singletap') as HTMLInputElement;
        if (element.checked) {
            ele1.disabled = true;
        } else {
            ele1.disabled = false;
        }
    }
    public singletap(): void {
        let element: HTMLInputElement = (document.getElementById('singletap')) as HTMLInputElement;
        let ele1: HTMLInputElement = document.getElementById('doubletap') as HTMLInputElement;
        this.mapInstance.zoomSettings.zoomOnClick = element.checked;
        this.mapInstance.zoomSettings.doubleClickZoom = (!element.checked);
        if (element.checked) {
            ele1.disabled = true;
        } else {
            ele1.disabled = false;
        }
    }
}
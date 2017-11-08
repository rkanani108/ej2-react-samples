/**
 * Box and Whisker Sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective,
    getSaturationColor, Category, ILoadedEventArgs, ChartTheme,
    IPointRenderEventArgs, BoxAndWhiskerSeries, Tooltip, getElement, BoxPlotMode, Inject
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from './property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { fabricColors, materialColors, bootstrapColors } from '../theme-color';
import { SampleBase } from './sample-base';

export let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
    args.border.color = getSaturationColor(args.fill, -0.6);
};

export let data1: any[] = [
    { x: 'Development', y: [22, 22, 23, 25, 25, 25, 26, 27, 27, 28, 28, 29, 30, 32, 34, 32, 34, 36, 35, 38] },
    { x: 'Testing', y: [22, 33, 23, 25, 26, 28, 29, 30, 34, 33, 32, 31, 50] },
    { x: 'HR', y: [22, 24, 25, 30, 32, 34, 36, 38, 39, 41, 35, 36, 40, 56] },
    { x: 'Finance', y: [26, 27, 28, 30, 32, 34, 35, 37, 35, 37, 45] },
    { x: 'R&D', y: [26, 27, 29, 32, 34, 35, 36, 37, 38, 39, 41, 43, 58] },
    { x: 'Sales', y: [27, 26, 28, 29, 29, 29, 32, 35, 32, 38, 53] },
    { x: 'Inventory', y: [21, 23, 24, 25, 26, 27, 28, 30, 34, 36, 38] },
    { x: 'Graphics', y: [26, 28, 29, 30, 32, 33, 35, 36, 52] },
    { x: 'Training', y: [28, 29, 30, 31, 32, 34, 35, 36] }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * BoxWhisker sample
 */
export class BoxWhisker extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private dropElement: DropDownListComponent;
    private checkElement: HTMLInputElement;
    private loaded: EmitType<ILoadedEventArgs>;
    private change(): void {
        this.chartInstance.series[0].boxPlotMode = this.dropElement.value as BoxPlotMode;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    private check(): void {
        this.chartInstance.series[0].showMean = this.checkElement.checked;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    private droplist: { [key: string]: Object }[] = [
        { value: 'Normal' },
        { value: 'Exclusive' },
        { value: 'Inclusive' }
    ];
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-9'>
                        <ChartComponent id='charts' ref={chart => this.chartInstance = chart}
                            primaryXAxis={{
                                valueType: 'Category',
                                majorGridLines: { width: 0 },
                                edgeLabelPlacement: 'Shift',
                                labelIntersectAction: 'Trim'
                            }}
                            chartArea={{ border: { width: 0 } }}
                            primaryYAxis={{
                                title: 'Age',
                                minimum: 10,
                                maximum: 60,
                                majorGridLines: { width: 0 },
                                majorTickLines: { width: 0 }
                            }}
                            pointRender={pointRender}
                            load={this.load.bind(this)}
                            title="Employee Age Group in Various Department" loaded={this.onChartLoad.bind(this)}
                            tooltip={{ enable: true }}>
                            <Inject services={[Category, BoxAndWhiskerSeries, Tooltip]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y'
                                    type='BoxAndWhisker' marker={{ visible: true, height: 10, width: 10 }} name='Department'>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-3 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '50%' }}>
                                        <div>Mode: </div>
                                    </td>
                                    <td style={{ padding: 10, width: '50%' }}>
                                        <DropDownListComponent width={120} id="modes" change={this.change.bind(this)} ref={d => this.dropElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value="Normal" />
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '50%' }}>
                                        <div>Mean: </div>
                                    </td>
                                    <td style={{ padding: 10, width: '50%' }}>
                                        <div>
                                            <input type="checkbox" id="mean" defaultChecked={true} onChange={this.check.bind(this)} style={{ marginLeft: '-5px' }} ref={d => this.checkElement = d} />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('charts').setAttribute('title', '');
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}
ReactDOM.render(<BoxWhisker />, document.getElementById('sample'));
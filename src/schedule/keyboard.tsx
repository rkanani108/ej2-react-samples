import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs, Inject } from '@syncfusion/ej2-react-schedule';
import { zooEventsData, applyCategoryColor } from './datasource';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

/**
 *  Schedule keyboard interaction sample
 */

export class KeyboardInteraction extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], zooEventsData, null, true) as Object[];
  private onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }
  public rendereComplete(): void {
    document.body.addEventListener('keydown', (e: KeyboardEvent) => {
      let scheduleElement: HTMLElement = document.getElementById('schedule');
      if (e.altKey && e.keyCode === 74 && scheduleElement) {
        scheduleElement.focus();
      }
    });
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent id='schedule' width='100%' height='550px' selectedDate={new Date(2018, 1, 15)}
              ref={t => this.scheduleObj = t} eventSettings={{ dataSource: this.data }} eventRendered={this.onEventRendered.bind(this)}>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
          </div>
        </div>
        <div id='action-description'>
          <p>This demo showcases the keyboard shortcuts applicable on Schedule and also lists out in below description,
            how those applicable shortcuts interacts with Schedule actions.</p>
        </div>
        <div id='description'>
          <p>All the Schedule actions can be controlled via keyboard keys and is availed by using
        <code>allowKeyboardInteraction</code> property which is set to true by default. The applicable key combinations and its relative functionalities are listed
            below.
          </p>
          <table style={{ width: '100%' }}>
            <tr>
              <th style={{ width: '200px' }}>
                <strong>Keys</strong>
              </th>
              <th>
                <strong>Description</strong>
              </th>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Alt</kbd> +
                <kbd>j</kbd>
              </td>
              <td>Focuses the Schedule [Provided from application end].</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Tab</kbd>
              </td>
              <td>Focuses the first or active item on the schedule header bar and then move the focus to the next available event
                elements. If no events present, then focus moves out of the component.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Shift</kbd> +
                <kbd>Tab</kbd>
              </td>
              <td>Reverse focusing of the Tab functionality. Inverse focusing of event elements from the last one and then move
                onto the first or active item on Schedule header bar and then moves out of the component.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Enter</kbd> key
            </td>
              <td>Opens the quick popup on the selected cells or events.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Escape</kbd> key
            </td>
              <td>Closes any of the popup that are in open state.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Arrow</kbd> keys
            </td>
              <td>To move onto the next available cells in either of the needed directions (left, right, top and right)</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Shift</kbd> +
                <kbd> Arrow</kbd> keys
            </td>
              <td>For multiple cell selection on either direction.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Delete</kbd> key
            </td>
              <td>Deletes one or more selected events.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Ctrl</kbd> +
                <kbd>Click</kbd> on events
            </td>
              <td>To select multiple events.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Alt</kbd> +
                <kbd>Number</kbd> keys (from 1 to 6)
            </td>
              <td>To switch between the views on Schedule.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Ctrl</kbd> +
                <kbd>Left Arrow</kbd> keys
            </td>
              <td>To navigate to the previous date period.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Ctrl</kbd> +
                <kbd>Right Arrow</kbd> keys
            </td>
              <td>To navigate to the next date period.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Left</kbd> or
                <kbd>Right Arrow</kbd> keys
            </td>
              <td>On pressing any of these keys when focus is currently on the Schedule header bar, moves the focus to the previous
                or next items in the header bar.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Space</kbd> or
                <kbd>Enter</kbd> keys
            </td>
              <td>It activates any of the focused items.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Page Up</kbd> &
                <kbd>Page Down</kbd> keys
            </td>
              <td>To scroll through the work cells area.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Home</kbd> key
            </td>
              <td>To move the selection to the first cell of Schedule.</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
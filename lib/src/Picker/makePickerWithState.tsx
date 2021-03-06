import * as React from 'react';
import { MakeOptional } from '../typings/helpers';
import { DateTimePickerView } from '../DateTimePicker';
import { BasePickerProps } from '../typings/BasePicker';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { ExportedDateInputProps } from '../_shared/PureDateInput';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { ResponsiveWrapperProps } from '../wrappers/ResponsiveWrapper';
import { Picker, ToolbarComponentProps, PickerViewProps } from './Picker';
import { SomeWrapper, ExtendWrapper, OmitInnerWrapperProps } from '../wrappers/Wrapper';

export interface WithViewsProps<T extends DateTimePickerView> {
  /**
   * Array of views to show
   */
  views?: T[];
  /** First view to show */
  openTo?: T;
}

export type WithDateInputProps = DateValidationProps & BasePickerProps & ExportedDateInputProps;

export interface MakePickerOptions<T extends unknown> {
  useDefaultProps: (props: T) => Partial<T> & { inputFormat?: string };
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

type ExportedPickerProps = MakeOptional<PickerViewProps<any>, 'ToolbarComponent'>;

export function makePickerWithStateAndWrapper<
  T extends ExportedPickerProps & DateValidationProps & Pick<BasePickerProps, 'onChange' | 'value'>,
  TWrapper extends SomeWrapper = any
>(
  Wrapper: TWrapper,
  { useDefaultProps, DefaultToolbarComponent }: MakePickerOptions<T>
): React.FC<T & ExtendWrapper<TWrapper>> {
  function PickerWithState(props: T & Partial<OmitInnerWrapperProps<ResponsiveWrapperProps>>) {
    const defaultProps = useDefaultProps(props);
    const allProps = { ...defaultProps, ...props };

    const {
      allowKeyboardControl,
      ampm,
      ampmInClock,
      autoOk,
      dateRangeIcon,
      disableFuture,
      disablePast,
      showToolbar,
      inputFormat,
      hideTabs,
      defaultHighlight,
      leftArrowButtonProps,
      leftArrowIcon,
      loadingIndicator,
      maxDate,
      minDate,
      minutesStep,
      onAccept,
      onChange,
      onClose,
      onMonthChange,
      onOpen,
      onYearChange,
      openTo,
      orientation,
      renderDay,
      rightArrowButtonProps,
      rightArrowIcon,
      shouldDisableDate,
      shouldDisableTime,
      strictCompareDates,
      timeIcon,
      toolbarFormat,
      ToolbarComponent = DefaultToolbarComponent,
      value,
      views,
      toolbarTitle,
      invalidDateMessage,
      minDateMessage,
      wider,
      showTabs,
      maxDateMessage,
      disableTimeValidationIgnoreDatePart,
      showDaysOutsideCurrentMonth,
      disableHighlightToday,
      // WrapperProps
      clearable,
      clearLabel,
      DialogProps,
      PopoverProps,
      okLabel,
      cancelLabel,
      todayLabel,
      minTime,
      maxTime,
      ...restPropsForTextField
    } = allProps;

    const { pickerProps, inputProps, wrapperProps } = usePickerState(allProps);
    const WrapperComponent = Wrapper as SomeWrapper;

    return (
      <WrapperComponent
        clearable={clearable}
        clearLabel={clearLabel}
        DialogProps={DialogProps}
        okLabel={okLabel}
        todayLabel={todayLabel}
        cancelLabel={cancelLabel}
        DateInputProps={inputProps}
        wider={wider}
        showTabs={showTabs}
        {...wrapperProps}
        {...restPropsForTextField}
      >
        <Picker
          {...pickerProps}
          DateInputProps={{ ...inputProps, ...restPropsForTextField }}
          // @ts-ignore
          allowKeyboardControl={allowKeyboardControl}
          ampm={ampm}
          ampmInClock={ampmInClock}
          dateRangeIcon={dateRangeIcon}
          disableFuture={disableFuture}
          disableHighlightToday={disableHighlightToday}
          disablePast={disablePast}
          disableTimeValidationIgnoreDatePart={disableTimeValidationIgnoreDatePart}
          hideTabs={hideTabs}
          leftArrowButtonProps={leftArrowButtonProps}
          leftArrowIcon={leftArrowIcon}
          loadingIndicator={loadingIndicator}
          maxDate={maxDate}
          maxTime={maxTime}
          minDate={minDate}
          minTime={minTime}
          minutesStep={minutesStep}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
          openTo={openTo}
          orientation={orientation}
          renderDay={renderDay}
          rightArrowButtonProps={rightArrowButtonProps}
          rightArrowIcon={rightArrowIcon}
          shouldDisableDate={shouldDisableDate}
          shouldDisableTime={shouldDisableTime}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          showToolbar={showToolbar}
          strictCompareDates={strictCompareDates}
          timeIcon={timeIcon}
          toolbarFormat={toolbarFormat}
          ToolbarComponent={ToolbarComponent}
          // @ts-ignore
          toolbarTitle={toolbarTitle || restPropsForTextField.label}
          views={views}
        />
      </WrapperComponent>
    );
  }

  return PickerWithState;
}

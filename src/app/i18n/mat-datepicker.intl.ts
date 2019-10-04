import { MatDatepickerIntl } from '@angular/material';


export class MatDatepickerPTBRIntl extends MatDatepickerIntl {
    /** A label for the calendar popup (used by screen readers). */
    calendarLabel: string = 'Calendário';
    /** A label for the button used to open the calendar popup (used by screen readers). */
    openCalendarLabel: string = 'Abrir calendário';
    /** A label for the previous month button (used by screen readers). */
    prevMonthLabel: string = 'Mês anterior';
    /** A label for the next month button (used by screen readers). */
    nextMonthLabel: string = 'Próximo mês';
    /** A label for the previous year button (used by screen readers). */
    prevYearLabel: string = 'Próximo ano';
    /** A label for the next year button (used by screen readers). */
    nextYearLabel: string = 'Ano anterior';
    /** A label for the 'switch to month view' button (used by screen readers). */
    switchToMonthViewLabel: string = 'Mudar para visão de meses';
    /** A label for the 'switch to year view' button (used by screen readers). */
    switchToYearViewLabel: string = 'Mudar para visão de anos';
}
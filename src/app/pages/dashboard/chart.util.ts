const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
    ];


function pad(num, size) {
    var s = String(num);
    while (s.length < (size || 2)) {s = '0' + s;}
    return s;
}

export class ChartUtil {

    static longToLabelMonthYear(dates: number[]): string[] {
        return dates.map(data => {
            const dia = new Date(data);
            const month = monthNames[ dia.getMonth() ];
            return `${month}/${dia.getFullYear()}`
        })
    }

    static longToLabelDayMonth(dates: number[]): string[] {
        return dates.map(data => {
            const dia = new Date(data);
            const day = dia.getDate();
            const month = monthNames[dia.getMonth()];
            return `${pad(day, 2)}/${month}`;
        });
    }
}

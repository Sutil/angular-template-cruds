export function rgbaToHex(rgba: string) {
    const parts = rgba.substring(rgba.indexOf('(')).split(','),
        r = parseInt(parts[0].substring(1).trim(), 10),
        g = parseInt(parts[1].trim(), 10),
        b = parseInt(parts[2].trim(), 10),
        a = parseFloat(parts[3].substring(0, parts[3].length - 1).trim() ).toFixed(2);

    return ('#' + r.toString(16) + g.toString(16) + b.toString(16));
  }
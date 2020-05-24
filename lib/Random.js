
export default class Random
{
    static int(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static float(min, max)
    {
        return Math.random() * (Math.floor(max - min + 1)) + Math.floor(min);
    }

    static string(length)
    {
        let chars = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' '];
        let str = "";
        for (let i = 0; i < length; i++)
        {
            str += (Random.int(0, 1) == 1) ? chars[Random.int(0, chars.length - 1)] : chars[Random.int(0, chars.length - 1)].toLowerCase();
        }

        return str;
    }

    static element(array = [])
    {
        if (Array.isArray(array)) {
            return array[Random.int(0, array.length - 1)];
        }
        throw new Error(`Expecting an ${Array.name} received ${typeof array}`);
    }

    static date(start = new Date(), end = new Date())
    {
        start = { year: start.getFullYear(), month: start.getMonth(), day: start.getDate()};
        end = { year: end.getFullYear(), month: end.getMonth(), day: end.getDate()};

        let newDate = { 
            year: Random.int(start.year, end.year),
            month: (start.year == end.year) ? Random.int(start.month, end.month) : Random.int(1, 12), 
            day: (start.month == end.month) ? Random.int(start.month, end.month) : Random.int(1, 28)
        };

        return new Date(newDate.year, newDate.month, newDate.day);
    }

    static array(length, type = "number", range = {min: null, max: null})
    {
        let arr = [];
        let value;
        if (range.min == null || range.max == null) {
            for (let index = 0; index < length; index++) {
                value = (type === "number") ? Random.int(1, 100) : (type === "string") ? Random.string(10) : Random.date(new Date("2017/01/01"), new Date());
                arr.push(value);
            }
        }
        else
        {
            for (let index = 0; index < length; index++) {
                value = (type === "number") ? Random.int(range.min, range.max) : (type === "string") ? Random.string(Random.int(range.min, range.max)) : Random.date(new Date(range.min), new Date(range.max));
                arr.push(value);
            }
        }

        return arr;
    }
}
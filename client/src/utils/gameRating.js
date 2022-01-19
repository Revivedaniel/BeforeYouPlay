export default function gameRating(rating) {
    const ratings = {
        "-1": "RP",
        "8": "E",
        "9": "E-10+",
        "10": "T",
        "11": "M",
        "12": "AO-18+",
    };
    return ratings[rating] || "NR";
}
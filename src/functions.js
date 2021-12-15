export const loadText = async () => {
    try {
        const res = await fetch("https://baconipsum.com/api/?type=all-meat&sentences=5").then(x => x.json());
        return res[0];
    } catch (e) {
        console.log("Failed to load text");
        return null;
    }
}

export const getStateClass = (index, pos, missed) => {
    if (index < pos) return "passed";
    if (index > pos) return "";
    return missed ? "missed" : "active";
}
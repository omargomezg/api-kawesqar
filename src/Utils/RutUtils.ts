export class RutUtils {
    public static format(rut: string) {
        const cleanedString = rut.replace(".", "").replace("-", "");
        return cleanedString.substring(0, cleanedString.length - 1) +
            "-" + cleanedString.substring(cleanedString.length - 1, cleanedString.length);
    }
}

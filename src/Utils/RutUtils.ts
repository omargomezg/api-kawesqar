export class RutUtils {
    public static format(rut: string) {
        const rutLimpio = rut.replace(".", "").replace("-", "");
        return rutLimpio.substring(0, rutLimpio.length - 1) +
            "-" + rutLimpio.substring(rutLimpio.length - 1, rutLimpio.length);
    }
}

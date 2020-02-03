/**
 * A enum for ouput types
 */
export enum SaleTypeEnum {
  /**
   * Venta al contado
   */
  CASH_SALE = "CS",
  /**
   * Venta a credito
   */
  DEBIT_CARD = "DC",
  /**
   * Tarjeta de crédito
   */
  CREDIT_CARD = "CC",
  /**
   * Consumo interno
   */
  DELIVERY_SUPPLIES = "DS",
  /**
   * Transferencia entre sucursales
   */
  BRANCH_TRANSFER = "BT"
}

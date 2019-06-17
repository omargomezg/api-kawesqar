class AllowedDeliveriesModel {
    /**
     * Cash deliveries
     */
    public sales: boolean;
    /**
     * Deliver to employees
     */
    public employees: boolean;
    /**
     * move between subsidiaries
     */
    public subsidiary: boolean;
    /**
     * Bill deliveries
     */
    public bill: boolean;

    constructor(sales: boolean, employees: boolean, subsidiary: boolean, bill: boolean) {
        this.sales = sales;
        this.employees = employees;
        this.subsidiary = subsidiary;
        this.bill = bill;
    }
}

export default AllowedDeliveriesModel;

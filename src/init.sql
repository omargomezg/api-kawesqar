alter table detalleVenta
    add storeId int
go;


alter table detalleVenta
    add constraint FK_b51328255aa9774032ce6782f9c
        foreign key (storeId) references bodega
go;

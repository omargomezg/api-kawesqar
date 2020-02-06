alter table
    detalleVenta
add
    storeId int
go
;

alter table
    detalleVenta
add
    constraint FK_b51328255aa9774032ce6782f9c foreign key (storeId) references bodega
go
;

EXEC sp_rename 'dbo.clientes.rutCliente',
'rut',
'COLUMN';

EXEC sp_rename 'dbo.clientes.Nombres_cli',
'firstName',
'COLUMN';

EXEC sp_rename 'dbo.clientes.ApPaterno_cli',
'lastName',
'COLUMN';

EXEC sp_rename 'dbo.clientes.ApMaterno_cli',
'secondLastName',
'COLUMN';

EXEC sp_rename 'dbo.clientes.rutCliente',
'rut',
'COLUMN';

EXEC sp_rename 'dbo.clientes.Nombres_cli',
'firstName',
'COLUMN';

EXEC sp_rename 'dbo.clientes.ApPaterno_cli',
'lastName',
'COLUMN';

EXEC sp_rename 'dbo.clientes.ApMaterno_cli',
'secondLastName',
'COLUMN';
$(document).ready(function(){
    tablaProductos = $("#tablaProductos").DataTable({
       "columnDefs":[{
        "targets": -1,
        "data":null,
        "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditar'><i class='fa-solid fa-pen-to-square'></i></button><button class='btn btn-danger btnBorrar'><i class='fa-solid fa-trash'></i></button></div></div>"  
       }],
        
        //Para cambiar el lenguaje a español
    "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }
    });
    
$("#btnAgregar").click(function(){
    $("#formProductos").trigger("reset");
    $(".modal-header").css("background-color", "#28a745");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nuevo Registro");            
    $("#modalCRUD").modal("show");        
    id=null;
    opcion = 1; //alta
});      
    
var fila; //capturar la fila para editar o borrar el registro
    
//botón EDITAR    
$(document).on("click", ".btnEditar", function(){
    fila = $(this).closest("tr");
    idproducto = parseInt(fila.find('td:eq(0)').text());
    nombreproducto = fila.find('td:eq(1)').text();
    marcaproducto = fila.find('td:eq(2)').text();
    cantidadproducto = parseInt(fila.find('td:eq(3)').text());
    descripcionproducto = fila.find('td:eq(4)').text();
    
    $("#nombreproducto").val(nombreproducto);
    $("#marcaproducto").val(marcaproducto);
    $("#cantidadproducto").val(cantidadproducto);
    $("#descripcionproducto").val(descripcionproducto);
    opcion = 2; //editar
    
    $(".modal-header").css("background-color", "#007bff");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar");            
    $("#modalCRUD").modal("show");  
    
});

//botón BORRAR
$(document).on("click", ".btnBorrar", function(){
    fila = $(this);      
    idproducto = parseInt($(this).closest('tr').find('td:eq(0)').text());		
    opcion = 3; //eliminar  
         
    Swal.fire({
       title: '¿Estás seguro eliminar el registro?',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Aceptar'
    }).then((result) => {
       if (result.isConfirmed) {       
         $.ajax({
          url: "../bd/crudproductos.php",
          type: "POST",
          datatype:"json",   
          data: {opcion:opcion, idproducto:idproducto},   
          success: function() {
            tablaProductos.row(fila.parents('tr')).remove().draw();          
           }
         });	
       }
    });
});



    
$("#formProducto").submit(function(e){
    e.preventDefault();    
    nombreproducto = $.trim($("#nombreproducto").val());
    marcaproducto = $.trim($("#marcaproducto").val());
    cantidadproducto = $.trim($("#cantidadproducto").val());    
    descripcionproducto = $.trim($("#descripcionproducto").val());  
    $.ajax({
        url: "../bd/crudproductos.php",
        type: "POST",
        dataType: "json",
        data: {nombreproducto:nombreproducto, marcaproducto:marcaproducto, cantidadproducto:cantidadproducto, 
            descripcionproducto:descripcionproducto, opcion:opcion},
        success: function(data){  
            console.log(data);
            idproducto = data[0].idproducto;            
            nombreproducto = data[0].nombreproducto;
            marcaproducto = data[0].marcaproducto;
            cantidadproducto = data[0].cantidadproducto;
            descripcionproducto = data[0].descripcionproducto;
            if(opcion == 1){tablaProductos.row.add([idproducto,nombreproducto,marcaproducto,cantidadproducto,descripcionproducto]).draw();}
            else{tablaProductos.row(fila).data([idproducto,nombreproducto,marcaproducto,cantidadproducto,descripcionproducto]).draw();}            
        }        
    });
    $("#modalCRUD").modal("hide");    
    
});    
    
});

let prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
let html = document.querySelector('html');
 
html.classList.add(prefers);
html.setAttribute('data-bs-theme', prefers);
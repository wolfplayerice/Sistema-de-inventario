$(document).ready(function(){
    tablaPersonas = $("#tablaPersonas").DataTable({
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
    $("#formPersonas").trigger("reset");
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
    idcliente = parseInt(fila.find('td:eq(0)').text());
    nombre_client = fila.find('td:eq(1)').text();
    apellido_client = fila.find('td:eq(2)').text();
    cedula = parseInt(fila.find('td:eq(3)').text());
    tlf_client = fila.find('td:eq(4)').text();
    
    $("#nombre_client").val(nombre_client);
    $("#apellido_client").val(apellido_client);
    $("#cedula").val(cedula);
    $("#tlf_client").val(tlf_client);
    opcion = 2; //editar
    
    $(".modal-header").css("background-color", "#007bff");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar");            
    $("#modalCRUD").modal("show");  
    
});

//botón BORRAR
$(document).on("click", ".btnBorrar", function(){
    fila = $(this);      
    idcliente = parseInt($(this).closest('tr').find('td:eq(0)').text());		
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
          url: "../bd/crud.php",
          type: "POST",
          datatype:"json",   
          data: {opcion:opcion, idcliente:idcliente},   
          success: function() {
            tablaPersonas.row(fila.parents('tr')).remove().draw();          
           }
         });	
       }
    });
});



    
$("#formPersonas").submit(function(e){
    e.preventDefault();    
    nombre_client = $.trim($("#nombre_client").val());
    apellido_client = $.trim($("#apellido_client").val());
    cedula = $.trim($("#cedula").val());    
    tlf_client = $.trim($("#tlf_client").val());  
    $.ajax({
        url: "../bd/crud.php",
        type: "POST",
        dataType: "json",
        data: {nombre_client:nombre_client, apellido_client:apellido_client, cedula:cedula, tlf_client:tlf_client, opcion:opcion},
        success: function(data){  
            console.log(data);
            idcliente = data[0].idcliente;            
            nombre_client = data[0].nombre_client;
            apellido_client = data[0].apellido_client;
            cedula = data[0].cedula;
            tlf_client = data[0].tlf_client;
            if(opcion == 1){tablaPersonas.row.add([idcliente,nombre_client,apellido_client,cedula,tlf_client]).draw();}
            else{tablaPersonas.row(fila).data([idcliente,nombre_client,apellido_client,cedula,tlf_client]).draw();}            
        }        
    });
    $("#modalCRUD").modal("hide");    
    
});    
    
});

let prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
let html = document.querySelector('html');
 
html.classList.add(prefers);
html.setAttribute('data-bs-theme', prefers);
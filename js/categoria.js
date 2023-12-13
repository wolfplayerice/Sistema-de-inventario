$(document).ready(function(){
    tablacategoria = $("#tablacategoria").DataTable({
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
    // Obtén la tabla
const tabla = $("#tablacategoria").DataTable();

// Cambia el color de fondo del encabezado
tabla.header().style("background-color", "#ffffff");

$("#btnAgregar").click(function(){
    $("#formcategoria").trigger("reset");
    $(".modal-header").css("background-color", "#28a745");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Registro Categoria");            
    $("#modalCRUD").modal("show");        
    idcategoria=null;
    opcion = 1; //alta
});    
    
var fila; //capturar la fila para editar o borrar el registro
    
//botón EDITAR    
$(document).on("click", ".btnEditar", function(){
    fila = $(this).closest("tr");
    idcategoria = parseInt(fila.find('td:eq(0)').text());
    nombrecategoria = fila.find('td:eq(1)').text();
    
    $("#nombrecategoria").val(nombrecategoria);
    opcion = 2; //editar
    
    $(".modal-header").css("background-color", "#007bff");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Categoria");            
    $("#modalCRUD").modal("show");  
    
});

//botón BORRAR
$(document).on("click", ".btnBorrar", function(){
    fila = $(this);      
    idcategoria = parseInt($(this).closest('tr').find('td:eq(0)').text());		
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
          url: "../bd/crudcategoria.php",
          type: "POST",
          datatype:"json",   
          data: {opcion:opcion, idcategoria:idcategoria},   
          success: function() {
            tablacategoria.row(fila.parents('tr')).remove().draw();          
           }
         });	
       }
    });
});
    
$("#formcategoria").submit(function(e){
    e.preventDefault();    
    nombrecategoria = $.trim($("#nombrecategoria").val());
    $.ajax({
        url: "../bd/crudcategoria.php",
        type: "POST",
        dataType: "json",
        data: {nombrecategoria:nombrecategoria, idcategoria:idcategoria, opcion:opcion},
        success: function(data){  
            console.log(data);
            idcategoria = data[0].idcategoria;            
            nombrecategoria = data[0].nombrecategoria;

            if(opcion == 1){tablacategoria.row.add([idcategoria,nombrecategoria]).draw();}
            else{tablacategoria.row(fila).data([idcategoria,nombrecategoria]).draw();}            
        }        
    });
    $("#modalCRUD").modal("hide");    
    
});    
    
});

/* let prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
let html = document.querySelector('html');
 
html.classList.add(prefers);
html.setAttribute('data-bs-theme', prefers); */
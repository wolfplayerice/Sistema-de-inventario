$(document).ready(function() {
    var idcliente, opcion;
    opcion = 4;
        
    tablacliente = $('#tablacliente').DataTable({  
        "ajax":{            
            "url": "../bd/crud.php", 
            "method": 'POST', //usamos el metodo POST
            "data":{opcion:opcion}, //enviamos opcion 4 para que haga un SELECT
            "dataSrc":""
        },
        "columns":[
            {"data": "idcliente"},
            {"data": "nombre_client"},
            {"data": "apellido_client"},
            {"data": "cedula"
                
              },
            {"data": "tlf_client"},
            {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditar'><i class='fa-solid fa-pen-to-square'></i></button><button class='btn btn-danger btnBorrar'><i class='fa-solid fa-trash'></i></button></div></div>"}
        ],
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
    
    var fila; //captura la fila, para editar o eliminar
    //submit para el Alta y Actualización
    $('#formcliente').submit(function(e){                         
        e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
        nombre_client = $.trim($('#nombre_client').val());    
        apellido_client = $.trim($('#apellido_client').val());   
        cedula = $.trim($('#cedula').val());
        tlf_client = $.trim($('#tlf_client').val());
                          
            $.ajax({
              url: "../bd/crud.php",
              type: "POST",
              datatype:"json",    
              data:  {idcliente:idcliente, nombre_client:nombre_client, apellido_client:apellido_client, cedula:cedula, tlf_client:tlf_client, opcion:opcion},    
              success: function(data) {
                tablacliente.ajax.reload(null, false);
               }
            });			        
        $('#modalCRUD').modal('hide');											     			
    });
            
     
    
    //para limpiar los campos antes de dar de Alta una Persona
    $("#btnAgregar").click(function(){
        opcion = 1; //alta           
        idcliente=null;
        $("#formcliente").trigger("reset");
        $(".modal-header").css( "background-color", "#17a2b8");
        $(".modal-header").css( "color", "white" );
        $(".modal-title").text("Registro usuario");
        $('#modalCRUD').modal('show');	    
    });
    
    //Editar        
    $(document).on("click", ".btnEditar", function(){		        
        opcion = 2;//editar
        fila = $(this).closest("tr");	        
        idcliente = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
        nombre_client = fila.find('td:eq(1)').text();
        apellido_client = fila.find('td:eq(2)').text();
        cedula = fila.find('td:eq(3)').text();
        tlf_client = fila.find('td:eq(4)').text();

        $("#nombre_client").val(nombre_client);
        $("#apellido_client").val(apellido_client);
        $("#cedula").val(cedula);
        $("#tlf_client").val(tlf_client);
        $(".modal-header").css("background-color", "#007bff");
        $(".modal-header").css("color", "white" );
        $(".modal-title").text("Editar cliente");		
        $('#modalCRUD').modal('show');		   
    });
    
    //Borrar
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
                tablacliente.row(fila.parents('tr')).remove().draw();          
               }
             });	
           }
        });
    });
    
    });    

let prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
let html = document.querySelector('html');
 
html.classList.add(prefers);
html.setAttribute('data-bs-theme', prefers);
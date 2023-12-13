$(document).ready(function() {
    var idusuario, opcion;
    opcion = 4;
        
    tablaPermisos = $('#tablaPermisos').DataTable({  
        "ajax":{            
            "url": "../bd/crudpermisos.php", 
            "method": 'POST', //usamos el metodo POST
            "data":{opcion:opcion}, //enviamos opcion 4 para que haga un SELECT
            "dataSrc":""
        },
        "columns":[
            {"data": "idusuario"},
            {"data": "usuario"},
            {"data": "clave"},
            {"data": "nombreusuario"},
            {"data": "nombrerol"},
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
    $('#formPermisos').submit(function(e){                         
        e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
        usuario = $.trim($('#usuario').val());    
        clave = $.trim($('#clave').val());
        nombreusuario = $.trim($('#nombreusuario').val());    
        idrol = $.trim($('#idrol').val());
                          
            $.ajax({
              url: "../bd/crudpermisos.php",
              type: "POST",
              datatype:"json",    
              data:  {usuario:usuario, clave:clave, nombreusuario:nombreusuario, idrol:idrol, idusuario:idusuario, opcion:opcion},    
              success: function(data) {
                tablaPermisos.ajax.reload(null, false);
               }
            });			        
        $('#modalCRUD').modal('hide');											     			
    });
            
     
    
    //para limpiar los campos antes de dar de Alta una Persona
    $("#btnAgregar").click(function(){
        opcion = 1; //alta           
        idusuario=null;
        $("#formPermisos").trigger("reset");
        $(".modal-header").css( "background-color", "#17a2b8");
        $(".modal-header").css( "color", "white" );
        $(".modal-title").text("Registro usuario");
        $('#modalCRUD').modal('show');	    
    });
    
    //Editar        
    $(document).on("click", ".btnEditar", function(){		        
        opcion = 2;//editar
        fila = $(this).closest("tr");	        
        idusuario = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
        usuario = fila.find('td:eq(1)').text();
        clave = fila.find('td:eq(2)').text();
        nombreusuario = fila.find('td:eq(3)').text();
        idrol = fila.find('td:eq(4)').text();

        $("#usuario").val(usuario);
        $("#clave").val(clave);
        $("#nombreusuario").val(nombreusuario);
        $("#idrol").val(idrol);
        $(".modal-header").css("background-color", "#007bff");
        $(".modal-header").css("color", "white" );
        $(".modal-title").text("Editar Usuario");		
        $('#modalCRUD').modal('show');		   
    });
    
    //Borrar
    $(document).on("click", ".btnBorrar", function(){
        fila = $(this);      
        idusuario = parseInt($(this).closest('tr').find('td:eq(0)').text());		
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
              url: "../bd/crudpermisos.php",
              type: "POST",
              datatype:"json",   
              data: {opcion:opcion, idusuario:idusuario},   
              success: function() {
                tablaPermisos.row(fila.parents('tr')).remove().draw();          
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
$(document).ready(function() {
    var idproducto, opcion;
    opcion = 4;
        
    tablaproducto = $('#tablaproducto').DataTable({  
        "ajax":{            
            "url": "../bd/crudproductos.php", 
            "method": 'POST', //usamos el metodo POST
            "data":{opcion:opcion}, //enviamos opcion 4 para que haga un SELECT
            "dataSrc":""
        },
        "columns":[
            {"data": "idproducto"},
            {"data": "nombreproducto"},
            {"data": "nombrecategoria"},
            {"data": "stock"},
            {"data": "descripcionproducto"},
            {"data": "precio"},
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
    $('#formproductos').submit(function(e){                         
        e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
        nombreproducto = $.trim($('#nombreproducto').val());    
        idcategoria = $.trim($('#idcategoria').val());
        stock = $.trim($('#stock').val());    
        descripcionproducto = $.trim($('#descripcionproducto').val());
        precio = $.trim($('#precio').val());
        nombrecategoria = $.trim($('#nombrecategoria').val());
                          
            $.ajax({
              url: "../bd/crudproductos.php",
              type: "POST",
              datatype:"json",    
              data:  {idproducto:idproducto, nombreproducto:nombreproducto, idcategoria:idcategoria, nombrecategoria:nombrecategoria, stock:stock, descripcionproducto:descripcionproducto, precio:precio, opcion:opcion},    
              success: function(data) {
                tablaproducto.ajax.reload(null, false);
               }
            });			        
        $('#modalCRUD').modal('hide');											     			
    });
            
     
    
    //para limpiar los campos antes de dar de Alta una Persona
    $("#btnAgregar").click(function(){
        opcion = 1; //alta           
        idusuario=null;
        $("#formproductos").trigger("reset");
        $(".modal-header").css( "background-color", "#17a2b8");
        $(".modal-header").css( "color", "white" );
        $(".modal-title").text("Registro producto");
        $('#modalCRUD').modal('show');	    
    });
    
    //Editar        
    $(document).on("click", ".btnEditar", function(){		        
        opcion = 2;//editar
        fila = $(this).closest("tr");	        
        idproducto = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
        nombreproducto = fila.find('td:eq(1)').text();
        
        stock = parseInt(fila.find('td:eq(3)').text());
        descripcionproducto = fila.find('td:eq(4)').text();
        precio = fila.find('td:eq(5)').text();
        nombrecategoria = fila.find('td:eq(6)').text();

        $("#nombreproducto").val(nombreproducto);
       
        $("#stock").val(stock);
        $("#descripcionproducto").val(descripcionproducto);
        $("#precio").val(precio);
        $("#nombrecategoria").val(nombrecategoria)
        $(".modal-header").css("background-color", "#007bff");
        $(".modal-header").css("color", "white" );
        $(".modal-title").text("Editar producto");		
        $('#modalCRUD').modal('show');		   
    });
    
    //Borrar
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
                tablaproducto.row(fila.parents('tr')).remove().draw();          
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
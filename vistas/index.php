<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$consulta = "SELECT idcedula, nombretipo FROM cedula";
$resultado = $conexion->prepare($consulta);
$resultado->execute();
$data=$resultado->fetchAll(PDO::FETCH_ASSOC); 
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="../img/4.png">
    <link rel="stylesheet" href="../fonts-6/css/all.css">
    <link rel="stylesheet" href="../css/menu.css" />
    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <link href="../DataTables/datatables.min.css" rel="stylesheet">
    <link href="../DataTables/DataTables-1.13.8/css/dataTables.bootstrap5.min.css">
    <title>TKG Electronics</title>

    
  </head>
  <body>
  <?php require_once "menu.php" ?>
  <div class="home-section">
        <div class="home-content">
          <i class="fas fa-bars"></i>
          <span class="text">TKG Electronics</span>
        </div>
      <h2 class="titulo">Cliente</h2>

    <div class="container">
        <div class="row">
            <div class="col-lg-12">            
            <button id="btnAgregar" type="button" class="btn btn-success"><i class="fa-solid fa-circle-plus"></i>  Añadir</button>
            </div>    
        </div>    
    </div>    
    <br>  

    <div class="container caja">
        <div class="row">
            <div class="col-lg-12">
            <div class="table-responsive">        
                <table id="tablacliente" class="table table-striped table-bordered table-condensed" style="width:100%" >
                    <thead class="text-center">
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Apellido</th>                                
                            <th>Cedula</th>  
                            <th>Telefono</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>                           
                    </tbody>        
                </table>               
            </div>
            </div>
        </div>  
    </div>   

<!-- modal -->
<div class="modal" tabindex="-1" id="modalCRUD">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="formcliente">    
            <div class="modal-body">
                <div class="form-group">
                <label for="nombre_client" class="col-form-label">Nombre:</label>
                <input type="text" class="form-control" id="nombre_client" required>
                </div>
                <div class="form-group">
                <label for="apellido_client" class="col-form-label">Apellido:</label>
                <input type="text" class="form-control" id="apellido_client" required>
                </div>                
                <div class="form-group d-flex align-items-center mt-3">
                  <label for="cedula" class="col-form-label me-4">Cédula:</label>
<!--                 <select class="form-select" name="prefijo" id="idcedula" width: 100px;">
                 <?php
                    foreach($data as $data){
                  ?>  
                  <option value="<?php echo $data['idcedula']?>"><?php echo $data['nombretipo']; ?></option>
                  <?php
                    }
                  ?> 
                  </select> -->
                  <input type="tel" class="form-control ms-3" id="cedula" name="cedula" required>
                </div>

                <div class="form-group">
                <label for="tlf_client" class="col-form-label">Telefono:</label>
                <input type="text" class="form-control" id="tlf_client" required>
                </div>                
            </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="submit" id="btnAgregar" class="btn btn-dark">Guardar</button>
      </div>
    </div>
  </div>
</div>


    <?php require_once "footer.php"  ?>

    <script src="../JQuery/jquery-3.7.1.min.js"></script>
    <script src="../DataTables/datatables.min.js"></script>
    <script src="../Popper/popper.min.js"></script>
    <script src="../bootstrap/js/bootstrap.min.js"></script>
    <script src="../js/tabla.js" type="text/javascript"> </script>
    <script src="../js/menu.js"></script>
    <script src="../js/sweetalert2@11.js"></script>

  </body>
</html>
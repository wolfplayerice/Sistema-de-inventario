<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

// Recepción de los datos enviados mediante POST desde el JS   

$nombreproducto = (isset($_POST['nombreproducto'])) ? $_POST['nombreproducto'] : '';
$idcategoria = (isset($_POST['idcategoria'])) ? $_POST['idcategoria'] : '';
$nombrecategoria = (isset($_POST['nombrecategoria'])) ? $_POST['nombrecategoria'] : '';
$stock = (isset($_POST['stock'])) ? $_POST['stock'] : '';
$descripcionproducto = (isset($_POST['descripcionproducto'])) ? $_POST['descripcionproducto'] : '';
$precio = (isset($_POST['precio'])) ? $_POST['precio'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$idproducto = (isset($_POST['idproducto'])) ? $_POST['idproducto'] : '';


switch($opcion){
    case 1: //alta
        $consulta = "INSERT INTO `productos` (`nombreproducto`, `idcategoria`, `stock`, `descripcionproducto`, `precio` ) 
        VALUES ('$nombreproducto', '$idcategoria', '$stock', '$descripcionproducto', '$precio')";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        $consulta = "SELECT idproducto, nombreproducto, idcategoria, cantidadproducto, descripcionrproducto, precio FROM productos ORDER BY idproductos DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);

        break;
    case 2: //modificación
        $consulta = "UPDATE productos SET nombreproducto='$nombreproducto', idcategoria='$idcategoria',
        stock='$stock', descripcionproducto='$descripcionproducto', precio='$precio'  WHERE idproducto='$idproducto' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT idproducto, nombreproducto, idcategoria, stock, descripcionproducto, precio FROM
        productos WHERE idproducto='$idproducto' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);

        break;        
    case 3://baja
        $consulta = "DELETE FROM productos WHERE idproducto='$idproducto'";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;  
    case 4:
    
        $consulta = "SELECT productos.idproducto, productos.nombreproducto, categoria.nombrecategoria, productos.stock, productos.descripcionproducto, productos.precio FROM productos INNER JOIN categoria ON productos.idcategoria = categoria.idcategoria";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;      
}

print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;

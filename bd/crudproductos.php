<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

// Recepción de los datos enviados mediante POST desde el JS   

$nombreproducto = (isset($_POST['nombreproducto'])) ? $_POST['nombreproducto'] : '';
$marcaproducto = (isset($_POST['marcaproducto'])) ? $_POST['marcaproducto'] : '';
$cantidadproducto = (isset($_POST['cantidadproducto'])) ? $_POST['cantidadproducto'] : '';
$descripcionproducto = (isset($_POST['descripcionproducto'])) ? $_POST['descripcionproducto'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$idproducto = (isset($_POST['idproducto'])) ? $_POST['idproducto'] : '';


switch($opcion){
    case 1: //alta
        $consulta = "INSERT INTO `productos` (`nombreproducto`, `marcaproducto`, `cantidadproducto`, `descripcionproducto`) 
        VALUES ('$nombreproducto', '$marcaproducto', '$cantidadproducto', '$descripcionproducto')";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        $consulta = "SELECT idproducto, nombreproducto, marcaproducto, cantidadproducto, descripcionrproducto FROM productos ORDER BY idproductos DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);

        break;
    case 2: //modificación
        $consulta = "UPDATE productos SET nombreproducto='$nombreproducto', marcaproducto='$marcaproducto',
        cantidadproducto='$cantidadproducto', descripcionproducto='$descripcionproducto'  WHERE idproducto='$idproducto' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT idproducto, nombreproducto, marcaproducto, cantidadproducto, descripcionproducto FROM
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
}

print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;
